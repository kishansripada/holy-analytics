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
      <div className="flex flex-col px-16 py-10 w-full overflow-hidden">
         <Tabs defaultValue="what" className="w-full h-full overflow-hidden flex flex-col object-cover">
            <div className="mb-10 ">
               <div className="flex flex-row justify-center items-center relative mb-5">
                  {!saved ? <p className="absolute right-0 text-sm text-neutral-600">saving...</p> : null}
                  <Link href={`/dashboard/project/${poll.app_id?.app_id}`} className="absolute left-0 text-sm text-neutral-600 hover:underline">
                     Back to {poll?.app_id?.name || ""}
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
                        className="tracking-wider font-semibold text-neutral-600 hover:underline"
                     >
                        {poll?.app_id?.name || ""}
                     </Link>
                     <p className="tracking-tight font-medium text-4xl">{poll.title}</p>
                  </div>

                  <div className="flex flex-row gap-5 items-end">
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
