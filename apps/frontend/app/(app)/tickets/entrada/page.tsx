'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Car, Bike, Camera, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const schema = z.object({
  plate: z.string().min(7, 'Placa inválida').max(8),
  brand: z.string().min(2, 'Informe a marca'),
  model: z.string().min(1, 'Informe o modelo'),
  color: z.string().min(1, 'Informe a cor'),
  spot: z.string().min(1, 'Selecione uma vaga'),
})

type FormData = z.infer<typeof schema>

const FREE_SPOTS = [1, 2, 4, 5, 6, 8, 9, 11, 13, 14, 16, 17, 19, 20, 21, 23, 24, 26, 28, 29, 30, 32, 33, 34, 36, 37, 39, 40, 43, 45, 47, 48, 50]
const BRANDS = ['Chevrolet', 'Fiat', 'Ford', 'Honda', 'Hyundai', 'Jeep', 'Kia', 'Mitsubishi', 'Nissan', 'Renault', 'Toyota', 'Volkswagen', 'Yamaha', 'Honda (moto)', 'Outro']
const COLORS = ['Branco', 'Preto', 'Prata', 'Cinza', 'Vermelho', 'Azul', 'Verde', 'Amarelo', 'Marrom', 'Outro']

export default function EntradaPage() {
  const [vehicleType, setVehicleType] = useState<'car' | 'motorcycle'>('car')
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    await new Promise((r) => setTimeout(r, 700))
    console.log({ vehicleType, ...data })
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      reset()
    }, 2500)
  }

  if (success) {
    return (
      <div>
        <div className="page-header">
          <h1 className="page-title">Registrar Entrada</h1>
        </div>
        <div className="p-6 flex items-center justify-center min-h-[400px]">
          <div className="text-center animate-fade-in">
            <div className="w-16 h-16 bg-green-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-green-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Entrada registrada!</h2>
            <p className="text-muted text-sm">Vaga atualizada no painel em tempo real</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Registrar Entrada</h1>
        <p className="page-subtitle">Preencha os dados do veículo e selecione a vaga</p>
      </div>

      <div className="p-6">
        <div className="max-w-xl">
          {/* Vehicle type tabs */}
          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setVehicleType('car')}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border transition-all',
                vehicleType === 'car'
                  ? 'bg-accent-subtle border-accent/40 text-accent'
                  : 'bg-surface border-border text-muted hover:text-white hover:bg-surface-2',
              )}
            >
              <Car size={15} />
              Carro
            </button>
            <button
              type="button"
              onClick={() => setVehicleType('motorcycle')}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border transition-all',
                vehicleType === 'motorcycle'
                  ? 'bg-accent-subtle border-accent/40 text-accent'
                  : 'bg-surface border-border text-muted hover:text-white hover:bg-surface-2',
              )}
            >
              <Bike size={15} />
              Moto
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="card space-y-5">
            {/* Plate */}
            <div>
              <label className="label">Placa</label>
              <div className="flex gap-2">
                <input
                  {...register('plate')}
                  className={cn('input font-mono uppercase flex-1', errors.plate && 'border-red-500/60')}
                  placeholder="ABC1D23"
                  maxLength={8}
                />
                <button
                  type="button"
                  className="btn-secondary px-3"
                  title="Capturar placa via câmera (OCR)"
                >
                  <Camera size={16} />
                </button>
              </div>
              {errors.plate && <p className="text-xs text-red-400 mt-1">{errors.plate.message}</p>}
              <p className="text-xs text-muted-2 mt-1">Formato Mercosul (ABC1D23) ou antigo (ABC-1234)</p>
            </div>

            {/* Brand + Model */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Marca</label>
                <select
                  {...register('brand')}
                  className={cn('input', errors.brand && 'border-red-500/60')}
                >
                  <option value="">Selecionar...</option>
                  {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
                {errors.brand && <p className="text-xs text-red-400 mt-1">{errors.brand.message}</p>}
              </div>
              <div>
                <label className="label">Modelo</label>
                <input
                  {...register('model')}
                  className={cn('input', errors.model && 'border-red-500/60')}
                  placeholder="Ex: Gol, Onix, Corolla"
                />
                {errors.model && <p className="text-xs text-red-400 mt-1">{errors.model.message}</p>}
              </div>
            </div>

            {/* Color */}
            <div>
              <label className="label">Cor</label>
              <select
                {...register('color')}
                className={cn('input', errors.color && 'border-red-500/60')}
              >
                <option value="">Selecionar...</option>
                {COLORS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.color && <p className="text-xs text-red-400 mt-1">{errors.color.message}</p>}
            </div>

            {/* Spot */}
            <div>
              <label className="label">Vaga</label>
              <div className="grid grid-cols-10 gap-1.5 mb-2">
                {FREE_SPOTS.map((n) => (
                  <label key={n} className="cursor-pointer">
                    <input type="radio" {...register('spot')} value={String(n)} className="sr-only peer" />
                    <div className="aspect-square rounded border text-xs flex items-center justify-center font-mono transition-all
                      border-border text-muted peer-checked:bg-accent peer-checked:text-black peer-checked:border-accent
                      hover:border-border-2 hover:text-white font-medium">
                      {n}
                    </div>
                  </label>
                ))}
              </div>
              {errors.spot && <p className="text-xs text-red-400 mt-1">{errors.spot.message}</p>}
              <p className="text-xs text-muted-2">{FREE_SPOTS.length} vagas disponíveis</p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full justify-center py-3"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Registrando...
                </span>
              ) : (
                <>
                  <Car size={15} />
                  Registrar Entrada
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
