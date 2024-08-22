import { create } from "zustand";

type OpenWidgetState = {
  categoryId: string;
  isOpen: boolean;
  onOpen: (categoryId: string) => void;
  onClose: () => void;
};

export const useOpenWidget = create<OpenWidgetState>((set) => ({
  categoryId: "",
  isOpen: false,
  onClose: () => set({ isOpen: false, categoryId: "" }),
  onOpen: (categoryId) => set({ isOpen: true, categoryId }),
}));
