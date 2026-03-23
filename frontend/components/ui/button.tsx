import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-white text-black hover:bg-gray-200 rounded-md",
        destructive: "bg-[#e00] text-white hover:bg-[#ff3333] rounded-md",
        outline: "border border-[#333] bg-transparent text-[#ededed] hover:bg-[#333] hover:border-[#444] rounded-md",
        secondary: "bg-[#333] text-[#ededed] hover:bg-[#444] rounded-md",
        ghost: "text-[#ededed] hover:bg-[#222] rounded-md",
        link: "text-[#0070f3] underline-offset-4 hover:underline",
        success: "bg-[#50e3c2] text-black hover:bg-[#79ffe1] rounded-md",
        warning: "bg-[#f5a623] text-black hover:bg-[#f7b955] rounded-md",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs rounded-md",
        lg: "h-11 px-6 rounded-md",
        icon: "h-10 w-10 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
