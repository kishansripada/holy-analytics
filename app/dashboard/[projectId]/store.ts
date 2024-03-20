import { create } from "zustand";

interface Store {
   messages: any[];
   setMessages: (messages: any[]) => void;
}

export const useStore = create<Store>((set) => ({
   messages: [],
   setMessages: (messages) => set({ messages }),

   project: {},
   setProject: (project) => set({ project }),
}));