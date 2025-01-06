import { create } from 'zustand';

interface AlertState {
  isOpen: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  openAlert: (
    title: string,
    description: string,
    onConfirm?: () => void,
  ) => void;
  closeAlert: () => void;
}

const useAlertStore = create<AlertState>((set) => ({
  isOpen: false,
  title: '',
  description: '',
  onConfirm: () => {},
  openAlert: (title, description, onConfirm) =>
    set({ isOpen: true, title, description, onConfirm }),
  closeAlert: () => set({ isOpen: false }),
}));

export { useAlertStore };
