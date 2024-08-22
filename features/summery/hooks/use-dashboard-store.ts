import { create } from "zustand";
import { DashboardData } from "../api/data";
import { CategoryType, WidgetType } from "@/types";

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
}

interface DashboardState {
  categories: CategoryType[];
  searchQuery: string;
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
  searchWidgets: (query: string, categoryId?: string) => void;
  setSearchQuery:(query: string) => void;
  getAllWidgets: () => AllWidgets[];
}

export const useDashboardStore = create<DashboardState>((set, get) => {
  return {
    categories: DashboardData.categories,
    searchQuery: "",

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

    searchWidgets: (query: string, categoryId?: string) => {
      console.log("query  --> ", query);

      if(!query || query.length == 0) {
        console.log("set otiginal --------> query")
        set({ categories: DashboardData.categories });
        return;
      }

      const currentCategories = get().categories;

      // Filter the categories based on the categoryId, if provided
      const filteredCategories = categoryId
        ? currentCategories.filter((c) => c.id === categoryId)
        : currentCategories;


      const filterCategoriesForFilteredWidgets = filteredCategories
        .map((category) => {
          if (!query) {
            return category; // If there's no query, return the category as is
          }

          // Filter widgets within the category based on the search query
          const matchingWidgets = category.widgets?.filter((widget) =>
            widget.name.toLowerCase().includes(query.toLowerCase())
          )

           // Return the category with matching widgets if any exist, otherwise skip it
            return matchingWidgets?.length
          ? { ...category, widgets: matchingWidgets }
          : null;
        })
        .filter((category) => category !== null); // Filter out any null categories

      console.log({ filterCategoriesForFilteredWidgets });

      // Set the updated categories back into the state
      set({ categories: filterCategoriesForFilteredWidgets });
    },

    setSearchQuery: (query: string) => {
      set({ searchQuery: query })
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
