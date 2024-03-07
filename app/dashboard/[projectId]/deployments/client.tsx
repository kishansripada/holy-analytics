"use client";

import { createClient } from "@/utils/supabase/client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { poll } from "@/utils/types";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";

import { UploadInput } from "@/components/upload-input";
import { Badge } from "@/components/ui/badge";

const SAMPLE_MODAL = {
   poll_data: {
      title: "Hey Cheerleaders!",
      subtitle: "You can now adjust the height of performers in 3D",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/6/6e/JU_Cheerleaders.jpg",
   },
};

export default function Client({ audiences, projectId, project }: { audiences: any[]; projectId: string; project: any }) {
   const router = useRouter();

   const [projectName, setProjectName] = useState(project.name);

   const [newNotificationName, setNewNotificationName] = useState("");
   const [newNotificationType, setNewNotificationType] = useState("modal");
   const newNotification = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
         .from("polls")
         .insert([
            {
               title: newNotificationName,
               unique_id: newNotificationName.toLowerCase().replace(" ", "_"),
               app_id: projectId,
               poll_data: {
                  ...SAMPLE_MODAL.poll_data,
                  type: newNotificationType,
               },
            },
         ])
         .select("*")
         .single();

      router.push(`/dashboard/${projectId}/poll/` + data.id);
   };
   const supabase = createClient();

   const onUpdate = async (name: string) => {
      await supabase.from("projects").update({ name }).eq("app_id", projectId);
   };

   return (
      <div className="flex h-full w-full flex-row">
         <div className=" flex w-full flex-col">
            <div className="flex h-24 w-full flex-col justify-center px-7">
               {/* <input
                  className="w-min  py-1 text-2xl font-bold tracking-tight"
                  value={project.name}
                  onChange={(e) => {
                     setProjectName(e.target.value);
                  }}
               /> */}

               {/* <UploadInput className="w-full  py-1 text-2xl font-bold tracking-tight" value={project.name} onUpdate={onUpdate} /> */}
               <p className="w-full  py-1 text-2xl font-bold tracking-tight">Deployments</p>
               <p className="text-sm text-neutral-600">
                  Combinations of messages, audiences and triggers that are deployed to your app.
                  {/* <span className=" font-semibold">API Key:</span> <span>{projectId}</span> */}
               </p>
               {/* <AuthButton /> */}
            </div>

            {/* <HDivider></HDivider> */}
            <div className="min-h-[1px] w-full bg-neutral-200"></div>
            <div className="flex  flex-col gap-10 overflow-y-scroll px-10 py-10">
               <div className="flex h-full flex-row items-center  justify-between ">
                  <div></div>
                  <Dialog>
                     <DialogTrigger>
                        <Button>New deployment</Button>
                     </DialogTrigger>

                     <DialogContent>
                        <DialogHeader>
                           <DialogTitle>New audience</DialogTitle>
                           <div className="h-4"></div>
                           <Input
                              value={newNotificationName}
                              onChange={(e) => {
                                 setNewNotificationName(e.target.value);
                              }}
                              placeholder="Name of audience"
                           />
                           <div className="h-3"></div>
                           <Select
                              // defaultValue="modal"
                              onValueChange={(e) => {
                                 setNewNotificationType(e);
                              }}
                           >
                              <SelectTrigger className="">
                                 <SelectValue placeholder="Type" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectGroup>
                                    {/* <SelectLabel>All we have so far :)</SelectLabel> */}
                                    {/* <SelectItem value="yesorno">Yes or no question</SelectItem> */}
                                    <SelectItem value="modal">Modal</SelectItem>
                                    <SelectItem value="notification">Notification</SelectItem>
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
               {audiences.length ? (
                  <div className="flex w-full flex-col gap-5  ">
                     {audiences?.map((audience) => {
                        return (
                           <ContextMenu>
                              <ContextMenuTrigger>
                                 <Link
                                    className="flex h-16 flex-col justify-center rounded-md  px-3 py-2 transition hover:bg-neutral-100 "
                                    href={`/dashboard/${projectId}/audiences/${audience.id}`}
                                    key={audience.id}
                                 >
                                    <div className="flex w-full flex-row items-center justify-between">
                                       <div className="flex w-full flex-row items-center ">
                                          <div className="flex flex-row items-center text-sm font-medium text-neutral-700">
                                             <p className="rounded-full border border-pink-300 px-3 py-1  tracking-tight  ">
                                                press r to flip the stage
                                             </p>
                                             <div className="h-px w-6 bg-pink-300"></div>
                                             <p className="rounded-full border border-pink-300 px-3 py-1  tracking-tight">
                                                paste on another formation
                                             </p>
                                             <p className="mx-3">→</p>

                                             <p className="rounded-full border border-blue-300 px-3 py-1  tracking-tight">
                                                cheerleaders that signed up over a week ago
                                             </p>
                                          </div>
                                          {/* <Badge variant={"outline"} className="capitalize">
                                             {poll.poll_data.type}
                                          </Badge> */}
                                          {/* <p className="text-sm text-neutral-700">ID: {poll.id}</p> */}
                                       </div>
                                    </div>
                                 </Link>
                              </ContextMenuTrigger>
                              <ContextMenuContent>
                                 <ContextMenuItem
                                    onClick={async () => {
                                       await supabase.from("audiences").delete().eq("id", audience.id);
                                       router.refresh();
                                    }}
                                 >
                                    Delete
                                 </ContextMenuItem>
                              </ContextMenuContent>
                           </ContextMenu>
                        );
                     })}
                  </div>
               ) : (
                  <p className="text-neutral-700">Start by making your first in-app message</p>
               )}
            </div>
         </div>
      </div>
   );
}
