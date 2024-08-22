import { useState, useEffect } from "react";
import { useDashboardStore } from "../hooks/use-dashboard-store";
import { CategoryType } from "@/types";

export const useGetSummery = () => {
  const { categories } = useDashboardStore();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<CategoryType[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(categories);
      setIsLoading(false);
    }, 500);

    // Cleanup function to clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [categories]);

  return {
    isLoading,
    data,
  };
};
