import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m}min`
  if (m === 0) return `${h}h`
  return `${h}h ${m}min`
}

export function calcAmount(
  entryAt: Date,
  exitAt: Date,
  firstHourPrice: number,
  additionalHourPrice: number,
  dailyMax?: number,
): number {
  const minutes = Math.floor((exitAt.getTime() - entryAt.getTime()) / 60000)
  if (minutes <= 60) return firstHourPrice
  const extraMinutes = minutes - 60
  const extra = (extraMinutes / 60) * additionalHourPrice
  const total = firstHourPrice + extra
  return dailyMax ? Math.min(total, dailyMax) : total
}
