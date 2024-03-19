import { create } from "zustand";

interface Store {
   messages: any[];
   setMessages: (messages: any[]) => void;
}

export const useStore = create<Store>((set) => ({
   message: [],
   setMessages: (messages) => set({ messages }),
}));
