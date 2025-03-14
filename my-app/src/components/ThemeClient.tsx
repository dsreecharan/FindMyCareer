"use client";

import { ThemeProvider } from "next-themes";
import { FC, ReactNode } from "react";

interface ThemeClientProps {
  children: ReactNode;
}

const ThemeClient: FC<ThemeClientProps> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
};

export default ThemeClient; 