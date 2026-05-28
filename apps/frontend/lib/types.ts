export type VehicleType = 'car' | 'motorcycle'
export type SpotType = 'regular' | 'handicapped' | 'motorcycle'
export type SpotStatus = 'free' | 'occupied' | 'blocked'
export type TicketStatus = 'open' | 'paid' | 'cancelled'
export type PaymentMethod = 'cash' | 'card' | 'pix'
export type OperatorRole = 'admin' | 'operator'
export type CashSessionStatus = 'open' | 'closed'
export type CashOperationType = 'income' | 'withdrawal'

export interface Operator {
  id: string
  name: string
  email: string
  role: OperatorRole
  isActive: boolean
}

export interface Spot {
  id: number
  number: number
  type: SpotType
  status: SpotStatus
  ticket?: Ticket
}

export interface Ticket {
  id: string
  spotId: number
  spotNumber: number
  plate: string
  brand: string
  model: string
  color: string
  vehicleType: VehicleType
  plateImageUrl?: string
  entryAt: Date
  exitAt?: Date
  durationMinutes?: number
  amount?: number
  paymentMethod?: PaymentMethod
  status: TicketStatus
  operatorId: string
}

export interface PricingRule {
  id: string
  name: string
  firstHourPrice: number
  additionalHourPrice: number
  dailyMax?: number
  vehicleType?: VehicleType
  isActive: boolean
}

export interface CashSession {
  id: string
  operatorId: string
  operatorName: string
  openedAt: Date
  closedAt?: Date
  openingAmount: number
  closingAmount?: number
  status: CashSessionStatus
}

export interface CashOperation {
  id: string
  sessionId: string
  ticketId?: string
  type: CashOperationType
  amount: number
  description: string
  createdAt: Date
}

export interface DashboardStats {
  freeSpots: number
  occupiedSpots: number
  totalSpots: number
  todayRevenue: number
  todayTickets: number
  avgTicket: number
}

export interface ReportSummary {
  date: string
  revenue: number
  tickets: number
}
