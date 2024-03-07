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

   const [newAudienceName, setNewAudienceName] = useState("");

   const newAudience = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
         .from("audiences")
         .insert([
            {
               name: newAudienceName,
               conditions: [
                  {
                     condition_string: "",
                     id: "yolo",
                  },
               ],
            },
         ])
         .select("*")
         .single();

      router.push(`/dashboard/${projectId}/audiences/` + data.id);
   };
   const supabase = createClient();

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
               <p className="w-full  py-1 text-2xl font-bold tracking-tight">Audiences</p>
               <p className="text-sm text-neutral-600">
                  Audiences are groups of speciifc users targeted based on their attributes passed into the SDK.
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
                        <Button>New audience</Button>
                     </DialogTrigger>

                     <DialogContent>
                        <DialogHeader>
                           <DialogTitle>New audience</DialogTitle>
                           <div className="h-4"></div>
                           <Input
                              value={newAudienceName}
                              onChange={(e) => {
                                 setNewAudienceName(e.target.value);
                              }}
                              placeholder="Name of audience"
                           />
                           <div className="h-3"></div>

                           <div className="h-3"></div>
                           <div className="flex flex-row justify-between">
                              <div></div>

                              <Button
                                 onClick={() => {
                                    newAudience();
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
                                       <div className="flex w-full flex-row items-center justify-between gap-3">
                                          <p className="text-2xl font-medium tracking-tight"> {audience.name}</p>
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
