'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Car, X, Clock, CreditCard } from 'lucide-react'

interface SpotData {
  id: number
  number: number
  status: 'free' | 'occupied' | 'blocked'
  plate?: string
  model?: string
  entryTime?: string
  duration?: string
  estimatedAmount?: string
}

const MOCK_SPOTS: SpotData[] = [
  { id: 1, number: 1, status: 'free' },
  { id: 2, number: 2, status: 'free' },
  { id: 3, number: 3, status: 'occupied', plate: 'ABC1D23', model: 'VW Gol', entryTime: '08:32', duration: '2h 30min', estimatedAmount: 'R$ 22,00' },
  { id: 4, number: 4, status: 'free' },
  { id: 5, number: 5, status: 'free' },
  { id: 6, number: 6, status: 'free' },
  { id: 7, number: 7, status: 'occupied', plate: 'XYZ4567', model: 'Fiat Uno', entryTime: '09:15', duration: '1h 47min', estimatedAmount: 'R$ 18,50' },
  { id: 8, number: 8, status: 'free' },
  { id: 9, number: 9, status: 'free' },
  { id: 10, number: 10, status: 'blocked' },
  { id: 11, number: 11, status: 'free' },
  { id: 12, number: 12, status: 'occupied', plate: 'DEF2E34', model: 'Toyota Corolla', entryTime: '09:47', duration: '1h 15min', estimatedAmount: 'R$ 12,00' },
  { id: 13, number: 13, status: 'free' },
  { id: 14, number: 14, status: 'free' },
  { id: 15, number: 15, status: 'occupied', plate: 'GHI5F67', model: 'Chevrolet Onix', entryTime: '10:03', duration: '58min', estimatedAmount: 'R$ 8,50' },
  { id: 16, number: 16, status: 'free' },
  { id: 17, number: 17, status: 'free' },
  { id: 18, number: 18, status: 'occupied', plate: 'JKL8G90', model: 'Hyundai HB20', entryTime: '10:20', duration: '42min', estimatedAmount: 'R$ 8,50' },
  { id: 19, number: 19, status: 'free' },
  { id: 20, number: 20, status: 'free' },
  { id: 21, number: 21, status: 'free' },
  { id: 22, number: 22, status: 'occupied', plate: 'MNO3H12', model: 'Honda City', entryTime: '10:35', duration: '27min', estimatedAmount: 'R$ 8,50' },
  { id: 23, number: 23, status: 'free' },
  { id: 24, number: 24, status: 'free' },
  { id: 25, number: 25, status: 'occupied', plate: 'PQR6I34', model: 'Renault Kwid', entryTime: '10:44', duration: '18min', estimatedAmount: 'R$ 8,50' },
  { id: 26, number: 26, status: 'free' },
  { id: 27, number: 27, status: 'occupied', plate: 'STU9J56', model: 'Ford Ka', entryTime: '11:00', duration: '2min', estimatedAmount: 'R$ 8,50' },
  { id: 28, number: 28, status: 'free' },
  { id: 29, number: 29, status: 'free' },
  { id: 30, number: 30, status: 'free' },
  { id: 31, number: 31, status: 'occupied', plate: 'VWX0K78', model: 'Fiat Argo', entryTime: '08:15', duration: '3h 47min', estimatedAmount: 'R$ 34,00' },
  { id: 32, number: 32, status: 'free' },
  { id: 33, number: 33, status: 'free' },
  { id: 34, number: 34, status: 'free' },
  { id: 35, number: 35, status: 'occupied', plate: 'YZA2L90', model: 'VW Polo', entryTime: '09:30', duration: '2h 32min', estimatedAmount: 'R$ 22,00' },
  { id: 36, number: 36, status: 'free' },
  { id: 37, number: 37, status: 'free' },
  { id: 38, number: 38, status: 'occupied', plate: 'BCD4M12', model: 'Nissan Kicks', entryTime: '10:10', duration: '52min', estimatedAmount: 'R$ 8,50' },
  { id: 39, number: 39, status: 'free' },
  { id: 40, number: 40, status: 'free' },
  { id: 41, number: 41, status: 'occupied', plate: 'EFG6N34', model: 'Chevrolet S10', entryTime: '10:25', duration: '37min', estimatedAmount: 'R$ 8,50' },
  { id: 42, number: 42, status: 'blocked' },
  { id: 43, number: 43, status: 'free' },
  { id: 44, number: 44, status: 'occupied', plate: 'HIJ8O56', model: 'Toyota Hilux', entryTime: '08:50', duration: '3h 12min', estimatedAmount: 'R$ 28,50' },
  { id: 45, number: 45, status: 'free' },
  { id: 46, number: 46, status: 'occupied', plate: 'KLM0P78', model: 'Honda HR-V', entryTime: '09:05', duration: '2h 57min', estimatedAmount: 'R$ 28,50' },
  { id: 47, number: 47, status: 'free' },
  { id: 48, number: 48, status: 'free' },
  { id: 49, number: 49, status: 'occupied', plate: 'NOP2Q90', model: 'Jeep Compass', entryTime: '09:55', duration: '2h 07min', estimatedAmount: 'R$ 18,50' },
  { id: 50, number: 50, status: 'free' },
]

