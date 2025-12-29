import { XIcon } from "lucide-react"

import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const variantStyles = {
  default: "border-border bg-background text-foreground",
  success:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-200",
  destructive:
    "border-destructive/50 bg-destructive/10 text-destructive dark:text-destructive-foreground",
}

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed top-4 right-4 z-50 flex w-full max-w-sm flex-col gap-2">
      {toasts.map((toast) => {
        const variant = toast.variant ?? "default"
        return (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto relative flex w-full items-start gap-3 rounded-lg border p-4 shadow-lg",
              "transition-all",
              toast.open === false
                ? "animate-out fade-out-0 slide-out-to-right-2"
                : "animate-in fade-in-0 slide-in-from-top-2",
              variantStyles[variant]
            )}
          >
            <div className="grid flex-1 gap-1">
              {toast.title ? (
                <p className="text-sm font-semibold leading-none">
                  {toast.title}
                </p>
              ) : null}
              {toast.description ? (
                <p className="text-sm text-muted-foreground">
                  {toast.description}
                </p>
              ) : null}
            </div>
            {toast.action}
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <XIcon className="size-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>
        )
      })}
    </div>
  )
}
