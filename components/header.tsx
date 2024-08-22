"use client";

import React, { Fragment, useMemo, useState } from "react";
import CustomBreadcrumb from "@/components/custom-breadcrumb";
import { SearchInput } from "@/components/search-input";
import { BellRing, CircleUserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import { useDashboardStore } from "@/features/summery/hooks/use-dashboard-store";

const Header = () => {
  const { searchWidgets, setSearchQuery } = useDashboardStore();

  const pathname = usePathname();

  if (pathname == "/") {
    return null;
  }

  return (
    <div className="flex items-center justify-start sm:justify-between md:justify-between px-5 py-2 w-full">
      <span className="hidden sm:flex w-fit">
        <CustomBreadcrumb />
      </span>
      <div className="flex items-center gap-x-4 justify-between w-full sm:w-fit">
        <SearchInput
          type="search"
          placeholder="Search anything..."
          className="h-8 w-full"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="flex items-center gap-2">
          <BellRing size={22} className="text-gray-400 hover:cursor-pointer" />
          <CircleUserRound
            size={22}
            className="text-gray-400 hover:cursor-pointer"
          />
        </span>
      </div>
    </div>
  );
};

export default Header;