export function SpotGrid() {
  const [selected, setSelected] = useState<SpotData | null>(null)

  const free = MOCK_SPOTS.filter((s) => s.status === 'free').length
  const occupied = MOCK_SPOTS.filter((s) => s.status === 'occupied').length
  const blocked = MOCK_SPOTS.filter((s) => s.status === 'blocked').length

  return (
    <div className="space-y-5">
      {/* Stats bar */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-sm bg-spot-free" />
          <span className="text-sm text-white font-medium">{free} livres</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-sm bg-spot-occupied" />
          <span className="text-sm text-muted">{occupied} ocupadas</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-sm bg-spot-blocked" />
          <span className="text-sm text-muted">{blocked} bloqueadas</span>
        </div>
        <div className="ml-auto">
          <div className="w-40 h-2 bg-surface-3 rounded-full overflow-hidden">
            <div
              className="h-full bg-spot-occupied rounded-full transition-all"
              style={{ width: `${(occupied / 50) * 100}%` }}
            />
          </div>
          <p className="text-xs text-muted mt-1 text-right">{Math.round((occupied / 50) * 100)}% de ocupação</p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-10 gap-2">
        {MOCK_SPOTS.map((spot) => (
          <button
            key={spot.id}
            onClick={() => spot.status !== 'blocked' ? setSelected(spot) : undefined}
            className={cn(
              'relative aspect-square rounded-lg border flex flex-col items-center justify-center transition-all duration-150',
              spot.status === 'free' && [
                'bg-spot-free/10 border-spot-free/30 text-spot-free',
                'hover:bg-spot-free/20 hover:border-spot-free/60 cursor-pointer',
              ],
              spot.status === 'occupied' && [
                'bg-spot-occupied/10 border-spot-occupied/30 text-spot-occupied',
                'hover:bg-spot-occupied/20 hover:border-spot-occupied/60 cursor-pointer',
              ],
              spot.status === 'blocked' && [
                'bg-spot-blocked/40 border-spot-blocked/30 text-muted-2 cursor-default',
              ],
              selected?.id === spot.id && 'ring-2 ring-accent ring-offset-1 ring-offset-background',
            )}
          >
            <span className="text-xs font-bold tabular-nums">{spot.number}</span>
            {spot.status === 'occupied' && (
              <span className="absolute bottom-1 left-0 right-0 text-center text-[8px] font-mono text-spot-occupied/70 px-0.5 truncate">
                {spot.plate?.slice(0, 7)}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Detail drawer */}
      {selected && (
        <div className="animate-fade-in bg-surface-2 border border-border-2 rounded-xl p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-muted uppercase tracking-wider mb-1">Vaga {selected.number}</p>
              {selected.status === 'occupied' ? (
                <p className="plate text-xl text-white">{selected.plate}</p>
              ) : (
                <p className="text-base font-medium text-spot-free">Livre</p>
              )}
            </div>
            <button
              onClick={() => setSelected(null)}
              className="text-muted-2 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {selected.status === 'occupied' && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-surface-3 rounded-lg p-3">
                <p className="text-xs text-muted mb-1 flex items-center gap-1">
                  <Car size={11} /> Veículo
                </p>
                <p className="text-sm text-white font-medium">{selected.model}</p>
              </div>
              <div className="bg-surface-3 rounded-lg p-3">
                <p className="text-xs text-muted mb-1 flex items-center gap-1">
                  <Clock size={11} /> Tempo
                </p>
                <p className="text-sm text-white font-medium">{selected.duration}</p>
                <p className="text-xs text-muted-2">desde {selected.entryTime}</p>
              </div>
              <div className="bg-surface-3 rounded-lg p-3">
                <p className="text-xs text-muted mb-1 flex items-center gap-1">
                  <CreditCard size={11} /> Estimativa
                </p>
                <p className="text-sm text-accent font-bold">{selected.estimatedAmount}</p>
              </div>
            </div>
          )}

          {selected.status === 'free' && (
            <a
              href={`/tickets/entrada?spot=${selected.number}`}
              className="btn-primary w-full justify-center mt-2"
            >
              Registrar Entrada
            </a>
          )}
        </div>
      )}
    </div>
  )
}
