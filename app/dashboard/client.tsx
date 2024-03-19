"use client";

import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { HStack, VStack } from "@/components/ui/stacks";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Client({ projects }: any) {
   const router = useRouter();
   const [newProjectName, setNewProjectName] = useState("");
   const supabase = createClient();
   const newProject = async () => {
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
   };

   return (
      <VStack className="w-full">
         <div className="flex h-20 w-full flex-col justify-center px-10">
            <p className="text-3xl font-bold tracking-tight">Projects</p>
         </div>

         <div className="h-[1px] w-full bg-neutral-300"></div>
         <VStack className="px-10 py-10">
            <HStack className="justify-between">
               <div></div>
               <Dialog>
                  <DialogTrigger>
                     <Button>New project</Button>
                  </DialogTrigger>

                  <DialogContent>
                     <DialogHeader>
                        <DialogTitle>Name your project</DialogTitle>
                        <DialogDescription>This is the name of the app you are putting your modal in</DialogDescription>
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
            </HStack>

            {projects.length ? (
               <div className="grid w-full grid-cols-3 gap-x-20 gap-y-10 py-10">
                  {projects?.map((project: any) => {
                     return (
                        <ContextMenu>
                           <ContextMenuTrigger>
                              <Link
                                 className="flex h-[70px] w-full flex-row items-center justify-between rounded-md border border-neutral-300 px-4 text-neutral-700 shadow-sm transition hover:bg-neutral-50"
                                 href={`dashboard/${project.app_id}`}
                                 key={project.app_id}
                              >
                                 <div className="font-medium ">{project.name}</div>
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                 >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                 </svg>
                              </Link>
                           </ContextMenuTrigger>
                           <ContextMenuContent>
                              <ContextMenuItem
                                 onClick={async () => {
                                    await supabase.from("projects").delete().eq("app_id", project.app_id);
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
               <p className="text-neutral-700">Make your first project (this will be the React app you place the widget in)</p>
            )}
         </VStack>
      </VStack>
   );
}
