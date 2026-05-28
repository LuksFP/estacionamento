'use client'

import { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Download, TrendingUp, Car, Clock, Percent } from 'lucide-react'

const PERIODS = ['Hoje', '7 dias', '30 dias', 'Personalizado'] as const
type Period = typeof PERIODS[number]

const CHART_DATA = [
  { day: 'Seg', revenue: 1240 },
  { day: 'Ter', revenue: 1580 },
  { day: 'Qua', revenue: 980 },
  { day: 'Qui', revenue: 1750 },
  { day: 'Sex', revenue: 2100 },
  { day: 'Sáb', revenue: 2450 },
  { day: 'Dom', revenue: 1890 },
]

const MOCK_TICKETS = [
  { plate: 'ABC1D23', model: 'VW Gol', entry: '08:32', exit: '11:02', duration: '2h 30min', amount: 22.00, method: 'Pix' },
  { plate: 'XYZ4567', model: 'Fiat Uno', entry: '09:15', exit: '11:02', duration: '1h 47min', amount: 18.50, method: 'Dinheiro' },
  { plate: 'VWX0K78', model: 'Fiat Argo', entry: '08:15', exit: '12:02', duration: '3h 47min', amount: 34.00, method: 'Cartão' },
  { plate: 'YZA2L90', model: 'VW Polo', entry: '09:30', exit: '12:02', duration: '2h 32min', amount: 22.00, method: 'Pix' },
  { plate: 'HIJ8O56', model: 'Toyota Hilux', entry: '08:50', exit: '12:02', duration: '3h 12min', amount: 28.50, method: 'Cartão' },
  { plate: 'KLM0P78', model: 'Honda HR-V', entry: '09:05', exit: '12:02', duration: '2h 57min', amount: 28.50, method: 'Pix' },
  { plate: 'NOP2Q90', model: 'Jeep Compass', entry: '09:55', exit: '12:02', duration: '2h 07min', amount: 18.50, method: 'Pix' },
]

const STATS = [
  { label: 'Faturamento', value: 'R$ 11.990', sub: 'na semana', icon: TrendingUp, color: 'text-accent' },
  { label: 'Veículos', value: '324', sub: 'atendidos', icon: Car, color: 'text-blue-400' },
  { label: 'Ticket Médio', value: 'R$ 36,99', sub: 'por veículo', icon: Clock, color: 'text-green-400' },
  { label: 'Taxa Média', value: '62%', sub: 'de ocupação', icon: Percent, color: 'text-purple-400' },
]

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-surface-2 border border-border rounded-lg px-3 py-2 text-sm">
      <p className="text-muted mb-0.5">{label}</p>
      <p className="text-white font-bold">
        R$ {payload[0].value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
      </p>
    </div>
  )
}

export default function RelatoriosPage() {
  const [period, setPeriod] = useState<Period>('7 dias')

  return (
    <div>
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="page-title">Relatórios</h1>
          <p className="page-subtitle">Análise de faturamento e movimentação</p>
        </div>
        <button className="btn-secondary text-xs">
          <Download size={13} />
          Exportar CSV
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Period selector */}
        <div className="flex gap-2">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                period === p
                  ? 'bg-accent-subtle border-accent/40 text-accent'
                  : 'bg-surface border-border text-muted hover:text-white hover:bg-surface-2'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {STATS.map(({ label, value, sub, icon: Icon, color }) => (
            <div key={label} className="card-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-muted uppercase tracking-wider">{label}</p>
                <Icon size={14} className={color} />
              </div>
              <p className="stat-value">{value}</p>
              <p className="text-xs text-muted-2 mt-1">{sub}</p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="card">
          <h2 className="text-sm font-semibold text-white mb-5">Faturamento por Dia</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={CHART_DATA} barSize={32}>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#8892a6', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#8892a6', fontSize: 12 }}
                tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
              <Bar dataKey="revenue" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Table */}
        <div className="card p-0 overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold text-white">
              Histórico de Tickets · {period}
            </h2>
          </div>
          <table className="w-full">
            <thead className="border-b border-border bg-surface-2/50">
              <tr>
                <th className="table-head">Placa</th>
                <th className="table-head">Veículo</th>
                <th className="table-head">Entrada</th>
                <th className="table-head">Saída</th>
                <th className="table-head">Permanência</th>
                <th className="table-head">Pagamento</th>
                <th className="table-head text-right">Valor</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_TICKETS.map((t) => (
                <tr key={t.plate + t.entry} className="table-row">
                  <td className="table-cell">
                    <span className="plate text-white">{t.plate}</span>
                  </td>
                  <td className="table-cell text-muted">{t.model}</td>
                  <td className="table-cell font-mono text-xs text-muted">{t.entry}</td>
                  <td className="table-cell font-mono text-xs text-muted">{t.exit}</td>
                  <td className="table-cell text-muted">{t.duration}</td>
                  <td className="table-cell">
                    <span className="text-xs bg-surface-3 text-muted px-2 py-0.5 rounded">
                      {t.method}
                    </span>
                  </td>
                  <td className="table-cell text-right font-medium text-white">
                    R$ {t.amount.toFixed(2).replace('.', ',')}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t border-border-2 bg-surface-2/50">
              <tr>
                <td colSpan={6} className="table-cell text-xs text-muted font-medium">
                  Total · {MOCK_TICKETS.length} tickets
                </td>
                <td className="table-cell text-right font-bold text-white">
                  R$ {MOCK_TICKETS.reduce((s, t) => s + t.amount, 0).toFixed(2).replace('.', ',')}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}
