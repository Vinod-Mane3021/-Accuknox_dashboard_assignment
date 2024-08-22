import { ReactNode } from "react";

export interface ChildrenProps {
  children: ReactNode;
}

export type LabelValueType = {
  label: string;
  value: string;
};

export type WidgetType = {
  id: string;
  name: string;
  text: string;
  type?: string;
  selected?: boolean;
  data?: {
    name: string;
    value: number;
  }[];
};

export type CategoryType = {
  id: string;
  name: string;
  widgets?: WidgetType[];
};

export type DashboardDataType = {
  title: string;
  categories: CategoryType[];
};
