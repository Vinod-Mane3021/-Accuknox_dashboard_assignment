import { create } from "zustand";

type NewWidgetState = {
  categoryId: string;
  isOpen: boolean;
  onOpen: (categoryId?: string) => void;
  onClose: () => void;
};

export const useNewWidget = create<NewWidgetState>((set) => ({
  categoryId: "",
  isOpen: false,
  onClose: () => set({ isOpen: false, categoryId: "" }),
  onOpen: (categoryId) => set({ isOpen: true, categoryId }),
}));
