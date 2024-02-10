"use client";

import Header from "@/components/Header";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/client";
import { Switch } from "@/components/ui/switch";
import { MCQ } from "../../Widget/Widget";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HDivider } from "@/components/ui/hdivider";
import Link from "next/link";
export default function Client({ polls }: any) {
   const supabase = createClient();

   return (
      <div className="flex flex-row h-screen w-full">
         <div className="h-full border-r  border-neutral-300 min-w-[250px]"></div>
         <div className=" w-full flex flex-col">
            <div className="h-20 w-full px-10 flex flex-col justify-center">
               <p className="tracking-tight font-bold text-3xl">My questions ⁉️</p>
            </div>

            {/* <HDivider></HDivider> */}
            <div className="h-[1px] w-full bg-neutral-300"></div>
            <div className="flex flex-col w-full gap-20 px-10 py-10">
               {polls?.map((poll) => {
                  return (
                     <Link href={`/poll/${poll.id}`} key={poll.id}>
                        <div className="flex flex-row w-full justify-between  gap-20">
                           <div className="flex flex-col pt-5 w-full gap-4">
                              <div className="flex flex-row items-start justify-between">
                                 <p className="tracking-tight font-medium text-2xl">{poll.title}</p>
                                 <div className="flex flex-col items-end">
                                    <p className="text-3xl font-medium text-neutral-900">34</p>
                                    <p className="text-sm text-neutral-600 ">responses</p>
                                 </div>
                              </div>
                           </div>

                           <div className="">
                              <div className="flex flex-col gap-4 justify-center h-full ">
                                 <div className="flex flex-row justify-between items-end">
                                    <p className="text-neutral-600 text-3xl font-semibold"></p>
                                    <div className="flex items-center space-x-2">
                                       <Label>Live</Label>
                                       <Switch
                                          defaultChecked={poll.active}
                                          onCheckedChange={async (checked) => {
                                             const { data } = await supabase.from("polls").update({ active: checked }).eq("id", poll.id);
                                          }}

                                          // checked={localSettings.isInSlideMode}
                                       />
                                    </div>
                                 </div>
                                 <div className=" overflow-hidden select-none  w-[500px] min-h-[100px] rounded-lg border  dark:border-neutral-700 border-neutral-300">
                                    <MCQ poll={poll}></MCQ>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </Link>
                  );
               })}
            </div>
         </div>
      </div>
   );
}

function formatDate(date: Date): string {
   const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

   const suffixes = ["st", "nd", "rd", "th"];

   const month = months[date.getMonth()];
   const day = date.getDate();
   let daySuffix = "th";
   if (day <= 3) {
      daySuffix = suffixes[day - 1];
   }

   const hours = date.getHours();
   const minutes = date.getMinutes();
   const ampm = hours >= 12 ? "PM" : "AM";
   const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
   const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

   return `${month} ${day}${daySuffix} at ${formattedHours}:${formattedMinutes} ${ampm}`;
}
