"use client";

import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { poll } from "@/utils/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

const defaultMarkdown = {
   popover: `#Feedback is always appreciated
We promise we'll reply in 24 hours, sometimes much faster :)
<Button />`,
   notification: `#Woah that's all the dancers
You can also press ⌘A to select all the dancers at once`,
   modal: `#Feedback is always appreciated
We promise we'll reply in 24 hours, sometimes much faster :)
<Button />`,
};

export default function Client({ projectId, messages, project }: { messages: poll[]; projectId: string; project: any }) {
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
               anchor: newNotificationName.toLowerCase().replace(/ /g, "_") + "_element",
               markdown: defaultMarkdown[newNotificationType || "popover"],
               app_id: projectId,
               poll_data: {
                  type: newNotificationType,
               },
            },
         ])
         .select("*")
         .single();
      // console.log({ data });
      // console.log({ error });

      router.push(`/dashboard/${projectId}/poll/` + data.id);
   };
   const supabase = createClient();

   const onUpdate = async (name: string) => {
      await supabase.from("projects").update({ name }).eq("app_id", projectId);
   };

   return (
      <div className="flex h-full w-full flex-row">
         <div className=" flex w-full flex-col">
            <div className="flex min-h-24 w-full flex-col justify-center px-7">
               {/* <input
                  className="w-min  py-1 text-2xl font-bold tracking-tight"
                  value={project.name}
                  onChange={(e) => {
                     setProjectName(e.target.value);
                  }}
               /> */}

               {/* <UploadInput className="w-full  py-1 text-2xl font-bold tracking-tight" value={project.name} onUpdate={onUpdate} /> */}
               <p className="w-full  py-1 text-2xl font-bold tracking-tight">Messages</p>
               <p className="text-sm text-neutral-600">
                  Modals, notifications or popovers. They can be assembled into an onboarding flow or displayed independently.
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
                        <Button>New message</Button>
                     </DialogTrigger>

                     <DialogContent>
                        <DialogHeader>
                           <DialogTitle>New message</DialogTitle>
                           <div className="h-4"></div>
                           <Input
                              value={newNotificationName}
                              onChange={(e) => {
                                 setNewNotificationName(e.target.value);
                              }}
                              placeholder="Name of message"
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
                                    <SelectItem value="popover">Popover</SelectItem>
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
               {messages.length ? (
                  <div className="flex w-full flex-col gap-5  ">
                     {messages
                        ?.sort((a, b) => new Date(b.last_edited).getTime() - new Date(a.last_edited).getTime())
                        .map((poll) => {
                           return (
                              <ContextMenu>
                                 <ContextMenuTrigger>
                                    <Link
                                       className="flex h-16 flex-col justify-center rounded-md  px-3 py-2 transition hover:bg-neutral-100 "
                                       href={`/dashboard/${projectId}/poll/${poll.id}`}
                                       key={poll.id}
                                    >
                                       <div className="flex w-full flex-row items-center justify-between">
                                          <div className="flex w-full flex-row items-center justify-between gap-3">
                                             <p className="text-2xl font-medium tracking-tight"> {poll.title}</p>
                                             <Badge variant={"outline"} className="capitalize">
                                                {poll.poll_data.type}
                                             </Badge>
                                             {/* <p className="text-sm text-neutral-700">ID: {poll.id}</p> */}
                                          </div>
                                       </div>
                                    </Link>
                                 </ContextMenuTrigger>
                                 <ContextMenuContent>
                                    <ContextMenuItem
                                       onClick={async () => {
                                          const test = await supabase.from("messages").delete().eq("id", poll.id);
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
