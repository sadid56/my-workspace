declare module "react-scroll" {
  import React from "react";

  // Extend the props if needed
  export interface LinkProps {
    to: string;
    spy?: boolean;
    smooth?: boolean;
    offset?: number;
    duration?: number;
    activeClass?: string;
    className?: string;
    onClick?: () => void;
  }

  // Declare the Link component as a React functional component
  export const Link: React.FC<LinkProps>;
}
