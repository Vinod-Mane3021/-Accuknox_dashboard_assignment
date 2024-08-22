"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const DataCardLoading = () => {
    return (
      <Card className="border-none drop-shadow-sm h-60 w-full mx-2">
        <CardHeader className="flex flex-row items-center justify-between gap-x-4">
          <Skeleton className="h-6 w-36" />
        </CardHeader>
      </Card>
    );
  };
  