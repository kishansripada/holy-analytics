"use client";

import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";

export default function Client({ projects }: any) {
   const router = useRouter();
   const [newProjectName, setNewProjectName] = useState("");
   const newProject = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
         .from("projects")
         .insert([
            {
               name: newProjectName,
            },
         ])
         .select("*")
         .single();

      router.refresh();
      // router.push("/dashboard/poll/" + data.id);
   };
   const supabase = createClient();

   return (
      <div className="flex flex-row h-screen w-full">
         <div className=" w-full flex flex-col">
            <div className="h-20 w-full px-10 flex flex-col justify-center">
               <p className="tracking-tight font-bold text-3xl">Projects</p>
               {/* <AuthButton /> */}
            </div>

            <div className="h-[1px] w-full bg-neutral-300"></div>
            <div className="px-10 py-10">
               <div className="flex flex-row items-center justify-between">
                  <div></div>
                  <Dialog>
                     <DialogTrigger>
                        {" "}
                        <Button>New project</Button>
                     </DialogTrigger>

                     <DialogContent>
                        <DialogHeader>
                           <DialogTitle>Name your project</DialogTitle>
                           <DialogDescription>This is the name of the app you are putting your notification in</DialogDescription>
                           <div className="h-4"></div>
                           <Input
                              value={newProjectName}
                              onChange={(e) => {
                                 setNewProjectName(e.target.value);
                              }}
                           />
                           <div className="h-3"></div>
                           <div className="flex flex-row justify-between">
                              <div></div>
                              <DialogClose>
                                 <Button
                                    onClick={() => {
                                       newProject();
                                    }}
                                 >
                                    Create
                                 </Button>
                              </DialogClose>
                           </div>
                        </DialogHeader>
                     </DialogContent>
                  </Dialog>
               </div>
               <div className="grid grid-cols-3 w-full gap-x-20 gap-y-10 py-10">
                  {projects?.map((project) => {
                     return (
                        <Link
                           className="w-full h-[70px] rounded-md border text-neutral-700 transition hover:bg-neutral-50 flex flex-row items-center justify-between px-4  border-neutral-300 shadow-sm"
                           href={`dashboard/project/${project.app_id}`}
                           key={project.app_id}
                        >
                           <div className="font-medium ">{project.name}</div>
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                           >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                           </svg>
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
