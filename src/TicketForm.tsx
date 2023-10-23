import {
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material"
import React, { useState } from "react"
import { Ticket } from "./Ticket"

export type TicketFormProps = {
  ticket: Ticket
  onClose: () => void
}
const TicketForm = ({ ticket, onClose }: TicketFormProps) => {
  const [currentTicket, setCurrentTicket] = useState(ticket)
  const handleSave = () => {}
  return (
    <div>
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
          onChange={() =>
            setCurrentTicket({ ...currentTicket, dueDate: new Date() })
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
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </div>
  )
}

export default TicketForm
