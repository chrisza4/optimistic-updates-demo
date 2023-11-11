import { Ticket, generateMockTicket } from "./Ticket"

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms)
  })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function saveTicket(_ticket: Ticket) {
  await delay(3000)
  // const m = Math.random()
  // if (m < 0.1) {
  //   throw new Error("API Error")
  // }
  return
}

export async function loadTicket() {
  console.log("Load ticket...")
  await delay(2000)
  return [generateMockTicket(), generateMockTicket()]
}
