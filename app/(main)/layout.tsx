import React from "react";

// 1. Define the Props Interface
interface MainLayoutProps {
  children: React.ReactNode;
}

// 2. Apply the interface to the component props
const MainLayout = ({ children }: MainLayoutProps) => {
  return <div className="container mx-auto my-32">{children}</div>;
};

export default MainLayout;