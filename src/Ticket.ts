import * as Chance from "chance"
// import yup from "yup"

const chance = Chance()

export type Ticket = {
  id: string
  title: string
  description: string
  dueDate?: Date
  requester: string
  createdDate?: Date
  randomField1?: string
  randomField2?: string
  randomField3?: string
  randomField4?: string
  randomField5?: string
  randomField6?: string
}

export function generateMockTicket(): Ticket {
  return {
    id: chance.guid(),
    title: chance.word(),
    description: chance.sentence(),
    dueDate: chance.date({
      year: 2023,
    }) as Date,
    requester: chance.name(),
    createdDate: chance.date({
      year: 2023,
    }) as Date,
  }
}

type TicketValidationError = {
  [k in keyof Ticket]?: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function validateTicket(_ticket: Ticket): TicketValidationError {
  const validationErrors: TicketValidationError = {}
  // if (ticket.title.length > 15) {
  //   validationErrors["title"] = "Must be less than 15 characters"
  // }
  // if (!ticket.randomField2) {
  //   validationErrors["randomField2"] = "Random Field 2 is required"
  // }
  return validationErrors
}
