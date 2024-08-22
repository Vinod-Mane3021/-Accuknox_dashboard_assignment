"use client";
import {  LabelValueType,} from "@/types";
import {
  useDashboardStore,
} from "@/features/summery/hooks/use-dashboard-store";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Select from "@/components/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useNewWidget } from "../hooks/use-new-widget";
import { showToast } from "@/lib/toast";
import { toast } from "sonner";

const FormSchema = z.object({
    categoryId: z.string().min(1, { message: "Category is required" }),
    widgetName: z.string().min(1, { message: "Name is required" }),
    widgetText: z.string().min(1, { message: "Text is required" }),
});

type WidgetFormType = {
  categoryId?: string;
  categoryOptions: LabelValueType[];
};

const WidgetForm = ({ categoryId, categoryOptions }: WidgetFormType) => {

  const { addWidget } = useDashboardStore();
  const { onClose } = useNewWidget();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      categoryId: categoryId || "" ,
      widgetName: "",
      widgetText: ""
    },
  });

  const handleSubmit = (data: z.infer<typeof FormSchema>) => {

    const uuid = self.crypto.randomUUID()

    addWidget(data.categoryId, {
      id: uuid,
      name: data.widgetName,
      text: data.widgetText,
      selected: false,
    })
    showToast.success("widget created")
    onClose();

  }

  const handleDelete = () => {}


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        style={{paddingTop: 5, marginTop: 5, marginBottom: 5}}
        className="space-y-4 flex flex-col gap-y-5"
      >
        <FormField
          name="categoryId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  placeholder="Select an category"
                  options={categoryOptions}
                  // onCreate={onCreateAccount}
                  value={field.value}
                  onChange={field.onChange}
                  // disabled={disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="widgetName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Add a name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="widgetText"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  placeholder="Add note"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button style={{marginTop: 20}} type="submit" className="w-full" disabled={false}>
          Create Widget
        </Button>
      </form>
    </Form>
  );
};

export default WidgetForm;

