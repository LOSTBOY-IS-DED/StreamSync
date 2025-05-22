import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva("border h-12 rounded-full px-6 font-medium inline-flex items-center justify-center", {
  variants: {
    variant: {
      default:
        "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent hover:from-purple-600 hover:to-pink-600",
      primary:
        "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent hover:from-purple-600 hover:to-pink-600",
      secondary: "border-white text-white bg-transparent hover:bg-white/10",
      outline: "border border-white/20 bg-transparent text-white hover:bg-white/10",
      ghost: "border-transparent bg-transparent text-white hover:bg-white/10",
      link: "border-transparent bg-transparent text-white underline-offset-4 hover:underline",
    },
    size: {
      default: "h-12 px-6",
      sm: "h-10 px-4 text-sm",
      lg: "h-14 px-8 text-lg",
      icon: "h-10 w-10 p-0",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
