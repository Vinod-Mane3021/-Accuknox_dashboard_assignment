import { type VariantProps, cva } from "class-variance-authority";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChartPeiVariant from "./charts/chart-pei-variant";
import { Plus, X } from "lucide-react";
import { Button } from "./ui/button";
import { useDashboardStore } from "@/features/summery/hooks/use-dashboard-store";
import { useNewWidget } from "@/features/widgets/hooks/use-new-widget";
import { WidgetType } from "@/types";
import { useConfirm, UseConfirmTypes } from "@/hooks/use-confirm";
import { showToast } from "@/lib/toast";

const boxVariant = cva("shrink-0 rounded-md p-3", {
  variants: {
    variant: {
      default: "bg-blue-500/20",
      success: "bg-emerald-500/20",
      danger: "bg-rose-500/20",
      warning: "bg-yellow-500/20",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const iconVariant = cva("size-6", {
  variants: {
    variant: {
      default: "fill-blue-500",
      success: "fill-emerald-500",
      danger: "fill-rose-500",
      warning: "fill-yellow-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const deleteWidgetDialogProps: UseConfirmTypes = {
  title: "Are you absolutely sure?",
  message:
    "This action cannot be undone. This will remove your widget for this category. you can go to category section and add it again.",
  confirmButtonLabel: "Yes, remove widget",
  type: "alert",
};

type BoxVariantsType = VariantProps<typeof boxVariant>;
type IconVariantsType = VariantProps<typeof iconVariant>;

interface DataCardProps extends BoxVariantsType, IconVariantsType {
  widget?: WidgetType;
  categoryId: string;
  type: "pie_chart" | "bar_chart" | "add_widget";
}

const DataCard = ({ widget, type, categoryId }: DataCardProps) => {
  const { onOpen: onOpenWidgetForm } = useNewWidget();
  const { updateWidget } = useDashboardStore();
  const [ConfirmationDialog, confirm] = useConfirm(deleteWidgetDialogProps);

  const handleCreateWidget = () => {
    onOpenWidgetForm(categoryId);
  };

  const handleRemoveWidget = async () => {
    console.log("handleRemoveWidget")
    if (!widget || !widget.id) {
      return;
    }
    const ok = await confirm();
    if (ok) {
      showToast.success("widget removed");
      updateWidget(categoryId, widget.id, {
        selected: false,
      });
    }
  };

  if (type === "add_widget") {
    return (
      <Card className="border-none drop-shadow-sm w-full my-3 mx-2 h-60">
        <div className="h-full w-full flex items-center justify-center">
          <Button
            onClick={handleCreateWidget}
            variant="outline"
            className="text-sm text-muted-foreground"
          >
            <Plus className="size-6 text-muted-foreground" /> Add Widget
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <>
      <ConfirmationDialog />
      <Card className="border-none drop-shadow-sm w-full my-3 mx-2 h-60">
        <CardHeader className="flex flex-row items-center justify-between gap-x-4">
          <div className="space-y-1 flex items-center w-full justify-between">
            <CardTitle className="text-base line-clamp-1">
              {widget?.name}
            </CardTitle>
            <X
              size={18}
              className="hover:cursor-pointer"
              onClick={handleRemoveWidget}
            />
          </div>
        </CardHeader>
        <CardContent className="flex w-full">
          <ChartPeiVariant data={widget?.data || []} />
        </CardContent>
      </Card>
    </>
  );
};

export default DataCard;
