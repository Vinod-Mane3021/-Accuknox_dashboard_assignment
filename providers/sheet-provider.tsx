"use client";

import AddWidgetSheet from "@/features/widgets/components/add-widget-sheet";
import NewWidgetSheet from "@/features/widgets/components/new-widget-sheet";
import { Loader2 } from "lucide-react";
import React from "react";
import { useMountedState } from "react-use"

const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) {
    return <Loader2 className="size-5 text-gray-600 animate-spin" />;
  }

  return (
    <>
      <AddWidgetSheet />
      <NewWidgetSheet />
    </>
  );
};

export default SheetProvider;
