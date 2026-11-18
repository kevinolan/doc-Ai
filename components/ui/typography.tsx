import type { HTMLAttributes } from "react";
import { clsx } from "clsx";

export function Eyebrow({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={clsx("type-eyebrow", className)} {...props} />;
}

export function PageTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className={clsx("type-page-title", className)} {...props} />;
}

export function PageDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={clsx("type-page-description", className)} {...props} />;
}

export function SectionTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={clsx("type-section-title", className)} {...props} />;
}
