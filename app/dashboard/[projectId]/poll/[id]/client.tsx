"use client";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import What from "../_components/what";
import Who from "../_components/who";

import Preview from "../_components/preview";
import { useUploadToSupabase } from "@/utils/supabase/hooks";
import { poll } from "@/utils/types";
import Link from "next/link";
import Responses from "../_components/responses";
import { ArrowLeft, MoveLeft } from "lucide-react";
import { HStack, VStack } from "@/components/ui/stacks";
import Triggers from "../_components/triggers";
import { UploadInput } from "@/components/upload-input";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Client({
   poll: initialPoll,
   sampleData,
   responses,
   projectId,
}: {
   poll: poll;
   sampleData: any;
   responses: any;
   projectId: string;
}) {
   const [poll, setPoll] = useState(initialPoll);
   const supabase = createClient();

   const pollDataSaved = useUploadToSupabase("poll_data", poll.poll_data, poll.id, true);
   const conditionsSaved = useUploadToSupabase("conditions", poll.conditions, poll.id, true);
   const testIdsSaved = useUploadToSupabase("test_ids", poll.test_ids, poll.id, true);
   const triggerScheduleSaved = useUploadToSupabase("trigger_schedule", poll.trigger_schedule, poll.id, true);

   const saved = pollDataSaved && conditionsSaved && testIdsSaved && triggerScheduleSaved;
   const onUpdate = async (title: string) => {
      await supabase.from("polls").update({ title }).eq("id", poll.id);
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
                           // size={poll.title.size || 0}
                        />
                     </HStack>
                  </div>

                  <HStack className=" items-center gap-3 p-1">
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
                        </SelectContent>
                     </Select>
                     <p className="whitespace-nowrap font-semibold"> ID: {poll.id}</p>
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