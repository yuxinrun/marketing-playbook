import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-brand-500 text-white shadow-sm hover:bg-brand-600 active:bg-brand-700",
        outline: "border border-cream-300 bg-white text-ink hover:border-brand-300 hover:text-brand-600",
        ghost: "text-ink-soft hover:bg-cream-100 hover:text-ink",
        secondary: "bg-navy text-white hover:bg-navy-light",
        soft: "bg-brand-50 text-brand-700 hover:bg-brand-100",
        link: "text-brand-600 underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-3.5 text-xs",
        default: "h-11 px-5",
        lg: "h-12 px-7 text-[15px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { buttonVariants };
