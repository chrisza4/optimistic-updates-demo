/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand"
import { Ticket, generateMockTicket } from "./Ticket"

const mockTickets = [generateMockTicket(), generateMockTicket()]
type withId = {
  id: string
}

function toMapById<T extends withId>(src: T[]) {
  return src.reduce<{ [k: string]: T }>((acc, val) => {
    acc[val.id] = val
    return acc
  }, {})
}

type OptimisticEntity = {
  status: "success" | "failed" | "saving"
}
type OptimisticTicket = Ticket & OptimisticEntity
type TicketStore = {
  tickets: { [k: string]: Ticket }
  optimisticTickets: { [k: string]: OptimisticTicket }
  storeTicketInOptimisticUpdates: (ticket: Ticket) => void
  settledTicket: (ticket: Ticket) => void
  markTicketSaveFailed: (id: string) => void
}
export const useTicketStore = create<TicketStore>((set) => ({
  tickets: toMapById(mockTickets),
  optimisticTickets: {},
  storeTicketInOptimisticUpdates: (ticket: Ticket) => {
    set((state) => {
      const { [ticket.id]: __, ...newTickets } = state.tickets
      const { [ticket.id]: _, ...newOptimisticTickets } =
        state.optimisticTickets
      return {
        tickets: newTickets,
        optimisticTickets: {
          ...newOptimisticTickets,
          [ticket.id]: {
            ...ticket,
            status: "saving",
          },
        },
      }
    })
  },
  settledTicket: (ticket: Ticket) => {
    set((state) => {
      const { [ticket.id]: __, ...newTickets } = state.tickets
      const { [ticket.id]: _, ...newOptimisticTickets } =
        state.optimisticTickets
      return {
        tickets: { ...newTickets, [ticket.id]: ticket },
        optimisticTickets: newOptimisticTickets,
      }
    })
  },
  markTicketSaveFailed: (id: string) => {
    set((state) => {
      const { [id]: ticket } = state.optimisticTickets
      return {
        ...state,
        optimisticTickets: {
          ...state.optimisticTickets,
          [ticket.id]: {
            ...ticket,
            status: "failed",
          },
        },
      }
    })
  },
}))
