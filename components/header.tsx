import React, { Fragment } from "react";
import CustomBreadcrumb from "@/components/custom-breadcrumb";
import { Input } from "@/components/ui/input";
import { SearchInput } from "@/components/search-input";
import { BellRing } from "lucide-react";

const Header = () => {
  return (
    <div className="flex items-center justify-between px-5 py-2">
      <CustomBreadcrumb />
      <div className="flex items-center gap-x-4">
        <SearchInput
          type="search"
          placeholder="Search anything..."
          className="h-8"
        />
        <BellRing className="text-gray-400 hover:cursor-pointer" />
      </div>
    </div>
  );
};

export default Header;
