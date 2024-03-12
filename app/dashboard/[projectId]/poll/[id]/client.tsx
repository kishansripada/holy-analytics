"use client";

import { HStack, VStack } from "@/components/ui/stacks";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCallback, useState } from "react";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import { UploadInput } from "@/components/upload-input";
import What from "../_components/what";
import { createClient } from "@/utils/supabase/client";
import { poll } from "@/utils/types";
import { useUploadToSupabase } from "@/utils/supabase/hooks";

export default function Client({ poll: initialPoll }: { poll: poll }) {
   const [poll, setPoll] = useState(initialPoll);
   const supabase = createClient();

   const pollDataSaved = useUploadToSupabase("poll_data", poll.poll_data, poll.id, true);
   const conditionsSaved = useUploadToSupabase("conditions", poll.conditions, poll.id, true);
   const uniqueIdSaved = useUploadToSupabase("unique_id", poll.unique_id, poll.id, true);
   const anchorSaved = useUploadToSupabase("anchor", poll.anchor, poll.id, true);

   const saved = pollDataSaved && conditionsSaved && uniqueIdSaved && anchorSaved;

   const onUpdate = useCallback(
      async (title: string) => {
         await supabase.from("polls").update({ title }).eq("id", poll.id);
      },
      [poll.id]
   ); // Dependency: poll.id

   const onChange = async (title: string) => {
      setPoll((poll) => {
         return { ...poll, title, unique_id: title.split(" ").join("_").toLowerCase() };
      });
   };

   return (
      <VStack className="h-full w-full overflow-hidden px-16 py-7">
         {/* <Tabs defaultValue="what" className="flex h-full w-full flex-col overflow-hidden "> */}
         <VStack className="max-h-full gap-10">
            <div className="">
               <HStack className="relative mb-5  items-center justify-center">
                  {!saved ? <p className="absolute right-0 text-sm text-neutral-600">saving...</p> : null}
               </HStack>
               <HStack className="flex flex-row items-end justify-between">
                  <div className="">
                     <HStack className="w-min items-center">
                        <Link
                           href={`/dashboard/${poll.app_id?.app_id}`}
                           className="w-full text-sm font-semibold uppercase tracking-wide text-neutral-500 hover:underline"
                        >
                           {poll.poll_data?.type}
                        </Link>
                     </HStack>
                     <HStack>
                        <UploadInput
                           className=" box-border w-fit text-2xl font-medium tracking-tight"
                           value={poll.title}
                           onUpdate={onUpdate}
                           onChange={onChange}
                           // size={poll.title.size || 0}
                        />
                     </HStack>
                  </div>

                  <HStack className=" items-center gap-3 p-1">
                     <Input
                        className="w-full"
                        value={poll.unique_id}
                        type="title"
                        id="dom"
                        // placeholder="Title"
                     />
                     <Select
                        onValueChange={(value) => {
                           setPoll({
                              ...poll,
                              poll_data: { ...poll.poll_data, type: value },
                           });
                        }}
                        value={poll.poll_data.type}
                     >
                        <SelectTrigger className="w-min">
                           <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="modal">Modal</SelectItem>
                           <SelectItem value="notification">Notification</SelectItem>
                           <SelectItem value="popover">Popover</SelectItem>
                        </SelectContent>
                     </Select>
                  </HStack>
               </HStack>
            </div>
            {/* <TabsContent className=" h-full overflow-hidden" value="what"> */}
            <What setPoll={setPoll} poll={poll}></What>
            {/* </TabsContent> */}
         </VStack>
         {/* </Tabs> */}
      </VStack>
   );
}
