import { Container as SharedContainer } from "@repo/shared";
import { HTMLAttributes, ReactNode } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

const Container = ({ children, className, ...rest }: ContainerProps) => {
  return (
    <SharedContainer as="div" maxWidthClass="max-w-[1380px]" className={className} {...rest}>
      {children}
    </SharedContainer>
  );
};

export default Container;
