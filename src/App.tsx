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

type Ticket = {
  title: string
  description: string
  dueDate: string
  requester: string
  createdDate: Date
}

const initialTicket: Ticket = {
  title: "",
  description: "",
  dueDate: "",
  requester: "",
  createdDate: new Date(),
}

const TicketApp = () => {
  const [tickets, setTickets] = useState([initialTicket])
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
    <div>
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
                <TableCell>{ticket.dueDate}</TableCell>
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
        <DialogTitle>Edit Ticket</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={currentTicket.title}
            onChange={(e) =>
              setCurrentTicket({ ...currentTicket, title: e.target.value })
            }
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={currentTicket.description}
            onChange={(e) =>
              setCurrentTicket({
                ...currentTicket,
                description: e.target.value,
              })
            }
          />
          <TextField
            label="Due Date"
            fullWidth
            margin="normal"
            value={currentTicket.dueDate}
            onChange={(e) =>
              setCurrentTicket({ ...currentTicket, dueDate: e.target.value })
            }
          />
          <TextField
            label="Requester"
            fullWidth
            margin="normal"
            value={currentTicket.requester}
            onChange={(e) =>
              setCurrentTicket({ ...currentTicket, requester: e.target.value })
            }
          />
          <TextField
            label="Created Date"
            fullWidth
            margin="normal"
            value={currentTicket.createdDate}
            onChange={(e) =>
              setCurrentTicket({
                ...currentTicket,
                createdDate: new Date(e.target.value),
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default TicketApp
