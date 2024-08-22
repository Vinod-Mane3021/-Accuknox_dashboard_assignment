"use client";

import DataCard from "@/components/data-card";
import { Fragment, useMemo } from "react";
import DashboardLoader from "@/components/loader/dashboard-loader";
import {
  ChevronDown,
  Clock4,
  EllipsisVertical,
  PanelRightOpen,
  Plus,
  RefreshCw,
} from "lucide-react";
import { useOpenWidget } from "@/features/widgets/hooks/use-open-widget";
import { useGetSummery } from "@/features/summery/api/use-get-summery";
import { Button } from "@/components/ui/button";
import { useNewWidget } from "@/features/widgets/hooks/use-new-widget";
import { Separator } from "@/components/ui/separator";
import { useDashboardStore } from "@/features/summery/hooks/use-dashboard-store";

const DashboardPage = () => {
  const { data, isLoading } = useGetSummery();

  const { searchQuery } = useDashboardStore();

  const { onOpen } = useOpenWidget();
  const { onOpen: onOpenNewWidget } = useNewWidget();

  const filteredCategories = useMemo(() => {
    if (!data) return [];

    if (!searchQuery) return data;

    const filterCategories = data.filter((category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filterCategories.length > 0) return filterCategories;

    // Filter widgets within the category based on the search query
    const filterWidgets = data
      .map((category) => {
        const matchingWidgets = category.widgets?.filter((widget) =>
          widget.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // Return the category with matching widgets if any exist, otherwise skip it
        return matchingWidgets?.length
          ? { ...category, widgets: matchingWidgets }
          : null;
      })
      .filter((category) => category !== null); // Filter out any null categories
    return filterWidgets;
  }, [data, searchQuery]);

  if (isLoading) {
    return <DashboardLoader />;
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full flex flex-col bg-[#f0f5fa] justify-center px-5 py-10">
      <div className="flex items-center justify-between">
        <p className="font-bold text-lg">CNAPP Dashboard</p>
        <div className="flex items-center gap-x-2">
          <Button
            variant="outline"
            className="text-muted-foreground"
            onClick={() => onOpenNewWidget()}
            size="sm"
          >
            Add Widget <Plus size={18} className="ml-2" />
          </Button>
          <Button variant="outline" className="text-muted-foreground" size="sm">
            <RefreshCw size={14} />
          </Button>
          <Button variant="outline" className="text-muted-foreground" size="sm">
            <EllipsisVertical size={14} />
          </Button>
          <Button
            variant="outline"
            className="flex w-full p-1 gap-x-1 border border-[#14147d]"
            size="sm"
          >
            <Clock4 fill="#14147d" color="white" size={18} />
            <Separator orientation="vertical" className="mr-[1px]" />
            <p className="text-[#14147d]">Last 2 Days</p>
            <ChevronDown color="#14147d" size={14} />
          </Button>
        </div>
      </div>
      {filteredCategories.map((category) => (
        <div key={category.id} className="mt-5">
          {/* header */}

          <span
            onClick={() => onOpen(category.id)}
            className="flex items-center hover:underline hover:text-blue-500 cursor-pointer"
          >
            <p className="font-semibold mx-2 ">{category.name}</p>
            <PanelRightOpen size={18} className="" />
          </span>
          <div
            className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3"
            key={category.id}
          >
            {category.widgets &&
              category.widgets.map((widget, index) => (
                <Fragment key={widget.id}>
                  {widget.selected && (
                    <DataCard
                      type="pie_chart"
                      variant="default"
                      widget={widget}
                      categoryId={category.id}
                    />
                  )}
                  {category.widgets && category.widgets.length - 1 == index && (
                    <DataCard type="add_widget" categoryId={category.id} />
                  )}
                </Fragment>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardPage;
