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
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
// const SAMPLE_YESORNO = {
//    poll_data: {
//       type: "yesorno",
//       title: "Are you open to taking a 15 min zoom call to hear about how you use FORMI for cheer?",
//       yesorno: {
//          no_button: "No, thanks",
//          yes_button: "Sure",
//       },
//       subtitle: "Just quickly want to learn how to make the app better for you guys",
//    },
// };

const SAMPLE_MODAL = {
   poll_data: {
      type: "modal",
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
               ...SAMPLE_MODAL,
               title: newNotificationName,
               unique_id: newNotificationName.toLowerCase().replace(" ", "_"),
               app_id: projectId,
            },
         ])
         .select("*")
         .single();

      router.push(`/dashboard/project/${projectId}/poll/` + data.id);
   };
   const supabase = createClient();

   return (
      <div className="flex h-full w-full flex-row">
         <div className=" flex w-full flex-col">
            <div className=" flex w-full flex-col justify-center px-7 py-5">
               <p className="text-2xl font-bold tracking-tight">{project.name}</p>
               <p className="text-sm text-neutral-700">
                  <span className=" font-semibold">API Key:</span> <span>{projectId}</span>
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
                        <Button>New tip</Button>
                     </DialogTrigger>

                     <DialogContent>
                        <DialogHeader>
                           <DialogTitle>New tip</DialogTitle>
                           <div className="h-4"></div>
                           <Input
                              value={newNotificationName}
                              onChange={(e) => {
                                 setNewNotificationName(e.target.value);
                              }}
                              placeholder="Name of tip"
                           />
                           <div className="h-3"></div>
                           <Select
                              defaultValue="modal"
                              onValueChange={(e) => {
                                 setNewNotificationType(e);
                              }}
                           >
                              <SelectTrigger className="">
                                 <SelectValue placeholder="Type" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectGroup>
                                    <SelectLabel>All we have so far :)</SelectLabel>
                                    {/* <SelectItem value="yesorno">Yes or no question</SelectItem> */}
                                    <SelectItem value="modal">Modal </SelectItem>
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
                  <div className="flex w-full flex-col gap-5  ">
                     {polls?.map((poll) => {
                        return (
                           <ContextMenu>
                              <ContextMenuTrigger>
                                 <Link
                                    className="flex h-16 flex-col justify-center rounded-md  px-3 py-2 transition hover:bg-neutral-100 "
                                    href={`/dashboard/project/${projectId}/poll/${poll.id}`}
                                    key={poll.id}
                                 >
                                    <div className="flex w-full flex-row items-center justify-between">
                                       <div className="flex flex-row items-center gap-3">
                                          <p className="text-2xl font-medium tracking-tight"> {poll.title}</p>
                                          {/* {poll.active ? (
                                       <span className="rounded-full bg-green-200 px-2 py-1 text-xs font-medium text-green-800">Live</span>
                                    ) : (
                                       <span className="rounded-full bg-yellow-200 px-2 py-1 text-xs font-medium text-yellow-900">Inactive</span>
                                    )} */}
                                       </div>
                                    </div>
                                 </Link>
                              </ContextMenuTrigger>
                              <ContextMenuContent>
                                 <ContextMenuItem
                                    onClick={async () => {
                                       await supabase.from("polls").delete().eq("id", poll.id);
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
                  <p className="text-neutral-700">Start by making your first notification to your users</p>
               )}
            </div>
         </div>
      </div>
   );
}
