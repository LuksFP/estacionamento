'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  ParkingSquare,
  LogIn,
  LogOut,
  Wallet,
  BarChart3,
  Power,
  User,
  Circle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/painel', label: 'Painel de Vagas', icon: ParkingSquare },
  { href: '/tickets/entrada', label: 'Entrada', icon: LogIn },
  { href: '/tickets/saida', label: 'Saída', icon: LogOut },
  { href: '/caixa', label: 'Caixa', icon: Wallet },
  { href: '/relatorios', label: 'Relatórios', icon: BarChart3 },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-60 shrink-0 bg-surface border-r border-border flex flex-col h-screen sticky top-0 shadow-[1px_0_0_#e2e8f0]">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center shrink-0 shadow-sm">
            <ParkingSquare size={15} className="text-black" strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-900 tracking-tight leading-tight">ParkOS</p>
            <p className="text-[11px] text-muted leading-tight">Gestão de Estacionamento</p>
          </div>
        </div>
      </div>

      {/* Caixa status pill */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
          <Circle size={6} className="fill-green-500 text-green-500" />
          <span className="text-xs text-green-700 font-medium">Caixa aberto</span>
          <span className="text-xs text-muted ml-auto">desde 08:00</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 group',
                active
                  ? 'bg-accent-subtle text-amber-700 font-semibold'
                  : 'text-slate-600 hover:bg-surface-3 hover:text-slate-900',
              )}
            >
              <Icon
                size={16}
                strokeWidth={active ? 2.5 : 2}
                className={cn(
                  'shrink-0 transition-colors',
                  active ? 'text-accent' : 'text-slate-400 group-hover:text-slate-600',
                )}
              />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-surface-3 transition-colors cursor-default">
          <div className="w-7 h-7 rounded-full bg-surface-3 border border-border flex items-center justify-center shrink-0">
            <User size={13} className="text-muted" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-900 truncate">Operador 1</p>
            <p className="text-[11px] text-muted">Turno da Manhã</p>
          </div>
          <button
            className="text-muted hover:text-red-500 transition-colors p-1 rounded"
            title="Sair"
          >
            <Power size={13} />
          </button>
        </div>
      </div>
    </aside>
  )
}
