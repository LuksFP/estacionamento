import type { Metadata } from 'next'
import { SpotGrid } from '@/components/spot-grid'
import { RefreshCw } from 'lucide-react'

export const metadata: Metadata = { title: 'Painel de Vagas' }

export default function PainelPage() {
  return (
    <div>
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="page-title">Painel de Vagas</h1>
          <p className="page-subtitle">Visão em tempo real · atualização via WebSocket</p>
        </div>
        <button className="btn-ghost text-xs">
          <RefreshCw size={13} />
          Atualizar
        </button>
      </div>

      <div className="p-6">
        <div className="card">
          <SpotGrid />
        </div>
      </div>
    </div>
  )
}
