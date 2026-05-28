'use client'

import { useState } from 'react'
import { Search, Car, Clock, CreditCard, Banknote, Smartphone, CheckCircle2, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type PaymentMethod = 'cash' | 'card' | 'pix'

const MOCK_OPEN_TICKETS = [
  { plate: 'DEF2E34', model: 'Toyota Corolla', spot: 12, entryTime: '09:47', duration: '1h 15min', amount: 12.00 },
  { plate: 'GHI5F67', model: 'Chevrolet Onix', spot: 15, entryTime: '10:03', duration: '58min', amount: 8.50 },
  { plate: 'JKL8G90', model: 'Hyundai HB20', spot: 18, entryTime: '10:20', duration: '42min', amount: 8.50 },
  { plate: 'MNO3H12', model: 'Honda City', spot: 22, entryTime: '10:35', duration: '27min', amount: 8.50 },
  { plate: 'PQR6I34', model: 'Renault Kwid', spot: 25, entryTime: '10:44', duration: '18min', amount: 8.50 },
  { plate: 'STU9J56', model: 'Ford Ka', spot: 27, entryTime: '11:00', duration: '2min', amount: 8.50 },
  { plate: 'VWX0K78', model: 'Fiat Argo', spot: 31, entryTime: '08:15', duration: '3h 47min', amount: 34.00 },
  { plate: 'YZA2L90', model: 'VW Polo', spot: 35, entryTime: '09:30', duration: '2h 32min', amount: 22.00 },
  { plate: 'BCD4M12', model: 'Nissan Kicks', spot: 38, entryTime: '10:10', duration: '52min', amount: 8.50 },
  { plate: 'EFG6N34', model: 'Chevrolet S10', spot: 41, entryTime: '10:25', duration: '37min', amount: 8.50 },
  { plate: 'HIJ8O56', model: 'Toyota Hilux', spot: 44, entryTime: '08:50', duration: '3h 12min', amount: 28.50 },
  { plate: 'KLM0P78', model: 'Honda HR-V', spot: 46, entryTime: '09:05', duration: '2h 57min', amount: 28.50 },
  { plate: 'NOP2Q90', model: 'Jeep Compass', spot: 49, entryTime: '09:55', duration: '2h 07min', amount: 18.50 },
]

const PAYMENT_METHODS = [
  { id: 'cash' as PaymentMethod, label: 'Dinheiro', icon: Banknote },
  { id: 'card' as PaymentMethod, label: 'Cartão', icon: CreditCard },
  { id: 'pix' as PaymentMethod, label: 'Pix', icon: Smartphone },
]

export default function SaidaPage() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<typeof MOCK_OPEN_TICKETS[0] | null>(null)
  const [payment, setPayment] = useState<PaymentMethod>('pix')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const filtered = query.length >= 2
    ? MOCK_OPEN_TICKETS.filter(
        (t) =>
          t.plate.toLowerCase().includes(query.toLowerCase()) ||
          String(t.spot).includes(query),
      )
    : []

  async function handleCheckout() {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 700))
    setSuccess(true)
    setLoading(false)
  }

  if (success && selected) {
    return (
      <div>
        <div className="page-header">
          <h1 className="page-title">Registrar Saída</h1>
        </div>
        <div className="p-6 flex items-center justify-center min-h-[400px]">
          <div className="text-center animate-fade-in">
            <div className="w-16 h-16 bg-green-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-green-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-1">Saída registrada!</h2>
            <p className="text-muted text-sm mb-4">
              {selected.plate} · R${' '}
              {selected.amount.toFixed(2).replace('.', ',')} · {PAYMENT_METHODS.find((m) => m.id === payment)?.label}
            </p>
            <button
              onClick={() => { setSuccess(false); setSelected(null); setQuery('') }}
              className="btn-primary"
            >
              Nova saída
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Registrar Saída</h1>
        <p className="page-subtitle">Busque por placa ou número da vaga</p>
      </div>

      <div className="p-6">
        <div className="max-w-xl space-y-5">
          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-2" />
            <input
              className="input pl-10"
              placeholder="Placa ou número da vaga..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setSelected(null) }}
              autoFocus
            />
            {query && (
              <button
                onClick={() => { setQuery(''); setSelected(null) }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-2 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Search results */}
          {filtered.length > 0 && !selected && (
            <div className="card p-0 overflow-hidden animate-fade-in">
              {filtered.map((t, i) => (
                <button
                  key={t.plate}
                  onClick={() => setSelected(t)}
                  className={cn(
                    'w-full flex items-center gap-4 px-4 py-3 hover:bg-surface-2 transition-colors text-left',
                    i > 0 && 'border-t border-border',
                  )}
                >
                  <div className="w-8 h-8 bg-surface-2 rounded-lg flex items-center justify-center shrink-0">
                    <Car size={15} className="text-muted" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="plate text-white text-sm">{t.plate}</p>
                    <p className="text-xs text-muted truncate">{t.model} · Vaga {t.spot}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-medium text-white">R$ {t.amount.toFixed(2).replace('.', ',')}</p>
                    <p className="text-xs text-muted">{t.duration}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {query.length >= 2 && filtered.length === 0 && !selected && (
            <div className="card text-center py-8">
              <p className="text-muted text-sm">Nenhum ticket em aberto encontrado para &quot;{query}&quot;</p>
            </div>
          )}

          {/* Ticket details + checkout */}
          {selected && (
            <div className="space-y-4 animate-fade-in">
              {/* Vehicle card */}
              <div className="card border-border-2">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wider mb-1">Ticket em aberto</p>
                    <p className="plate text-2xl text-white">{selected.plate}</p>
                    <p className="text-sm text-muted mt-0.5">{selected.model} · Vaga {selected.spot}</p>
                  </div>
                  <button onClick={() => setSelected(null)} className="text-muted-2 hover:text-white">
                    <X size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="bg-surface-2 rounded-lg p-3">
                    <p className="text-xs text-muted mb-1 flex items-center gap-1">
                      <Clock size={11} /> Entrada
                    </p>
                    <p className="text-sm font-mono text-white">{selected.entryTime}</p>
                  </div>
                  <div className="bg-surface-2 rounded-lg p-3">
                    <p className="text-xs text-muted mb-1">Permanência</p>
                    <p className="text-sm text-white font-medium">{selected.duration}</p>
                  </div>
                  <div className="bg-surface-2 rounded-lg p-3">
                    <p className="text-xs text-muted mb-1">Valor</p>
                    <p className="text-base font-bold text-accent">
                      R$ {selected.amount.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                </div>

                {/* Payment method */}
                <div className="mb-5">
                  <label className="label">Forma de Pagamento</label>
                  <div className="grid grid-cols-3 gap-2">
                    {PAYMENT_METHODS.map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setPayment(id)}
                        className={cn(
                          'flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium transition-all',
                          payment === id
                            ? 'bg-accent-subtle border-accent/40 text-accent'
                            : 'bg-surface-2 border-border text-muted hover:text-white hover:border-border-2',
                        )}
                      >
                        <Icon size={15} />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="btn-primary w-full justify-center py-3"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Processando...
                    </span>
                  ) : (
                    <>
                      <CheckCircle2 size={15} />
                      Confirmar Saída · R$ {selected.amount.toFixed(2).replace('.', ',')}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
