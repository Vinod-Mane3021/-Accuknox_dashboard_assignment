import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Loader2 } from "lucide-react";
import { useDashboardStore } from "@/features/summery/hooks/use-dashboard-store";
import { useGetSummery } from "@/features/summery/api/use-get-summery";
import { useNewWidget } from "@/features/widgets/hooks/use-new-widget";
import WidgetForm from "./widget-form";

const NewWidgetSheet = () => {
  const { isLoading, data } = useGetSummery();
  const { isOpen, onClose, categoryId } = useNewWidget();

  const categoryOptions = (data ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4 flex flex-col h-full w-full">
        <SheetHeader>
          <SheetTitle>New Widget</SheetTitle>
          <SheetDescription className="">
            Personalise your dashboard by creating widgets
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
            <WidgetForm
              categoryId={categoryId}
              categoryOptions={categoryOptions}
            />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default NewWidgetSheet;
