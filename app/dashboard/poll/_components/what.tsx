"use client";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MCQ } from "../../../../Widget/dist/userpollts";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type poll = {
   id: string;
   title: string;
   active: boolean;
   poll_data: {
      title: string;
      subtitle: string;
      options: option[];
   };
   conditions: condition[];
};

type condition = {
   id: string;
   condition_string: string;
};

type option = {
   id: string;
   title: string;
   //    votes: number;
};

type User = {
   id: string;
   created_at: string;
   email: string;
   selectedUses: string[];
};

export default function What({ poll, setPoll }: { poll: poll; setPoll: Function }) {
   return (
      <div className="flex flex-row w-full justify-between  gap-20 ">
         <div className="flex flex-col pt-5 w-full gap-6">
            <div className="grid w-full items-center gap-1.5 ">
               <Label htmlFor="title">Title</Label>
               <Input
                  className="w-full"
                  onChange={(e) => {
                     //  console.log(e);
                     setPoll({ ...poll, poll_data: { ...poll.poll_data, title: e.target.value } });
                  }}
                  value={poll.poll_data.title}
                  type="title"
                  id="title"
                  placeholder="Title"
               />
            </div>
            <div className="grid w-full items-center gap-1.5 ">
               <Label htmlFor="title">Subtitle</Label>
               <Input
                  className="w-full"
                  onChange={(e) => {
                     //  console.log(e);
                     setPoll({ ...poll, poll_data: { ...poll.poll_data, subtitle: e.target.value } });
                  }}
                  value={poll.poll_data.subtitle}
                  type="subtitle"
                  id="subtitle"
                  placeholder="Subtitle"
               />
            </div>
            <div className="flex flex-col gap-4">
               <div className="flex flex-row items-end w-full justify-between">
                  <Label htmlFor="title">Options</Label>
                  <Button
                     variant={"outline"}
                     onClick={() => {
                        setPoll((poll) => {
                           return {
                              ...poll,
                              poll_data: {
                                 ...poll.poll_data,
                                 options: [
                                    ...poll.poll_data.options,
                                    {
                                       id: Math.random().toString(36).substring(7),
                                       title: "",
                                    },
                                 ],
                              },
                           };
                        });
                     }}
                  >
                     New option
                  </Button>
               </div>
               <div className="grid grid-cols-2 w-full gap-4">
                  {poll.poll_data.options.map((option) => {
                     return (
                        <div className="flex flex-row w-full items-center gap-1.5 ">
                           {/* <Label htmlFor="title">Subtitle</Label> */}
                           <Input
                              className="w-full"
                              onChange={(e) => {
                                 //  console.log(e);
                                 setPoll((poll) => {
                                    return {
                                       ...poll,
                                       poll_data: {
                                          ...poll.poll_data,
                                          options: poll.poll_data.options.map((optionx) => {
                                             if (optionx.id === option.id) {
                                                return { ...optionx, title: e.target.value };
                                             }
                                             return optionx;
                                          }),
                                       },
                                    };
                                 });
                              }}
                              value={option.title}
                              type="subtitle"
                              id="option"
                              placeholder="Subtitle"
                           />
                           <Button
                              className="w-12 p-0"
                              onClick={() => {
                                 setPoll((poll) => {
                                    return {
                                       ...poll,
                                       poll_data: {
                                          ...poll.poll_data,
                                          options: poll.poll_data.options.filter((optionx) => {
                                             return optionx.id !== option.id;
                                          }),
                                       },
                                    };
                                 });
                              }}
                              variant={"outline"}
                           >
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor"
                                 className="w-5 h-5 text-neutral-600"
                              >
                                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                              </svg>
                           </Button>
                        </div>
                     );
                  })}
               </div>
            </div>
         </div>

         <div className="">
            <div className="flex flex-col gap-4 justify-center h-full ">
               <div className="flex flex-row justify-between w-full items-end">
                  <p className="text-neutral-600 text-xl font-semibold">Live preview</p>

                  <Button variant={"outline"}>Open modal</Button>
                  {/* <div className="flex items-center space-x-2"></div> */}
               </div>
               <div className=" overflow-hidden select-none  w-[500px] min-h-[100px] rounded-lg border  dark:border-neutral-700 border-neutral-300">
                  <MCQ poll={poll}></MCQ>
               </div>
            </div>
         </div>
      </div>
   );
}
