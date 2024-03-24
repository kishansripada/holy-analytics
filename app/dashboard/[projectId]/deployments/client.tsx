"use client";

import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SAMPLE_MODAL = {
   poll_data: {
      title: "Hey Cheerleaders!",
      subtitle: "You can now adjust the height of performers in 3D",
      image_url: "https://upload.wikimedia.org/wikipedia/commons/6/6e/JU_Cheerleaders.jpg",
   },
};

export default function Client({ deployments, projectId, project, messages, audiences }: { deployments: any[]; projectId: string; project: any }) {
   const router = useRouter();

   const [newDeploymentName, setNewDeploymentName] = useState("");
   const [newDeploymentAudienceId, setNewDeploymentAudienceId] = useState("");
   const newDeployment = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
         .from("deployments")
         .insert([
            {
               name: newDeploymentName,
               // unique_id: newDeploymentName.toLowerCase().replace(" ", "_"),
               app_id: projectId,
               data_tree: {
                  nodes: [
                     {
                        id: "newTrigger",
                        parent_id: "initialTrigger",
                        message_id: 24,
                        programmatic_filter: "30",
                     },
                  ],
                  initialTrigger: "programmatic",
                  initialAudience: newDeploymentAudienceId,
                  initialTriggerDelay: 0,
               },
            },
         ])
         .select("*")
         .single();

      router.push(`/dashboard/${projectId}/deployments/` + data.id);
   };
   const supabase = createClient();

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
               <p className="w-full  py-1 text-2xl font-bold tracking-tight">Deployments</p>
               <p className="text-sm text-neutral-600">
                  Combinations of messages, deployments and events that are deployed to your app.
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
                           <DialogTitle>New deployment</DialogTitle>
                           <div className="h-4"></div>
                           <Input
                              value={newDeploymentName}
                              onChange={(e) => {
                                 setNewDeploymentName(e.target.value);
                              }}
                              placeholder="Name of deployment"
                           />
                           <div className="h-3"></div>

                           <Select
                              // defaultValue="modal"
                              onValueChange={(e) => {
                                 setNewDeploymentAudienceId(e);
                              }}
                           >
                              <SelectTrigger className="">
                                 <SelectValue placeholder="Audience" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectGroup>
                                    {audiences.map((audience) => {
                                       return <SelectItem value={audience.id}>{audience.name}</SelectItem>;
                                    })}
                                 </SelectGroup>
                                 <SelectSeparator></SelectSeparator>

                                 <SelectItem value={"everyone"}>Everyone</SelectItem>
                              </SelectContent>
                           </Select>
                           <div className="flex flex-row justify-between">
                              <div></div>

                              <Button
                                 onClick={() => {
                                    newDeployment();
                                 }}
                              >
                                 Create
                              </Button>
                           </div>
                        </DialogHeader>
                     </DialogContent>
                  </Dialog>
               </div>
               {deployments.length ? (
                  <div className="flex w-full flex-col gap-5  ">
                     {deployments?.map((deployment) => {
                        const audience = audiences.find((audience) => audience.id === deployment.data_tree.initialAudience);
                        const intialTrigger = deployment.data_tree.initialTrigger !== "page_load" ? "Code trigger" : "On load";
                        const firstMessage = messages.find((message) => message.id === deployment.data_tree.nodes[0].message_id);

                        return (
                           <ContextMenu>
                              <ContextMenuTrigger>
                                 <Link
                                    className="flex flex-col justify-center gap-2 rounded-md px-3  py-2 py-3 transition hover:bg-neutral-100 "
                                    href={`/dashboard/${projectId}/deployments/${deployment.id}`}
                                    key={deployment.id}
                                 >
                                    <div className="flex flex-row items-start justify-between">
                                       <p className="text-2xl font-semibold"> {deployment.name}</p>
                                       {deployment.is_live ? (
                                          <Badge variant={"good"} color="#008205">
                                             Live
                                          </Badge>
                                       ) : (
                                          <Badge variant={"destructive"}>Inactive</Badge>
                                       )}
                                    </div>
                                    <div className="flex w-full flex-row items-center justify-between">
                                       <div className="flex flex-row items-center text-sm font-medium text-neutral-700">
                                          <Link
                                             href={`/dashboard/${projectId}/audiences/${audience?.id}`}
                                             className="flex flex-row items-center gap-2 rounded-full  border border-blue-300 px-3 py-1 tracking-tight transition hover:bg-neutral-200  "
                                          >
                                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                                                <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM1.49 15.326a.78.78 0 0 1-.358-.442 3 3 0 0 1 4.308-3.516 6.484 6.484 0 0 0-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 0 1-2.07-.655ZM16.44 15.98a4.97 4.97 0 0 0 2.07-.654.78.78 0 0 0 .357-.442 3 3 0 0 0-4.308-3.517 6.484 6.484 0 0 1 1.907 3.96 2.32 2.32 0 0 1-.026.654ZM18 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM5.304 16.19a.844.844 0 0 1-.277-.71 5 5 0 0 1 9.947 0 .843.843 0 0 1-.277.71A6.975 6.975 0 0 1 10 18a6.974 6.974 0 0 1-4.696-1.81Z" />
                                             </svg>
                                             {audience?.name || "Everyone"}
                                          </Link>
                                          <p className="mx-3">→</p>
                                          <div className="flex flex-row items-center gap-2 rounded-full border  border-green-300 px-3 py-1 tracking-tight transition hover:bg-neutral-200  ">
                                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                                                <path
                                                   fillRule="evenodd"
                                                   d="M6.28 5.22a.75.75 0 0 1 0 1.06L2.56 10l3.72 3.72a.75.75 0 0 1-1.06 1.06L.97 10.53a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Zm7.44 0a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L17.44 10l-3.72-3.72a.75.75 0 0 1 0-1.06ZM11.377 2.011a.75.75 0 0 1 .612.867l-2.5 14.5a.75.75 0 0 1-1.478-.255l2.5-14.5a.75.75 0 0 1 .866-.612Z"
                                                   clipRule="evenodd"
                                                />
                                             </svg>
                                             {intialTrigger}
                                          </div>
                                          <p className="mx-3">→</p>

                                          <Link
                                             href={`/dashboard/${projectId}/poll/${firstMessage.id}`}
                                             className="flex flex-row items-center gap-2 rounded-full border  border-pink-300 px-3 py-1 tracking-tight transition hover:bg-neutral-200  "
                                          >
                                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                                                <path
                                                   fillRule="evenodd"
                                                   d="M3.43 2.524A41.29 41.29 0 0 1 10 2c2.236 0 4.43.18 6.57.524 1.437.231 2.43 1.49 2.43 2.902v5.148c0 1.413-.993 2.67-2.43 2.902a41.102 41.102 0 0 1-3.55.414c-.28.02-.521.18-.643.413l-1.712 3.293a.75.75 0 0 1-1.33 0l-1.713-3.293a.783.783 0 0 0-.642-.413 41.108 41.108 0 0 1-3.55-.414C1.993 13.245 1 11.986 1 10.574V5.426c0-1.413.993-2.67 2.43-2.902Z"
                                                   clipRule="evenodd"
                                                />
                                             </svg>
                                             {firstMessage.title}
                                          </Link>
                                       </div>

                                       {/* <Badge variant={"outline"} className="capitalize">
                                             {poll.poll_data.type}
                                          </Badge> */}
                                       {/* <p className="text-sm text-neutral-700">ID: {poll.id}</p> */}
                                    </div>
                                 </Link>
                              </ContextMenuTrigger>
                              <ContextMenuContent>
                                 <ContextMenuItem
                                    onClick={async () => {
                                       await supabase.from("deployments").delete().eq("id", deployment.id);
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
