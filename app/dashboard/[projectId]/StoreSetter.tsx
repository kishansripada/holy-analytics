"use client";

import { useEffect } from "react";
import { useStore } from "./store";

export default function StoreSettter({ polls }: {}) {
   console.log("hi from setter");
   const { setMessages } = useStore();

   useEffect(() => {
      setMessages(polls);
   }, []);

   //    console.log({ polls });
   return <></>;
}
