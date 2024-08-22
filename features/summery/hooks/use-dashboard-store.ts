import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DashboardData } from "../api/data";
import { CategoryType, WidgetType } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/lib/toast";

type AllWidgets = {
  widgetId: string;
  widgetName: string;
  categoryId: string;
  categoryName: string;
  selected: boolean;
};

type UpdateWidget = {
  name?: string;
  text?: string;
  type?: string;
  selected?: boolean;
  data?: {
    name: string;
    value: number;
  }[];
};

export type UpdatedWidget = {
  widgetId: string;
  updatedWidget: Partial<UpdateWidget>;
};

export type WidgetUpdateWithCategory = {
  categoryId: string;
  updates: UpdatedWidget[];
};

interface GetAllCategoriesType {
  Loading: boolean;
  data: CategoryType[];
};

interface DashboardState {
  categories: CategoryType[];
  getAllCategories: () => GetAllCategoriesType;
  addWidget: (categoryId: string, widget: WidgetType) => void;
  deleteWidget: (categoryId: string, widgetId: string) => void;
  updateWidget: (
    categoryId: string,
    widgetId: string,
    updatedWidget: Partial<WidgetType>
  ) => void;
  updateWidgets: (update: WidgetUpdateWithCategory[]) => void;
  addCategory: (category: CategoryType) => void;
  removeCategory: (categoryId: string) => void;
  searchWidgets: (query: string) => WidgetType[];
  getAllWidgets: () => AllWidgets[];
}

export const useDashboardStore = create<DashboardState>((set, get) => {
  return {
    categories: DashboardData.categories,

    getAllCategories: (): GetAllCategoriesType => {
      return {
        Loading: false,
        data: DashboardData.categories,
      };
    },

    addWidget: (categoryId, widget) => {
      set((state) => {
        const categories = state.categories.map((category) => {
          if (!category.widgets) {
            return category;
          }
          return category.id === categoryId
            ? { ...category, widgets: [...category.widgets, widget] }
            : category;
        });
        return { categories };
      });
    },

    deleteWidget: (categoryId, widgetId) => {
      set((state) => {
        const categories = state.categories.map((category) =>
          category.id === categoryId
            ? {
                ...category,
                widgets: category.widgets?.filter(
                  (widget) => widget.id !== widgetId
                ),
              }
            : category
        );
        return { categories };
      });
    },

    updateWidget: (categoryId, widgetId, updatedWidget) => {
      set((state) => {
        const categories = state.categories.map((category) =>
          category.id === categoryId
            ? {
                ...category,
                widgets: category.widgets?.map((widget) =>
                  widget.id === widgetId
                    ? { ...widget, ...updatedWidget }
                    : widget
                ),
              }
            : category
        );
        return { categories };
      });
    },

    updateWidgets: (categoryUpdates) => {
      set((state) => {
        const categories = state.categories.map((category) => {
          const categoryUpdate = categoryUpdates.find(
            (c) => c.categoryId === category.id
          );
          if (categoryUpdate) {
            return {
              ...category,
              widgets: category.widgets?.map((widget) => {
                const widgetUpdate = categoryUpdate.updates.find(
                  (wu) => wu.widgetId === widget.id
                );
                return widgetUpdate
                  ? { ...widget, ...widgetUpdate.updatedWidget }
                  : widget;
              }),
            };
          }
          return category;
        });
        return { categories };
      });
    },

    addCategory: (category) => {
      set((state) => ({
        categories: [...state.categories, category],
      }));
    },

    removeCategory: (categoryId) => {
      set((state) => ({
        categories: state.categories.filter(
          (category) => category.id !== categoryId
        ),
      }));
    },

    searchWidgets: (query: string): WidgetType[] => {
      const allWidgets = get()
        .categories.flatMap((category) => category.widgets)
        .filter((widget) => widget !== undefined);

      const filtered = allWidgets.filter((widget) => {
        return (
          widget && widget.name.toLowerCase().includes(query.toLowerCase())
        );
      });
      return filtered;
    },

    getAllWidgets: () => {
      const allWidgets: AllWidgets[] = get().categories.flatMap((category) => {
        const filtered: AllWidgets[] | undefined = category.widgets?.map(
          (widget) => {
            return {
              widgetId: widget.id,
              widgetName: widget.name,
              categoryId: category.id,
              categoryName: category.name,
              selected: widget.selected ? true : false,
            };
          }
        );
        return filtered || [];
      });
      return allWidgets;
    },
  };
});
