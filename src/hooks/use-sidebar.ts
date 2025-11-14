import { create } from 'zustand';

interface SidebarState {
  isOpen: boolean;
  width: number;
  toggle: () => void;
  close: () => void;
  setWidth: (width: number) => void;
}

const SIDEBAR_MIN_WIDTH = 240;
const SIDEBAR_MAX_WIDTH = 480;

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  width: 280,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
  setWidth: (newWidth: number) => set(() => {
    const clampedWidth = Math.max(SIDEBAR_MIN_WIDTH, Math.min(newWidth, SIDEBAR_MAX_WIDTH));
    return { width: clampedWidth };
  }),
}));