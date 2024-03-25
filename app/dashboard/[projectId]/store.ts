import { create } from "zustand";

interface Store {
   messages: any[];
   setMessages: (messages: any[]) => void;
}

export const useStore = create<Store>((set) => ({
   messages: [],
   setMessages: (messages) => set({ messages }),

   deployments: [],
   setDeployments: (deployments) => set({ deployments }),

   events: [],
   setEvents: (events) => set({ events }),

   audiences: [],
   setAudiences: (audiences) => set({ audiences }),

   project: {},
   setProject: (project) => set({ project }),
}));
