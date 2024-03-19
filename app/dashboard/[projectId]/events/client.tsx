"use client";

import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Client({ events, projectId, project }: { events: any[]; projectId: string; project: any }) {
   const router = useRouter();

   const [newEventName, setNewEventName] = useState("");

   const makeNeweventAndGoToIt = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
         .from("events")
         .insert([
            {
               name: newEventName,
               conditions: [
                  {
                     condition_string: "",
                     id: "yolo",
                  },
               ],
               app_id: projectId,
            },
         ])
         .select("*")
         .single();

      router.push(`/dashboard/${projectId}/events/` + data.id);
   };
   const supabase = createClient();

   return (
      <div className="flex h-full w-full flex-row">
         <div className=" flex w-full flex-col">
            <div className="flex min-h-24 w-full flex-col justify-center px-7">
               <p className="w-full  py-1 text-2xl font-bold tracking-tight">Events</p>
               <p className="text-sm text-neutral-600">
                  {`Events are the actions that users take in your app. They can be used to trigger in-app messages or track user behavior.`}
               </p>
            </div>

            <div className="min-h-[1px] w-full bg-neutral-200"></div>
            <div className="flex  flex-col gap-10 overflow-y-scroll px-10 py-10">
               <div className="flex h-full flex-row items-center  justify-between ">
                  <div></div>
                  <Dialog>
                     <DialogTrigger>
                        <Button>New event</Button>
                     </DialogTrigger>

                     <DialogContent>
                        <DialogHeader>
                           <DialogTitle>New event</DialogTitle>
                           <div className="h-4"></div>
                           <Input
                              value={newEventName}
                              onChange={(e) => {
                                 setNewEventName(e.target.value);
                              }}
                              placeholder="Name of event"
                           />
                           <div className="h-3"></div>

                           <div className="h-3"></div>
                           <div className="flex flex-row justify-between">
                              <div></div>

                              <Button
                                 onClick={() => {
                                    makeNeweventAndGoToIt();
                                 }}
                              >
                                 Create
                              </Button>
                           </div>
                        </DialogHeader>
                     </DialogContent>
                  </Dialog>
               </div>
               {events.length ? (
                  <div className="flex w-full flex-col gap-5  ">
                     {events?.map((event) => {
                        return (
                           <ContextMenu>
                              <ContextMenuTrigger>
                                 <div
                                    className="flex h-16 flex-col justify-center rounded-md  px-3 py-2 transition hover:bg-neutral-100 "
                                    href={`/dashboard/${projectId}/events/${event.id}`}
                                    key={event.id}
                                 >
                                    <div className="flex w-full flex-row items-center justify-between">
                                       <div className="flex w-full flex-row items-center justify-between gap-3">
                                          <p className="text-2xl font-medium tracking-tight"> {event.name}</p>

                                          <div className="flex flex-col items-start">
                                             <p className="text-nuetral-700 text-xs font-medium tracking-wide">EVENT ID</p>
                                             <div
                                                className={
                                                   "border-input ring-offset-background focus-within:ring-ring flex h-10 items-center rounded-md border bg-white pl-3 text-sm focus-within:ring-1 focus-within:ring-offset-2"
                                                }
                                             >
                                                <button className="rounded-md p-1 transition hover:bg-neutral-100">
                                                   <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      strokeWidth={1.5}
                                                      stroke="currentColor"
                                                      className="h-5 w-5"
                                                   >
                                                      <path
                                                         strokeLinecap="round"
                                                         strokeLinejoin="round"
                                                         d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                                                      />
                                                   </svg>
                                                </button>

                                                <input
                                                   value={event.unique_id}
                                                   //  {...props}

                                                   //  ref={ref}
                                                   className="placeholder:text-muted-foreground w-full p-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                                />
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </ContextMenuTrigger>
                              <ContextMenuContent>
                                 <ContextMenuItem
                                    onClick={async () => {
                                       await supabase.from("events").delete().eq("id", event.id);
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
