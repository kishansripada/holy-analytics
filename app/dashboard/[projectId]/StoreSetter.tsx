"use client";

import { useEffect, useRef, useState } from "react";
import { useStore } from "./store";
import { useUploadToSupabase } from "@/utils/supabase/hooks";

function useTrackArrayChanges(array, idProperty) {
   const [changedIds, setChangedIds] = useState([]);
   const prevArrayRef = useRef(null);

   useEffect(() => {
      if (prevArrayRef.current) {
         const newIds = array.map((item) => item[idProperty]);
         const prevIds = prevArrayRef.current.map((item) => item[idProperty]);

         const changed = newIds.filter((id) => !prevIds.includes(id)).concat(prevIds.filter((id) => !newIds.includes(id)));

         // Update only if there are actual changes
         if (changed.length > 0) {
            setChangedIds(changed);
         }
      }

      prevArrayRef.current = array;
   }, [array, idProperty]);

   return changedIds;
}
export default function StoreSettter({ polls, project, audiences, events, deployments }: {}) {
   const [saved, setSaved] = useState(false);

   const {
      setMessages,
      setProject,
      setAudiences,
      setEvents,
      setDeployments,
      events: stateEvents,
      audiences: stateAudiences,
      deployments: stateDeployments,
      messages: stateMessages,
   } = useStore();

   const changedElements = useTrackArrayChanges(stateMessages, "id");

   // const pollDataSaved = useUploadToSupabase("poll_data", poll.poll_data, poll.id, true);
   // const conditionsSaved = useUploadToSupabase("conditions", poll.conditions, poll.id, true);
   // const uniqueIdSaved = useUploadToSupabase("unique_id", poll.unique_id, poll.id, true);
   // const anchorSaved = useUploadToSupabase("anchor", poll.anchor, poll.id, true);
   // const markdownSaved = useUploadToSupabase("markdown", poll.markdown, poll.id, true);

   useEffect(() => {
      console.log(changedElements);
   }, [changedElements]);

   useEffect(() => {
      setMessages(polls);
      setAudiences(audiences);
      setEvents(events);
      setDeployments(deployments);

      setProject(project);
   }, []);

   //    console.log({ polls });
   return (
      <></>
      // <div className="fixed bottom-8 left-1/2 flex h-10 w-1/3 -translate-x-1/2 flex-row items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white text-sm text-neutral-500">
      //    saving...
      // </div>
   );
}
