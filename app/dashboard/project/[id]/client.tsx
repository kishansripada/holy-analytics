"use client";

import { createClient } from "@/utils/supabase/client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { poll } from "@/utils/types";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const SAMPLE_YESORNO = {
   poll_data: {
      type: "yesorno",
      title: "Are you open to taking a 15 min zoom call to hear about how you use FORMI for cheer?",
      yesorno: {
         no_button: "No, thanks",
         yes_button: "Sure",
      },
      subtitle: "Just quickly want to learn how to make the app better for you guys",
   },
};

const SAMPLE_ANNOUNCEMENT = {
   poll_data: {
      type: "announcement",
      title: "Hey Cheerleaders!",
      subtitle: "You can now adjust the height of performers in 3D",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/6/6e/JU_Cheerleaders.jpg",
   },
};

export default function Client({ polls, projectId, project }: { polls: poll[]; projectId: string; project: any }) {
   const router = useRouter();
   const [newNotificationName, setNewNotificationName] = useState("");
   const [newNotificationType, setNewNotificationType] = useState("");
   const newNotification = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
         .from("polls")
         .insert([
            {
               ...(newNotificationType === "yesorno" ? SAMPLE_YESORNO : SAMPLE_ANNOUNCEMENT),
               title: newNotificationName,
               app_id: projectId,
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
               <div className="flex flex-row items-center justify-between  h-full ">
                  <div></div>
                  <Dialog>
                     <DialogTrigger>
                        {" "}
                        <Button>New notification</Button>
                     </DialogTrigger>

                     <DialogContent>
                        <DialogHeader>
                           <DialogTitle>New notification</DialogTitle>
                           <div className="h-4"></div>
                           <Input
                              value={newNotificationName}
                              onChange={(e) => {
                                 setNewNotificationName(e.target.value);
                              }}
                              placeholder="Notification name"
                           />
                           <div className="h-3"></div>
                           <Select
                              onValueChange={(e) => {
                                 setNewNotificationType(e);
                              }}
                           >
                              <SelectTrigger className="">
                                 <SelectValue placeholder="Type" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectGroup>
                                    <SelectLabel>Notification types</SelectLabel>
                                    <SelectItem value="yesorno">Yes or no question</SelectItem>
                                    <SelectItem value="announcement">Modal announcement</SelectItem>
                                 </SelectGroup>
                              </SelectContent>
                           </Select>
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
               {polls.length ? (
                  <div className="flex flex-col w-full gap-5  ">
                     {polls?.map((poll) => {
                        return (
                           <Link
                              className="hover:bg-neutral-100 transition flex flex-col justify-center  py-2 rounded-md px-3 h-16 "
                              href={`/dashboard/poll/${poll.id}`}
                              key={poll.id}
                           >
                              <div className="flex flex-row w-full items-center justify-between">
                                 <div className="flex flex-row gap-3 items-center">
                                    <p className="tracking-tight font-medium text-2xl"> {poll.title}</p>
                                    {poll.active ? (
                                       <span className="rounded-full px-2 py-1 text-xs font-medium text-green-800 bg-green-200">Live</span>
                                    ) : (
                                       <span className="rounded-full px-2 py-1 text-xs font-medium text-yellow-900 bg-yellow-200">Inactive</span>
                                    )}
                                 </div>

                                 {/* <div className="flex flex-col items-end">
                                 <p className="text-3xl font-medium text-neutral-900">34</p>
                                 <p className="text-sm text-neutral-600 ">responses</p>
                              </div> */}
                              </div>
                           </Link>
                        );
                     })}
                  </div>
               ) : (
                  <p className="text-neutral-700">Start by making your first notification to your users</p>
               )}
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
