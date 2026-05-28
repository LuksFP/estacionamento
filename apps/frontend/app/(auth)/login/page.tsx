'use client'

import { useState } from 'react'
import { ParkingSquare, Eye, EyeOff, Lock, Mail } from 'lucide-react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      window.location.href = '/dashboard'
    }, 800)
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel - decorative */}
      <div className="hidden lg:flex w-1/2 bg-surface border-r border-border flex-col p-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(245,158,11,0.08),transparent_60%)]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center">
              <ParkingSquare size={18} className="text-black" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold text-white">ParkOS</span>
          </div>

          <h2 className="text-3xl font-bold text-white leading-tight mb-3">
            Controle total do seu estacionamento
          </h2>
          <p className="text-muted text-base leading-relaxed max-w-sm">
            Entrada e saída de veículos, caixa em tempo real, relatórios completos e painel de vagas ao vivo.
          </p>
        </div>

        {/* Grid preview decoration */}
        <div className="mt-auto relative">
          <p className="text-xs text-muted-2 uppercase tracking-wider mb-3">Painel de vagas</p>
          <div className="grid grid-cols-10 gap-1.5 max-w-xs">
            {Array.from({ length: 50 }, (_, i) => {
              const occupied = [2, 6, 11, 14, 17, 21, 24, 30, 33, 36, 40, 43, 46, 48].includes(i)
              const blocked = [9, 41].includes(i)
              return (
                <div
                  key={i}
                  className={[
                    'aspect-square rounded',
                    blocked
                      ? 'bg-spot-blocked/30'
                      : occupied
                        ? 'bg-spot-occupied/50'
                        : 'bg-spot-free/30',
                  ].join(' ')}
                />
              )
            })}
          </div>
          <div className="flex items-center gap-4 mt-3">
            <span className="flex items-center gap-1.5 text-xs text-muted">
              <span className="w-2 h-2 rounded-sm bg-spot-free/50" />
              27 livres
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted">
              <span className="w-2 h-2 rounded-sm bg-spot-occupied/50" />
              23 ocupadas
            </span>
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center">
              <ParkingSquare size={18} className="text-black" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold text-white">ParkOS</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-1">Entrar</h1>
            <p className="text-muted text-sm">Acesse o painel de operação</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">E-mail</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-2" />
                <input
                  type="email"
                  className="input pl-9"
                  placeholder="operador@estacionamento.com"
                  defaultValue="operador@parkos.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="label">Senha</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input pl-9 pr-10"
                  placeholder="••••••••"
                  defaultValue="123456"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-2 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center mt-6 py-3"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Entrando...
                </span>
              ) : (
                'Entrar no sistema'
              )}
            </button>
          </form>

          <p className="text-xs text-muted-2 text-center mt-8">
            Problemas para acessar?{' '}
            <span className="text-accent cursor-pointer hover:underline">
              Contate o administrador
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
