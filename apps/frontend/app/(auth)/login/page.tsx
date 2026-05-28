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
      {/* Left panel — brand amber */}
      <div className="hidden lg:flex w-5/12 bg-accent flex-col p-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,0,0,0.12),transparent_70%)]" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full translate-y-1/3 -translate-x-1/4" />

        <div className="relative">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-black/15 rounded-xl flex items-center justify-center">
              <ParkingSquare size={20} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold text-white">ParkOS</span>
          </div>

          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Controle total do seu estacionamento.
          </h2>
          <p className="text-amber-100 text-base leading-relaxed max-w-xs">
            Entrada, saída, caixa em tempo real e painel de vagas ao vivo — tudo em um só lugar.
          </p>
        </div>

        {/* Mini spot grid decoration */}
        <div className="mt-auto relative">
          <p className="text-xs text-amber-200 uppercase tracking-wider font-medium mb-3">Painel de vagas</p>
          <div className="grid grid-cols-10 gap-1.5 max-w-[260px]">
            {Array.from({ length: 50 }, (_, i) => {
              const occupied = [2, 6, 11, 14, 17, 21, 24, 30, 33, 36, 40, 43, 46, 48].includes(i)
              const blocked = [9, 41].includes(i)
              return (
                <div
                  key={i}
                  className={[
                    'aspect-square rounded',
                    blocked
                      ? 'bg-black/20'
                      : occupied
                        ? 'bg-white/30'
                        : 'bg-white/10',
                  ].join(' ')}
                />
              )
            })}
          </div>
          <div className="flex items-center gap-4 mt-3">
            <span className="flex items-center gap-1.5 text-xs text-amber-100">
              <span className="w-2 h-2 rounded-sm bg-white/20" /> 27 livres
            </span>
            <span className="flex items-center gap-1.5 text-xs text-amber-100">
              <span className="w-2 h-2 rounded-sm bg-white/50" /> 23 ocupadas
            </span>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center">
              <ParkingSquare size={18} className="text-black" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold text-slate-900">ParkOS</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Entrar</h1>
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
                  placeholder="operador@parkos.com"
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-2 hover:text-slate-700 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center mt-6 py-3 text-base"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  Entrando...
                </span>
              ) : (
                'Entrar no sistema'
              )}
            </button>
          </form>

          <p className="text-xs text-muted text-center mt-8">
            Problemas para acessar?{' '}
            <span className="text-amber-600 cursor-pointer hover:underline font-medium">
              Contate o administrador
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
