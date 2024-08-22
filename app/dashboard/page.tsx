"use client";

import DataCard from "@/components/data-card";
import { Fragment } from "react";
import DashboardLoader from "@/components/loader/dashboard-loader";
import { ChevronDown, Clock4, EllipsisVertical, PanelRightOpen, Plus, RefreshCw } from "lucide-react";
import { useOpenWidget } from "@/features/widgets/hooks/use-open-widget";
import { useGetSummery } from "@/features/summery/api/use-get-summery";
import { Button } from "@/components/ui/button";
import { useNewWidget } from "@/features/widgets/hooks/use-new-widget";
import { Separator } from "@/components/ui/separator";

const DashboardPage = () => {

  const { data, isLoading } = useGetSummery()

  const { onOpen } = useOpenWidget()
  const { onOpen: onOpenNewWidget } = useNewWidget();

  if (isLoading) {
    return <DashboardLoader />;
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full flex flex-col bg-[#f0f5fa] justify-center px-5 py-10">
      <div className="flex items-center justify-between">
        <p className="font-bold text-lg">CNAPP Dashboard</p>
        <div className="flex items-center gap-x-2">
          <Button variant="outline" className="text-muted-foreground" onClick={() => onOpenNewWidget()} size="sm">
            Add Widget <Plus size={18} className="ml-2" /> 
          </Button>
          <Button variant="outline" className="text-muted-foreground" size="sm">
            <RefreshCw size={14} /> 
          </Button>
          <Button variant="outline" className="text-muted-foreground" size="sm">
            <EllipsisVertical size={14} /> 
          </Button>
          <Button variant="outline" className="flex w-full p-1 gap-x-1 border border-[#14147d]" size="sm">
            <Clock4 fill="#14147d" color="white" size={18} />
            <Separator orientation="vertical" className="mr-[1px]" />
            <p className="text-[#14147d]">Last 2 Days</p>
            <ChevronDown color="#14147d" size={14} />
          </Button>
        </div>
      </div>
      {data && data.map((category) => (
        <div key={category.id} className="mt-5">
          {/* header */}
          
            <span onClick={() => onOpen(category.id)} className="flex items-center hover:underline hover:text-blue-500 cursor-pointer">
              <p className="font-semibold mx-2 ">{category.name}</p>
              <PanelRightOpen size={18} className=""/>
            </span>
          <div
            className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3"
            key={category.id}
          >
            {category.widgets && category.widgets.map((widget, index) => (
              <Fragment key={widget.id}>
                {widget.selected && <DataCard
                  type="pie_chart"
                  variant="default"
                  widget={widget}
                  categoryId={category.id}
                />}
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
