import React from "react";
import { cn } from "../lib/cn";

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "main" | "header" | "footer";
  maxWidthClass?: string;
}

export const Container = React.forwardRef<HTMLElement, ContainerProps>(
  ({ children, className, as: Component = "div", maxWidthClass = "max-w-[1380px]", ...props }, ref) => {
    return (
      <Component
        ref={ref as any}
        className={cn(maxWidthClass, "px-4 mx-auto", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = "Container";
