import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import type { Part } from '@/lib/types'
import { trimText } from '@/lib/text'

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
    setEditedPart({ ...editedPart, name: trimText(e.target.value) })
  }

  const handleSave = () => {
    onSave(editedPart)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Part</DialogTitle>
        </DialogHeader>
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
