import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parse, subDays } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (value: number) => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
};

type Period = {
  from: string | Date | undefined;
  to: string | Date | undefined;
};

export const formatDateRange = (period?: Period) => {
  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  if (!period?.from) {
    const formatFrom = format(defaultFrom, "LLL dd");
    const formatTo = format(defaultTo, "LLL dd, y");
    return `${formatFrom} - ${formatTo}`;
  }

  if (period.to) {
    const formatFrom = format(period.from, "LLL dd");
    const formatTo = format(period.to, "LLL dd, y");
    return `${formatFrom} - ${formatTo}`;
  }

  return format(period.from, "LLL dd, y");
};
