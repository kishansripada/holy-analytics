"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { poll } from "@/utils/types";
import { useEffect, useState } from "react";
import Script from "next/script";
import RemoteWidget from "./remote-widget";
export default function What({ poll, setPoll }: { poll: poll; setPoll: Function }) {
   // const YesNoComponent = window.YesOrNo;

   return (
      <div className="flex flex-row w-full justify-between  gap-20 ">
         {/* <Script
            onReady={() => {
               // setWidget(window.YesOrNo);
               // console.log();
            }}
            strategy="afterInteractive"
            type="module"
            src="https://holyuser-widget.vercel.app/holyuser.js"
         ></Script> */}
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
               <div className="flex flex-row justify-between w-full">
                  {/* <div>
                     <Label htmlFor="title">Negative text</Label>
                     <Input
                        className="w-full"
                        onChange={(e) => {
                           //  console.log(e);
                           setPoll((poll) => {
                              return {
                                 ...poll,
                                 poll_data: {
                                    ...poll.poll_data,
                                    yesorno: {
                                       ...poll.poll_data.yesorno,
                                       no_button: e.target.value,
                                    },
                                 },
                              };
                           });
                        }}
                        value={poll.poll_data.yesorno.no_button}
                        type="negative"
                        id="negative"
                        placeholder="No, thanks"
                     />
                  </div>
                  <div>
                     <Label htmlFor="title">Affirmative text</Label>
                     <Input
                        className="w-full"
                        onChange={(e) => {
                           //  console.log(e);
                           setPoll((poll) => {
                              return {
                                 ...poll,
                                 poll_data: {
                                    ...poll.poll_data,
                                    yesorno: {
                                       ...poll.poll_data.yesorno,
                                       yes_button: e.target.value,
                                    },
                                 },
                              };
                           });
                        }}
                        value={poll.poll_data.yesorno.yes_button}
                        type="affirmative"
                        id="affirmative"
                        placeholder="Sure"
                     />
                  </div> */}
               </div>
               {/* <div className="flex flex-row items-end w-full justify-between">
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
               </div> */}
               {/* <div className="grid grid-cols-2 w-full gap-4">
                  {poll.poll_data.options.map((option) => {
                     return (
                        <div className="flex flex-row w-full items-center gap-1.5 ">
                           <Label htmlFor="title">Subtitle</Label>
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
               </div> */}
            </div>
         </div>

         <div className="">
            <div className="flex flex-col gap-4 justify-center h-full ">
               <div className="flex flex-row justify-between w-full items-end">
                  <p className="text-neutral-600 text-xl font-semibold">Live preview</p>
               </div>
               <div className=" overflow-hidden select-none  w-[500px] min-h-[200px] grid place-items-center rounded-lg border  dark:border-neutral-700 border-neutral-300">
                  {/* {typeof window !== "undefined" && YesNoComponent ? <YesNoComponent poll={poll}></YesNoComponent> : null} */}
                  <RemoteWidget poll={poll}></RemoteWidget>
               </div>
            </div>
         </div>
      </div>
   );
}
