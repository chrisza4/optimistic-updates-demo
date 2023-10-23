import * as Chance from "chance"

const chance = Chance()

export type Ticket = {
  id: string
  title: string
  description: string
  dueDate: Date
  requester: string
  createdDate: Date
}

export function generateMockTicket(): Ticket {
  return {
    id: chance.guid(),
    title: chance.sentence(),
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
