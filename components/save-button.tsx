import { Button } from '@/components/ui/button'
import { LoaderCircle, HardDriveUpload } from 'lucide-react'
import { useFormStatus } from 'react-dom'

const iconClassName = '!h-[1em] !w-[1em]'

export function SaveButton() {
  const { pending } = useFormStatus()
  return (
    <Button className="text-xl" type="submit" disabled={pending} size="lg">
      {pending ? (
        <LoaderCircle className={`animate-spin ${iconClassName}`} />
      ) : (
        <HardDriveUpload className={iconClassName} />
      )}{' '}
      Save
    </Button>
  )
}
