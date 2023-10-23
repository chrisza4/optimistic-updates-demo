import React, { useState } from "react"
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
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import TicketForm from "./TicketForm"
import { generateMockTicket, Ticket } from "./Ticket"

const initialTicket: Ticket = {
  id: "",
  title: "",
  description: "",
  dueDate: new Date(),
  requester: "",
  createdDate: new Date(),
}

const TicketApp = () => {
  const [tickets, setTickets] = useState([
    generateMockTicket(),
    generateMockTicket(),
  ])
  const [open, setOpen] = useState(false)
  const [currentTicket, setCurrentTicket] = useState(initialTicket)

  const handleOpen = (ticket: Ticket) => {
    setCurrentTicket(ticket)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSave = () => {
    // Update or save the ticket logic goes here
    // For simplicity, let's assume it always adds a new ticket
    setTickets([...tickets, currentTicket])
    setCurrentTicket(initialTicket)
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
                <TableCell>{ticket.dueDate.toISOString()}</TableCell>
                <TableCell>{ticket.requester}</TableCell>
                <TableCell>{ticket.createdDate.toISOString()}</TableCell>
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
        {open && <TicketForm ticket={currentTicket} onClose={handleClose} />}
      </Dialog>
    </div>
  )
}

export default TicketApp
