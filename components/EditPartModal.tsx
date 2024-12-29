import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { trimText } from '@/lib/text'
import type { Part } from '@/lib/types'
import { useState } from 'react'

interface EditPartModalProps {
  part: Part
  isOpen: boolean
  onClose: () => void
  onSave: (updatedPart: Part) => void
}

export function EditPartModal({
  part,
  isOpen,
  onClose,
  onSave,
}: EditPartModalProps) {
  const [editedPart, setEditedPart] = useState(part)

  const handleNameChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedPart({ ...editedPart, name: e.target.value })
  }

  const handleSave = () => {
    onSave({ ...editedPart, name: trimText(editedPart.name) })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Part</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Edit the name of the selected part. You can use multiple lines if
          needed.
        </DialogDescription>
        <div className="py-4">
          <Textarea
            value={editedPart.name}
            onChange={handleNameChange}
            placeholder="Enter part name"
            rows={3}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
