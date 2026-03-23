import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[#0070f3] text-white",
        secondary: "border-[#333] bg-[#222] text-[#888]",
        destructive: "border-transparent bg-[#e00]/10 text-[#e00]",
        outline: "border-[#333] text-[#888] bg-transparent",
        success: "border-transparent bg-[#50e3c2]/10 text-[#50e3c2]",
        warning: "border-transparent bg-[#f5a623]/10 text-[#f5a623]",
        info: "border-transparent bg-[#0070f3]/10 text-[#0070f3]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
