/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  CircularProgress,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import ErrorIcon from "@mui/icons-material/Error"
import TicketForm from "./TicketFormV3"
import { Ticket } from "./Ticket"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { QueryClient, QueryClientProvider, useQuery } from "react-query"
import { loadTicket, saveTicket } from "./TicketApi"
import { useTicketStore } from "./TicketStore"

const queryClient = new QueryClient()

const initialTicket: Ticket = {
  id: "",
  title: "",
  description: "",
  dueDate: new Date(),
  requester: "",
  createdDate: new Date(),
}

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <QueryClientProvider client={queryClient}>
        <TicketApp />
      </QueryClientProvider>
    </LocalizationProvider>
  )
}

const saveTicketOptimistically = async (ticket: Ticket) => {
  useTicketStore.getState().storeTicketInOptimisticUpdates(ticket)
  try {
    console.log(ticket)
    await saveTicket(ticket)
    console.log(ticket)
    useTicketStore.getState().settledTicket(ticket)
  } catch (err) {
    useTicketStore.getState().markTicketSaveFailed(ticket.id)
  }
}

const TicketApp = () => {
  const { tickets, optimisticTickets, setInitialTickets } = useTicketStore()
  const [open, setOpen] = useState(false)
  const [currentTicket, setCurrentTicket] = useState(initialTicket)
  const { isFetching } = useQuery(
    ["ticket"],
    () => {
      return loadTicket()
    },
    {
      onSuccess: (data) => setInitialTickets(data),
    },
  )
  const handleOpen = (ticket: Ticket) => {
    setCurrentTicket(ticket)
    setOpen(true)
  }
  const handleSave = (ticket: Ticket) => {
    setOpen(false)
    saveTicketOptimistically(ticket)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div style={{ margin: 40 }}>
      <h1>Ticket App</h1>
      {isFetching && <CircularProgress />}
      {!isFetching && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Requester</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.values(optimisticTickets).map((ticket, index) => (
                <TableRow key={index}>
                  <TableCell>{ticket.title}</TableCell>
                  <TableCell>{ticket.description}</TableCell>
                  <TableCell>{ticket.dueDate?.toISOString()}</TableCell>
                  <TableCell>{ticket.requester}</TableCell>
                  <TableCell>{ticket.createdDate?.toISOString()}</TableCell>
                  <TableCell>
                    {ticket.status === "saving" && <CircularProgress />}
                    {ticket.status === "failed" && (
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<ErrorIcon />}
                        onClick={() => handleSave(ticket)}
                      >
                        Resave
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {Object.values(tickets).map((ticket, index) => (
                <TableRow key={index}>
                  <TableCell>{ticket.title}</TableCell>
                  <TableCell>{ticket.description}</TableCell>
                  <TableCell>{ticket.dueDate?.toISOString()}</TableCell>
                  <TableCell>{ticket.requester}</TableCell>
                  <TableCell>{ticket.createdDate?.toISOString()}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<EditIcon />}
                      onClick={() => handleOpen(ticket)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={open} onClose={handleClose}>
        {open && (
          <TicketForm
            ticket={currentTicket}
            onClose={handleClose}
            onSave={handleSave}
            saving={false}
          />
        )}
      </Dialog>
    </div>
  )
}

export default App
