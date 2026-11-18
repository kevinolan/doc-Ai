import Link, { type LinkProps } from "next/link";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { clsx } from "clsx";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

const buttonStyles = {
  base: "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 disabled:pointer-events-none disabled:opacity-50",
  variants: {
    primary: "bg-primary text-white shadow-[0_8px_18px_rgba(50,104,233,0.2)] hover:bg-primary-strong",
    secondary: "bg-accent text-accent-foreground hover:bg-accent-strong",
    ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
    outline: "border border-border bg-card text-foreground hover:border-primary/40 hover:bg-accent/40",
  },
  sizes: {
    sm: "px-3 py-2 text-xs",
    md: "px-4 py-2.5 text-xs",
    lg: "px-5 py-3 text-sm",
  },
};

export function buttonClassName({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return clsx(buttonStyles.base, buttonStyles.variants[variant], buttonStyles.sizes[size], className);
}

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}>(({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => (
  <button ref={ref} type={type} className={buttonClassName({ variant, size, className })} {...props} />
));

Button.displayName = "Button";

export function ButtonLink({
  href,
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: LinkProps & {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <Link href={href} className={buttonClassName({ variant, size, className })} {...props}>
      {children}
    </Link>
  );
}
