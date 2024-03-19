"use client";

import { useEffect } from "react";
import { useStore } from "./store";

export default function StoreSettter({ polls }: {}) {
   const { setMessages, project, setProject } = useStore();

   useEffect(() => {
      setMessages(polls);
      setProject(project);
   }, []);

   //    console.log({ polls });
   return <></>;
}
