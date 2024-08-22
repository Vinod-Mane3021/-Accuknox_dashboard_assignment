import React from "react";
import { Skeleton } from "../ui/skeleton";
import { DataCardLoading } from "./data-card-loading";

const DashboardLoader = () => {
  return (
    <>
      <div className="max-w-screen-2xl mx-auto w-full flex flex-col bg-[#f0f5fa] justify-center px-5 py-10">
        <div className="flex w-full items-center justify-between">
          <Skeleton className="h-8 w-24" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-8 w-10" />
            <Skeleton className="h-8 w-10" />
            <Skeleton className="h-8 w-28" />
          </div>
        </div>
        <div className="w-full mt-5">
          <Skeleton className="h-6 w-24 mx-2 mb-4" />
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            <DataCardLoading />
            <DataCardLoading />
            <DataCardLoading />
          </div>
        </div>
        <div className="w-full mt-5">
          <Skeleton className="h-6 w-24 mx-2 mb-4" />
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            <DataCardLoading />
            <DataCardLoading />
            <DataCardLoading />
          </div>
        </div>
        <div className="w-full mt-5">
          <Skeleton className="h-6 w-24 mx-2 mb-4" />
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            <DataCardLoading />
            <DataCardLoading />
            <DataCardLoading />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLoader;
