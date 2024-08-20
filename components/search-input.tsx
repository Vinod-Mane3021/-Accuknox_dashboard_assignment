"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [onFocusInput, setOnFocusInput] = React.useState(false);

    return (
      <div
        className={cn(
          "flex items-center w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
          onFocusInput ? "ring-1 ring-ring" : "outline-none",
          className
        )}
      >
        <Search className="text-gray-400 size-5 mr-2" />
        <input
          type={type}
          className="outline-none"
          ref={ref}
          {...props}
          onFocus={() => setOnFocusInput(true)}
          onBlur={() => setOnFocusInput(false)}
        />
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
