import { Heart } from 'lucide-react'
import type { ReactNode } from 'react'

export function Footer() {
  return (
    <footer className="border-t p-4 mt-12 text-center text-muted-foreground bg-muted ">
      <p>
        hosted on <A href="https://vercel.com">vercel</A>, made with{' '}
        <Heart className="inline-block h-4 w-4" /> by{' '}
        <A href="https://github.com/feugy">feugy</A>
      </p>
    </footer>
  )
}

function A({
  href,
  className,
  children,
}: { href: string; className?: string; children?: ReactNode }) {
  return (
    <a
      className={`font-medium text-primary underline-offset-2 hover:underline ${className ?? ''}`}
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      {children}
    </a>
  )
}
