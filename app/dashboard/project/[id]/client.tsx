"use client";

import { createClient } from "@/utils/supabase/client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MCQ, MCQShadow, YesOrNo } from "@/Widget/dist/userpollts";

import Link from "next/link";
import AuthButton from "@/components/AuthButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { poll } from "@/utils/types";

export default function Client({ polls, projectId, project }: { polls: poll[]; projectId: string; project: any }) {
   const router = useRouter();
   const [newNotificationName, setNewNotificationName] = useState("");
   const newNotification = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
         .from("polls")
         .insert([
            {
               title: newNotificationName,
               app_id: projectId,
               poll_data: {
                  type: "yesorno",
                  title: "Are you open to taking a 15 min zoom call to hear about how you use FORMI for cheer?",
                  yesorno: {
                     no_button: "No, thanks",
                     yes_button: "Sure",
                  },
                  subtitle: "Just quickly want to learn how to make the app better for you guys",
               },
            },
         ])
         .select("*")
         .single();

      router.push("/dashboard/poll/" + data.id);
   };
   const supabase = createClient();

   return (
      <div className="flex flex-row h-screen w-full">
         <div className=" w-full flex flex-col">
            <div className=" py-7 w-full px-10 flex flex-col justify-center">
               <p className="tracking-tight font-bold text-2xl">{project.name}</p>
               <p className="text-sm text-neutral-700">
                  <span className=" font-semibold">API Key:</span> <span>{projectId}</span>
               </p>
               {/* <AuthButton /> */}
            </div>

            {/* <HDivider></HDivider> */}
            <div className="min-h-[1px] w-full bg-neutral-200"></div>
            <div className="px-10  flex-col flex gap-10 overflow-y-scroll py-10">
               <div className="flex flex-row items-center justify-between  h-full">
                  {/* <div></div> */}
                  <Dialog>
                     <DialogTrigger>
                        {" "}
                        <Button>New notification</Button>
                     </DialogTrigger>

                     <DialogContent>
                        <DialogHeader>
                           <DialogTitle>Name your notification</DialogTitle>
                           <div className="h-4"></div>
                           <Input
                              value={newNotificationName}
                              onChange={(e) => {
                                 setNewNotificationName(e.target.value);
                              }}
                           />
                           <div className="h-3"></div>
                           <div className="flex flex-row justify-between">
                              <div></div>

                              <Button
                                 onClick={() => {
                                    newNotification();
                                 }}
                              >
                                 Create
                              </Button>
                           </div>
                        </DialogHeader>
                     </DialogContent>
                  </Dialog>
               </div>
               <div className="grid grid-cols-2 w-full gap-20 ">
                  {polls?.map((poll) => {
                     return (
                        <Link href={`/dashboard/poll/${poll.id}`} key={poll.id}>
                           <div className="flex flex-col w-full justify-between  gap-5">
                              <div className="flex flex-row w-full items-end justify-between">
                                 <p className="tracking-tight font-medium text-2xl">{poll.title}</p>
                                 <div className="flex flex-col items-end">
                                    <p className="text-3xl font-medium text-neutral-900">34</p>
                                    <p className="text-sm text-neutral-600 ">responses</p>
                                 </div>
                              </div>

                              <div className="flex flex-col gap-4 justify-center h-full ">
                                 <div className=" overflow-hidden select-none  w-[500px] min-h-[100px] rounded-lg border  dark:border-neutral-700 border-neutral-300">
                                    {poll.poll_data.type === "mcq" ? (
                                       <MCQ sendResponse={() => null} poll={poll}></MCQ>
                                    ) : (
                                       <YesOrNo sendResponse={() => null} poll={poll}></YesOrNo>
                                    )}
                                 </div>
                              </div>
                           </div>
                        </Link>
                     );
                  })}
               </div>
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
