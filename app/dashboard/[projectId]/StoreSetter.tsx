"use client";

import { useEffect } from "react";
import { useStore } from "./store";

export default function StoreSettter({ polls, project, audiences, events, deployments }: {}) {
   const { setMessages, setProject, setAudiences, setEvents, setDeployments } = useStore();

   useEffect(() => {
      setMessages(polls);
      setAudiences(audiences);
      setEvents(events);
      setDeployments(deployments);

      setProject(project);
   }, []);

   //    console.log({ polls });
   return <></>;
}
