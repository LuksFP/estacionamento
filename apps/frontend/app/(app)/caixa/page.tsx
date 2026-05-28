'use client'

import { useState } from 'react'
import { Wallet, TrendingUp, TrendingDown, Circle, Clock, ArrowDownLeft, ArrowUpRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const MOCK_OPERATIONS = [
  { id: '1', time: '08:00', type: 'income' as const, description: 'Abertura de caixa', amount: 200.00 },
  { id: '2', time: '08:47', type: 'income' as const, description: 'Ticket · ABC1D23 · VW Gol', amount: 22.00 },
  { id: '3', time: '09:22', type: 'income' as const, description: 'Ticket · XYZ4567 · Fiat Uno', amount: 18.50 },
  { id: '4', time: '09:35', type: 'withdrawal' as const, description: 'Sangria', amount: 300.00 },
  { id: '5', time: '09:50', type: 'income' as const, description: 'Ticket · VWX0K78 · Fiat Argo', amount: 34.00 },
  { id: '6', time: '10:10', type: 'income' as const, description: 'Ticket · PQR6I34 · Renault Kwid', amount: 12.00 },
  { id: '7', time: '10:30', type: 'income' as const, description: 'Ticket · STU9J56 · Ford Ka', amount: 8.50 },
  { id: '8', time: '10:55', type: 'income' as const, description: 'Ticket · MNO3H12 · Honda City', amount: 8.50 },
]

export default function CaixaPage() {
  const [showSangria, setShowSangria] = useState(false)
  const [sangriaValue, setSangriaValue] = useState('')
  const [sangriaDesc, setSangriaDesc] = useState('')

  const totalIncome = MOCK_OPERATIONS
    .filter((o) => o.type === 'income')
    .reduce((s, o) => s + o.amount, 0)

  const totalWithdrawals = MOCK_OPERATIONS
    .filter((o) => o.type === 'withdrawal')
    .reduce((s, o) => s + o.amount, 0)

  const balance = totalIncome - totalWithdrawals

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Controle de Caixa</h1>
        <p className="page-subtitle">Turno atual · Operador 1 · Manhã</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Session status */}
        <div className="grid grid-cols-4 gap-4">
          <div className="card-sm col-span-1 border-green-500/20">
            <div className="flex items-center gap-2 mb-3">
              <Circle size={8} className="fill-green-400 text-green-400" />
              <span className="text-xs text-green-400 font-medium uppercase tracking-wider">Caixa Aberto</span>
            </div>
            <p className="stat-value">R$ {balance.toFixed(2).replace('.', ',')}</p>
            <p className="text-xs text-muted-2 mt-1 flex items-center gap-1">
              <Clock size={11} /> Aberto às 08:00
            </p>
          </div>

          <div className="card-sm">
            <p className="text-xs text-muted uppercase tracking-wider mb-3">Entradas</p>
            <p className="stat-value text-green-400">R$ {totalIncome.toFixed(2).replace('.', ',')}</p>
            <p className="text-xs text-muted-2 mt-1">{MOCK_OPERATIONS.filter(o => o.type === 'income').length} operações</p>
          </div>

          <div className="card-sm">
            <p className="text-xs text-muted uppercase tracking-wider mb-3">Sangrias</p>
            <p className="stat-value text-red-400">R$ {totalWithdrawals.toFixed(2).replace('.', ',')}</p>
            <p className="text-xs text-muted-2 mt-1">{MOCK_OPERATIONS.filter(o => o.type === 'withdrawal').length} retirada</p>
          </div>

          <div className="card-sm">
            <p className="text-xs text-muted uppercase tracking-wider mb-3">Valor inicial</p>
            <p className="stat-value">R$ 200,00</p>
            <p className="text-xs text-muted-2 mt-1">Fundo de caixa</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Operations list */}
          <div className="col-span-2 card p-0 overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="text-sm font-semibold text-white">Movimentações do Turno</h2>
            </div>
            <div className="divide-y divide-border">
              {MOCK_OPERATIONS.map((op) => (
                <div key={op.id} className="flex items-center gap-4 px-5 py-3 hover:bg-surface-2 transition-colors">
                  <div className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                    op.type === 'income' ? 'bg-green-400/10' : 'bg-red-400/10',
                  )}>
                    {op.type === 'income'
                      ? <ArrowDownLeft size={14} className="text-green-400" />
                      : <ArrowUpRight size={14} className="text-red-400" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{op.description}</p>
                  </div>
                  <span className="text-xs font-mono text-muted-2 shrink-0">{op.time}</span>
                  <span className={cn(
                    'text-sm font-medium shrink-0 w-24 text-right',
                    op.type === 'income' ? 'text-green-400' : 'text-red-400',
                  )}>
                    {op.type === 'income' ? '+' : '-'} R$ {op.amount.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            {showSangria ? (
              <div className="card animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-white">Registrar Sangria</h3>
                  <button onClick={() => setShowSangria(false)} className="text-muted-2 hover:text-white">
                    <X size={14} />
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="label">Valor</label>
                    <input
                      type="number"
                      className="input"
                      placeholder="R$ 0,00"
                      value={sangriaValue}
                      onChange={(e) => setSangriaValue(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="label">Justificativa</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Motivo da retirada"
                      value={sangriaDesc}
                      onChange={(e) => setSangriaDesc(e.target.value)}
                    />
                  </div>
                  <button className="btn-danger w-full justify-center">
                    <TrendingDown size={14} />
                    Confirmar Sangria
                  </button>
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setShowSangria(true)}
                  className="btn-secondary w-full justify-center"
                >
                  <TrendingDown size={15} />
                  Registrar Sangria
                </button>

                <button className="btn-secondary w-full justify-center">
                  <TrendingUp size={15} />
                  Registrar Suprimento
                </button>
              </>
            )}

            <div className="border-t border-border pt-3">
              <button className="btn-danger w-full justify-center">
                <Wallet size={15} />
                Fechar Caixa
              </button>
              <p className="text-xs text-muted-2 text-center mt-2">
                Saldo esperado: R$ {balance.toFixed(2).replace('.', ',')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
