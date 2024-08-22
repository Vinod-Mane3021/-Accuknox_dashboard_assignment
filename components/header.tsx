"use client"

import React, { Fragment, useMemo, useState } from "react";
import CustomBreadcrumb from "@/components/custom-breadcrumb";
import { SearchInput } from "@/components/search-input";
import { BellRing } from "lucide-react";
import { usePathname } from "next/navigation";
import { useDashboardStore } from "@/features/summery/hooks/use-dashboard-store";

const Header = () => {
  const { searchWidgets, setSearchQuery } = useDashboardStore()

  const pathname = usePathname();



  if (pathname == "/") {
    return null;
  }

  return (
    <div className="flex items-center justify-between px-5 py-2">
      <CustomBreadcrumb />
      <div className="flex items-center gap-x-4">
        <SearchInput
          type="search"
          placeholder="Search anything..."
          className="h-8"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <BellRing className="text-gray-400 hover:cursor-pointer" />
      </div>
    </div>
  );
};

export default Header;
