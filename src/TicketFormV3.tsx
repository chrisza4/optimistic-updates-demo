import {
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import DayJs from "dayjs"
import { Ticket, validateTicket } from "./Ticket"
import { useState } from "react"

export type TicketFormProps = {
  ticket: Ticket
  saving: boolean
  onClose: () => void
  onSave: (ticket: Ticket) => void
}
type TicketValidationError = { [k: string]: string }

const TicketForm = ({ ticket, saving, onClose, onSave }: TicketFormProps) => {
  const [currentTicket, setCurrentTicket] = useState(ticket)
  const [errors, setErrors] = useState<TicketValidationError>({})

  const handleSave = async () => {
    const validationErrors = validateTicket(currentTicket)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    onSave(currentTicket)
  }

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
          error={!!errors["title"]}
          helperText={errors["title"]}
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
          error={!!errors["description"]}
          helperText={errors["description"]}
        />
        <DatePicker
          slotProps={{
            textField: {
              fullWidth: true,
              margin: "normal",
            },
          }}
          label="Due date"
          value={DayJs(currentTicket.dueDate)}
          onChange={(newValue) => {
            setCurrentTicket({
              ...currentTicket,
              dueDate: newValue?.toDate(),
            })
          }}
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

        <DatePicker
          slotProps={{
            textField: {
              fullWidth: true,
              margin: "normal",
            },
          }}
          label="Created Date"
          value={DayJs(currentTicket.createdDate)}
          onChange={(newValue) => {
            setCurrentTicket({
              ...currentTicket,
              createdDate: newValue?.toDate(),
            })
          }}
        />
        <TextField
          label="Random Field 1"
          fullWidth
          margin="normal"
          value={currentTicket.randomField1}
          onChange={(e) =>
            setCurrentTicket({
              ...currentTicket,
              randomField1: e.target.value,
            })
          }
        />
        <TextField
          label="Random Field 2"
          fullWidth
          margin="normal"
          value={currentTicket.randomField2}
          onChange={(e) =>
            setCurrentTicket({
              ...currentTicket,
              randomField2: e.target.value,
            })
          }
          error={!!errors["randomField2"]}
          helperText={errors["randomField2"]}
        />
        <TextField
          label="Random Field 3"
          fullWidth
          margin="normal"
          value={currentTicket.randomField3}
          onChange={(e) =>
            setCurrentTicket({
              ...currentTicket,
              randomField3: e.target.value,
            })
          }
        />
        <TextField
          label="Random Field 4"
          fullWidth
          margin="normal"
          value={currentTicket.randomField4}
          onChange={(e) =>
            setCurrentTicket({
              ...currentTicket,
              randomField4: e.target.value,
            })
          }
        />
        <TextField
          label="Random Field 5"
          fullWidth
          margin="normal"
          value={currentTicket.randomField5}
          onChange={(e) =>
            setCurrentTicket({
              ...currentTicket,
              randomField5: e.target.value,
            })
          }
        />
        <TextField
          label="Random Field 6"
          fullWidth
          margin="normal"
          value={currentTicket.randomField6}
          onChange={(e) =>
            setCurrentTicket({
              ...currentTicket,
              randomField5: e.target.value,
            })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </div>
  )
}

export default TicketForm
