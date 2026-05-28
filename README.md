# Sistema de Gestão de Estacionamento

Sistema web para operação de estacionamento de pequeno porte (até 50 vagas), com cobrança fracionada por hora/minuto. Substitui o controle manual (papel/planilha) por um sistema digital com painel em tempo real.

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js 15 + TypeScript + Tailwind CSS + shadcn/ui |
| Backend | Go (chi + pgx/v5 + gorilla/websocket + JWT) |
| Banco | PostgreSQL 16 |
| Infra | Docker Compose |
| OCR | tesseract.js (client-side, funciona offline) |

---

## Arquitetura

```
[Next.js :3000] ←→ [Go API REST + WebSocket :8080] ←→ [PostgreSQL :5432]
```

Monorepo com dois workspaces:

```
/
├── apps/
│   ├── frontend/   # Next.js 15
│   └── backend/    # Go
├── docker-compose.yml
└── README.md
```

---

## Banco de Dados

### Tabelas principais

```sql
-- Operadores (autenticação)
operators: id, name, email, password_hash, role (admin|operator), is_active

-- Vagas
spots: id, number, type (regular|handicapped|motorcycle), status (free|occupied)

-- Tickets (ciclo de vida do veículo)
tickets:
  id, spot_id, plate, brand, model, color,
  vehicle_type (car|motorcycle),
  entry_at, exit_at, duration_minutes, amount,
  payment_method (cash|card|pix),
  status (open|paid|cancelled),
  plate_image_url,
  operator_id

-- Tabela de preços
pricing_rules:
  id, name, first_hour_price, additional_hour_price,
  daily_max, vehicle_type, is_active

-- Caixa
cash_sessions:
  id, operator_id, opened_at, closed_at,
  opening_amount, closing_amount, status (open|closed)

cash_operations:
  id, session_id, ticket_id, type (income|withdrawal),
  amount, description, created_at
```

### Regra de precificação

```
minutos ≤ 60   → cobra first_hour_price
minutos > 60   → first_hour_price + (minutos_extras / 60) × additional_hour_price
teto diário    → Math.min(total, daily_max)   [opcional]
```

---

## Backend — Go

### Estrutura de pastas

```
backend/
├── cmd/server/main.go
├── internal/
│   ├── handlers/          # HTTP handlers (thin layer)
│   │   ├── auth.go
│   │   ├── tickets.go
│   │   ├── spots.go
│   │   ├── cash.go
│   │   └── reports.go
│   ├── services/          # regras de negócio
│   │   ├── ticket_service.go
│   │   ├── pricing_service.go
│   │   ├── cash_service.go
│   │   └── report_service.go
│   ├── repositories/      # acesso ao banco
│   │   ├── ticket_repo.go
│   │   ├── spot_repo.go
│   │   └── cash_repo.go
│   ├── models/
│   ├── middleware/        # JWT auth, CORS, logging
│   └── hub/              # WebSocket broadcast hub
├── migrations/            # SQL files numerados
└── go.mod
```

### Dependências

```
chi                    — roteador HTTP leve
pgx/v5                 — driver PostgreSQL
gorilla/websocket      — WebSocket (painel em tempo real)
golang-jwt/jwt/v5      — autenticação JWT
golang.org/x/crypto    — bcrypt para senhas
```

### Endpoints REST

```
POST   /auth/login
GET    /spots
POST   /tickets                     # registrar entrada
GET    /tickets/:id/preview-amount  # valor estimado antes de cobrar
PUT    /tickets/:id/checkout        # saída + pagamento
GET    /tickets/search?plate=
POST   /cash/sessions               # abrir caixa
PUT    /cash/sessions/:id/close     # fechar caixa
POST   /cash/operations             # sangria / suprimento
GET    /reports/summary?from=&to=
GET    /reports/movements
WS     /ws                          # atualizações em tempo real
```

### WebSocket

- Hub central com lista de clientes conectados
- Broadcast automático nos eventos: entrada, saída, abertura de vaga
- Payload: `{ "event": "spot_updated", "data": { "spot_id": 1, "status": "occupied", "plate": "ABC1D23" } }`

---

## Frontend — Next.js 15

### Rotas

```
app/
├── (auth)/login/page.tsx
└── (app)/
    ├── layout.tsx                  # sidebar + header
    ├── dashboard/page.tsx          # visão geral
    ├── painel/page.tsx             # grid de vagas em tempo real
    ├── tickets/
    │   ├── entrada/page.tsx        # registrar veículo
    │   └── saida/page.tsx          # checkout + pagamento
    ├── caixa/page.tsx
    └── relatorios/page.tsx
```

### Telas

