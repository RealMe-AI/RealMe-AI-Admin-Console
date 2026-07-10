import Image from "next/image"
import Link from "next/link"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex flex-col items-center gap-2">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="RealMe AI"
              width={40}
              height={40}
              className="dark:invert"
            />
          </Link>
          <h1 className="text-xl font-semibold tracking-tight">RealMe AI</h1>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  )
}
