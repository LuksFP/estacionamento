import type { Metadata } from 'next'
import { Car, LogIn, LogOut, TrendingUp, Clock, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Dashboard' }

const stats = [
  {
    label: 'Vagas Livres',
    value: '27',
    sub: 'de 50 vagas',
    icon: CheckCircle2,
    color: 'text-green-400',
    bg: 'bg-green-400/10',
    border: 'border-green-400/20',
  },
  {
    label: 'Vagas Ocupadas',
    value: '23',
    sub: '46% de ocupação',
    icon: Car,
    color: 'text-red-400',
    bg: 'bg-red-400/10',
    border: 'border-red-400/20',
  },
  {
    label: 'Arrecadado Hoje',
    value: 'R$ 1.850',
    sub: '52 veículos atendidos',
    icon: TrendingUp,
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'border-accent/20',
  },
  {
    label: 'Ticket Médio',
    value: 'R$ 35,58',
    sub: 'últimas 24 horas',
    icon: Clock,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20',
  },
]

const recentTickets = [
  { plate: 'ABC1D23', model: 'VW Gol', spot: 3, entryTime: '08:32', duration: '2h 30min', amount: 'R$ 22,00', method: 'Pix', status: 'paid' },
  { plate: 'XYZ4567', model: 'Fiat Uno', spot: 7, entryTime: '09:15', duration: '1h 47min', amount: 'R$ 18,50', method: 'Dinheiro', status: 'paid' },
  { plate: 'DEF2E34', model: 'Toyota Corolla', spot: 12, entryTime: '09:47', duration: '1h 15min', amount: '—', method: '—', status: 'open' },
  { plate: 'GHI5F67', model: 'Chevrolet Onix', spot: 15, entryTime: '10:03', duration: '58min', amount: '—', method: '—', status: 'open' },
  { plate: 'JKL8G90', model: 'Hyundai HB20', spot: 18, entryTime: '10:20', duration: '42min', amount: '—', method: '—', status: 'open' },
  { plate: 'MNO3H12', model: 'Honda City', spot: 22, entryTime: '10:35', duration: '27min', amount: '—', method: '—', status: 'open' },
  { plate: 'VWX0K78', model: 'Fiat Argo', spot: 31, entryTime: '08:15', duration: '3h 47min', amount: 'R$ 34,00', method: 'Cartão', status: 'paid' },
]

const quickActions = [
  { label: 'Registrar Entrada', href: '/tickets/entrada', icon: LogIn, description: 'Novo veículo no pátio' },
  { label: 'Registrar Saída', href: '/tickets/saida', icon: LogOut, description: 'Cobrar e liberar vaga' },
]

export default function Dashboard() {
  return (
    <div>
      {/* Header */}
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Visão geral em tempo real · Hoje, 28 de maio de 2026</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/tickets/entrada" className="btn-primary">
            <LogIn size={15} />
            Nova Entrada
          </Link>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {stats.map(({ label, value, sub, icon: Icon, color, bg, border }) => (
            <div key={label} className={`card-sm border ${border}`}>
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs text-muted uppercase tracking-wider">{label}</p>
                <div className={`${bg} p-1.5 rounded-lg`}>
                  <Icon size={14} className={color} />
                </div>
              </div>
              <p className="stat-value">{value}</p>
              <p className="text-xs text-muted-2 mt-1">{sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Recent tickets */}
          <div className="col-span-2 card p-0 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="text-sm font-semibold text-white">Tickets Recentes</h2>
              <Link href="/relatorios" className="text-xs text-accent hover:underline flex items-center gap-1">
                Ver todos <ArrowRight size={12} />
              </Link>
            </div>
            <table className="w-full">
              <thead className="border-b border-border bg-surface-2/50">
                <tr>
                  <th className="table-head">Placa</th>
                  <th className="table-head">Veículo</th>
                  <th className="table-head">Vaga</th>
                  <th className="table-head">Entrada</th>
                  <th className="table-head">Tempo</th>
                  <th className="table-head">Valor</th>
                  <th className="table-head">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTickets.map((t) => (
                  <tr key={t.plate + t.entryTime} className="table-row">
                    <td className="table-cell">
                      <span className="plate text-white">{t.plate}</span>
                    </td>
                    <td className="table-cell text-muted">{t.model}</td>
                    <td className="table-cell text-center">
                      <span className="text-xs bg-surface-3 text-muted px-2 py-0.5 rounded font-mono">
                        {t.spot}
                      </span>
                    </td>
                    <td className="table-cell font-mono text-xs text-muted">{t.entryTime}</td>
                    <td className="table-cell text-sm text-muted">{t.duration}</td>
                    <td className="table-cell font-medium text-white">{t.amount}</td>
                    <td className="table-cell">
                      {t.status === 'paid' ? (
                        <span className="badge-paid">Pago</span>
                      ) : (
                        <span className="badge-open">Em aberto</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {/* Quick actions */}
            <div className="card">
              <h2 className="text-sm font-semibold text-white mb-3">Ações Rápidas</h2>
              <div className="space-y-2">
                {quickActions.map(({ label, href, icon: Icon, description }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-3 p-3 rounded-lg bg-surface-2 hover:bg-surface-3 border border-border hover:border-border-2 transition-all group"
                  >
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                      <Icon size={15} className="text-accent" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white">{label}</p>
                      <p className="text-xs text-muted truncate">{description}</p>
                    </div>
                    <ArrowRight size={14} className="text-muted-2 ml-auto group-hover:text-accent transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Caixa status */}
            <div className="card border-green-500/20">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-white">Caixa</h2>
                <span className="badge-free">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Aberto
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Abertura</span>
                  <span className="text-white font-mono">08:00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Valor inicial</span>
                  <span className="text-white">R$ 200,00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Entradas</span>
                  <span className="text-green-400 font-medium">+ R$ 1.850,00</span>
                </div>
                <div className="border-t border-border pt-2 mt-2 flex justify-between text-sm">
                  <span className="text-muted font-medium">Saldo atual</span>
                  <span className="text-white font-bold">R$ 2.050,00</span>
                </div>
              </div>
              <Link href="/caixa" className="btn-ghost w-full justify-center mt-3 text-xs">
                Ver caixa completo
              </Link>
            </div>

            {/* Alerts */}
            <div className="card border-amber-500/20">
              <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <AlertCircle size={14} className="text-amber-400" />
                Avisos
              </h2>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-xs text-muted">
                  <span className="w-1 h-1 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  Vaga 10 e 42 bloqueadas para manutenção
                </div>
                <div className="flex items-start gap-2 text-xs text-muted">
                  <span className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                  VWX0K78 está há 3h47min — prazo máximo próximo
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
