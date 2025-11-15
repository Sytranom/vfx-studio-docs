import { create } from 'zustand';

interface NavigationState {
  openSections: Record<string, boolean>;
  toggleSection: (title: string) => void;
  setSectionOpen: (title: string, isOpen: boolean) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  openSections: {},
  toggleSection: (title) => set((state) => ({
    openSections: {
      ...state.openSections,
      [title]: !state.openSections[title],
    },
  })),
  setSectionOpen: (title, isOpen) => set((state) => {
    if (state.openSections[title] === isOpen) return state; // Avoid unnecessary updates
    return {
      openSections: {
        ...state.openSections,
        [title]: isOpen,
      },
    };
  }),
}));