"use client";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { poll } from "@/utils/types";
import { useEffect, useState } from "react";

export default function Responses({
   poll,
   sampleData,
   setPoll,
   responses: initialResponses,
}: {
   poll: poll;
   setPoll: Function;
   sampleData: any;
   responses: any;
}) {
   const [responses, setResponses] = useState(initialResponses);
   const supabase = createClient();

   const handleInserts = (payload) => {
      console.log("Change received!", payload);
   };

   // Listen to inserts
   useEffect(() => {
      const responses = supabase
         .channel("custom-insert-channel")
         .on("postgres_changes", { event: "INSERT", schema: "public", table: "responses" }, (payload) => {
            console.log("Change received!", payload);
            setResponses((responses) => [...responses, payload.new]);
         })
         .subscribe();

      //   console.log(responses);
   }, []);
   return (
      <div className="flex flex-row w-full justify-between h-full  gap-20 ">
         <div className="flex flex-col w-full">
            <div className="w-full justify-between font-semibold flex flex-row ">
               <p>user_id</p>
               <p>response_data</p>
            </div>
            <div className="flex flex-col gap-5 items-start w-full">
               {responses.map((response) => {
                  return (
                     <div key={response.id} className="flex flex-row gap-1 justify-between border-y  w-full py-3">
                        <p className="text-sm text-neutral-600">{response.user_id}</p>
                        <p className="text-sm text-neutral-600">{JSON.stringify(response.response_data)}</p>
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
}
