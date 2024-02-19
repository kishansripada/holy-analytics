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

   const saved = pollDataSaved && conditionsSaved && testIdsSaved;

   return (
      // <AppWrapper>
      <div className="flex w-full flex-col overflow-hidden px-16 py-7">
         <Tabs defaultValue="what" className="flex h-full w-full flex-col overflow-hidden object-cover">
            <div className="mb-10 ">
               <div className="relative mb-5 flex flex-row items-center justify-center">
                  {!saved ? <p className="absolute right-0 text-sm text-neutral-600">saving...</p> : null}
                  <Link
                     href={`/dashboard/project/${poll.app_id?.app_id}`}
                     className="absolute left-0 flex flex-row items-center text-sm text-neutral-600 hover:underline"
                  >
                     <MoveLeft className="mr-2" /> Back to {poll?.app_id?.name || ""}
                  </Link>
                  <TabsList>
                     <TabsTrigger value="what">Design it</TabsTrigger>
                     <TabsTrigger value="who">Choose who sees it</TabsTrigger>
                     <TabsTrigger value="preview">Preview</TabsTrigger>
                     <TabsTrigger value="responses">Responses</TabsTrigger>
                  </TabsList>
               </div>
               <div className="flex flex-row items-end justify-between">
                  <div>
                     <Link
                        href={`/dashboard/project/${poll.app_id?.app_id}`}
                        className="font-semibold tracking-wider text-neutral-600 hover:underline"
                     >
                        {poll?.app_id?.name || ""}
                     </Link>
                     <p className="text-4xl font-medium tracking-tight">{poll.title}</p>
                  </div>

                  <div className="flex flex-row items-end gap-5">
                     {/* <div className="flex flex-col items-end">
                     <p className="text-3xl font-medium text-neutral-900">34</p>
                     <p className="text-sm text-neutral-600 ">responses</p>
                  </div> */}
                     {poll.active ? (
                        <Button
                           onClick={async () => {
                              const { data, error } = await supabase.from("polls").update({ active: false }).eq("id", poll.id);
                              if (!error) {
                                 setPoll({ ...poll, active: false });
                              }
                           }}
                           variant={"destructive"}
                        >
                           Stop collecting responses
                        </Button>
                     ) : (
                        <Button
                           onClick={async () => {
                              const { data, error } = await supabase.from("polls").update({ active: true }).eq("id", poll.id);
                              if (!error) {
                                 setPoll({ ...poll, active: true });
                              }
                           }}
                        >
                           Go live
                        </Button>
                     )}
                  </div>
               </div>
            </div>
            <TabsContent className=" h-full overflow-hidden" value="what">
               <What setPoll={setPoll} poll={poll}></What>
            </TabsContent>
            <TabsContent value="who">
               <Who poll={poll} setPoll={setPoll} sampleData={sampleData}></Who>
            </TabsContent>
            <TabsContent value="preview">
               <Preview poll={poll} setPoll={setPoll} sampleData={sampleData}></Preview>
            </TabsContent>
            <TabsContent value="responses">
               <Responses responses={responses} poll={poll} setPoll={setPoll} sampleData={sampleData}></Responses>
            </TabsContent>
         </Tabs>
      </div>
      // </AppWrapper>
   );
}