**Painel de Vagas** `/painel`
- Grid 50 células numeradas (verde = livre, vermelho = ocupada, cinza = bloqueada)
- Click → drawer com placa, horário, tempo decorrido, valor estimado
- Atualização via WebSocket (sem polling)

**Entrada de Veículo** `/tickets/entrada`
- Tabs: Carro | Moto
- Campos: Placa, Marca, Modelo, Cor + seleção de vaga
- Botão câmera → captura foto → OCR extrai placa automaticamente (editável)

**OCR de Placa**
- `tesseract.js` client-side (funciona offline, sem API externa)
- Fluxo: `<input capture="environment">` → FileReader → canvas → tesseract → preenche input
- Imagem salva em `uploads/plates/` junto com o ticket

**Saída / Checkout** `/tickets/saida`
- Busca por placa ou número de ticket
- Valor calculado em tempo real (atualiza a cada minuto)
- Formas de pagamento: Dinheiro | Cartão | Pix

**Controle de Caixa** `/caixa`
- Abrir caixa com valor inicial
- Lista de operações do turno
- Sangria / suprimento com justificativa
- Fechar caixa: total esperado vs informado

**Relatórios** `/relatorios`
- Filtro: hoje, semana, mês, período custom
- Cards: total arrecadado, nº veículos, ticket médio, taxa de ocupação
- Gráfico de barras: faturamento por dia
- Exportação CSV

---

## Docker Compose

```yaml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_DB: parking
      POSTGRES_USER: parking_user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    ports: ["5432:5432"]
    volumes: ["pgdata:/var/lib/postgresql/data"]

  backend:
    build: ./apps/backend
    ports: ["8080:8080"]
    depends_on: [db]
    environment:
      DATABASE_URL: postgres://parking_user:${DB_PASSWORD}@db:5432/parking
      JWT_SECRET: ${JWT_SECRET}

  frontend:
    build: ./apps/frontend
    ports: ["3000:3000"]
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:8080

volumes:
  pgdata:
```

### Variáveis de ambiente (`.env`)

```env
DB_PASSWORD=senha_segura_aqui
JWT_SECRET=segredo_jwt_aqui
```

---

## Como rodar em desenvolvimento

```bash
# 1. Clonar o repositório
git clone https://github.com/LuksFP/estacionamento.git
cd estacionamento

# 2. Criar o .env
cp .env.example .env
# editar .env com suas credenciais

# 3. Subir tudo com Docker
docker compose up --build

# Serviços disponíveis:
# Frontend  → http://localhost:3000
# Backend   → http://localhost:8080
# Banco     → localhost:5432
```

### Desenvolvimento sem Docker (local)

```bash
# Backend
cd apps/backend
go mod download
go run ./cmd/server

# Frontend
cd apps/frontend
npm install
npm run dev
```

---

## Sprints de Implementação

### Sprint 1 — Base
- [ ] Monorepo setup + Docker Compose
- [ ] Migrations PostgreSQL (todas as tabelas)
- [ ] Go: auth (login + JWT) + middleware
- [ ] Next.js: layout, tela de login, proteção de rotas

### Sprint 2 — Core Operacional
- [ ] Go: CRUD spots, ticket entry/exit, pricing service
- [ ] Next.js: tela de entrada de veículo + OCR
- [ ] Next.js: tela de saída/checkout com valor ao vivo
- [ ] WebSocket hub + painel de vagas em tempo real

### Sprint 3 — Caixa
- [ ] Go: cash sessions + cash operations
- [ ] Next.js: tela de caixa (abertura, operações, fechamento)
- [ ] Integração automática ticket → caixa no checkout

### Sprint 4 — Relatórios + Polish
- [ ] Go: endpoints de relatório com queries agregadas
- [ ] Next.js: dashboard + relatórios com gráficos (recharts)
- [ ] Exportação CSV
- [ ] Ajustes de UX + responsividade mobile

---

## Fluxo de teste

1. `docker compose up` → todos os serviços rodando
2. Login com operador admin
3. Abrir caixa com valor inicial
4. Registrar entrada de veículo (com OCR ou manual)
5. Verificar atualização no painel de vagas (outra aba, sem refresh)
6. Fazer checkout → confirmar valor calculado + pagamento
7. Fechar caixa → conferir totais no relatório do dia

---

## Decisões técnicas

| Decisão | Motivo |
|---|---|
| Go no backend | Performance + tipagem forte + concorrência nativa para WebSocket |
| tesseract.js client-side | Funciona offline, sem custo de API externa |
| WebSocket nativo | Painel em tempo real sem polling, latência mínima |
| shadcn/ui | Componentes acessíveis e personalizáveis sem lock-in |
| Docker Compose | Ambiente reproduzível em qualquer máquina |
