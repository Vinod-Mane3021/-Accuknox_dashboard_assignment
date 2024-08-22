import { useOpenWidget } from "@/features/widgets/hooks/use-open-widget";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Loader2 } from "lucide-react";
import Widgets from "./widgets";
import { useDashboardStore } from "@/features/summery/hooks/use-dashboard-store";

const AddWidgetSheet = () => {
  const { isOpen, onClose } = useOpenWidget();
  const { categories: data } = useDashboardStore();

  const categoryOptions = (data ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4 flex flex-col h-full w-full">
        <SheetHeader>
          <SheetTitle>Add Widget</SheetTitle>
          <SheetDescription className="">
            Personalise your dashboard by adding the following widget
          </SheetDescription>
        </SheetHeader>

        {false ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
            <Widgets
              categoryOptions={categoryOptions}
            />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default AddWidgetSheet;
