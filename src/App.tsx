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
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import TicketForm from "./TicketFormV3"
import { generateMockTicket, Ticket } from "./Ticket"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { QueryClient, QueryClientProvider, useMutation } from "react-query"
import { saveTicket } from "./TicketApi"

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

const TicketApp = () => {
  const saveTicketMutation = useMutation(saveTicket)

  const handleSave = useCallback(
    async (ticket: Ticket) => {
      await saveTicketMutation.mutateAsync(ticket)
      handleClose()
    },
    [saveTicketMutation],
  )
  const [tickets] = useState([generateMockTicket(), generateMockTicket()])
  const [open, setOpen] = useState(false)
  const [currentTicket, setCurrentTicket] = useState(initialTicket)

  const handleOpen = (ticket: Ticket) => {
    setCurrentTicket(ticket)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div style={{ margin: 40 }}>
      <h1>Ticket App</h1>
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
            {tickets.map((ticket, index) => (
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

      <Dialog open={open} onClose={handleClose}>
        {open && (
          <TicketForm
            ticket={currentTicket}
            onClose={handleClose}
            onSave={handleSave}
            saving={saveTicketMutation.isLoading}
          />
        )}
        {/* {open && (
            <TicketFormV2
              ticket={currentTicket}
              onClose={handleClose}
              onSave={handleSave}
            />
          )} */}
      </Dialog>
    </div>
  )
}

export default App
