import { Button } from '@/components/ui/button'
import { HardDriveUpload, LoaderCircle } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const iconClassName = '!h-[1em] !w-[1em]'

export function SaveButton({ noSession }: { noSession?: boolean }) {
  const { pending } = useFormStatus()
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            className="text-xl"
            type={noSession ? 'button' : 'submit'}
            disabled={pending}
            size="lg"
          >
            {pending ? (
              <LoaderCircle className={`animate-spin ${iconClassName}`} />
            ) : (
              <HardDriveUpload className={iconClassName} />
            )}{' '}
            Save
          </Button>
        </TooltipTrigger>
        {noSession && (
          <TooltipContent className="bg-accent text-accent-foreground">
            <p> Log in to save</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  )
}
