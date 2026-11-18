import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-transparent font-heading font-semibold whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out-soft select-none active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 motion-reduce:active:scale-100 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 text-white shadow-[0_8px_24px_-10px_rgb(19_128_204/0.7)] hover:bg-blue-700",
        /** Outline for navy backgrounds. */
        "outline-dark":
          "border-white/25 text-white hover:border-white/50 hover:bg-white/8",
        /** Outline for white/paper backgrounds. */
        outline:
          "border-input bg-white text-ink hover:border-blue-600 hover:text-blue-600",
        ghost: "text-ink hover:bg-accent",
        whatsapp: "bg-[#0E7A40] text-white hover:bg-[#0B6535]",
        link: "rounded-none px-0 text-blue-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 text-sm",
        sm: "h-9 px-4 text-sm",
        lg: "h-12 px-6 text-[0.95rem]",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
