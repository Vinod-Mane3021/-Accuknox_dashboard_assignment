import Header from "@/components/header";
import React from "react";
import { ChildrenProps } from "@/types";

const DashboardLayout = ({ children }: ChildrenProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default DashboardLayout;
