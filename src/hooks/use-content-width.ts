import { create } from 'zustand';

type WidthState = 'normal' | 'wide' | 'fluid';

interface ContentWidthState {
  width: WidthState;
  toggle: () => void;
}

export const useContentWidthStore = create<ContentWidthState>((set) => ({
  width: 'normal',
  toggle: () => set((state) => {
    if (state.width === 'normal') return { width: 'wide' };
    if (state.width === 'wide') return { width: 'fluid' };
    return { width: 'normal' };
  }),
}));