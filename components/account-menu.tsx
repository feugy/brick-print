import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { auth, signIn, signOut } from '@/lib/auth'
import { LogIn, LogOut } from 'lucide-react'

export default async function AccountMenu() {
  const session = await auth()
  if (!session?.user) {
    return (
      <form
        className="leading-none text-xs"
        action={async () => {
          'use server'
          await signIn('google')
        }}
      >
        <Button className="rounded-full" size="icon" type="submit">
          <LogIn className="h-4 w-4" />
        </Button>
      </form>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="text-base">
          <AvatarImage
            src={session.user.image ?? undefined}
            alt={session.user.name ?? undefined}
          />
          <AvatarFallback>
            {session.user.name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <form
          action={async () => {
            'use server'
            await signOut()
          }}
        >
          <button className="w-full" type="submit">
            <DropdownMenuItem className="cursor-pointer">
              <LogOut className="h-4 w-4" /> Sign out
            </DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
