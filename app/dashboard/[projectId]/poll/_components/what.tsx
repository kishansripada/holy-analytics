"use client";

import "prismjs/themes/prism-tomorrow.css";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Prism from "prismjs";
import { Switch } from "@/components/ui/switch";
import { createClient } from "@/utils/supabase/client";
import dynamic from "next/dynamic";
import { poll } from "@/utils/types";

const RemoteWidget = dynamic(() => import("./remote-widget"), {
   ssr: false,
});

export default function What({ poll, setPoll }: { poll: poll; setPoll: Function }) {
   const code = `<div data-hyperuser="${poll.anchor || "ELEMENT_ID"}">
   I'm the element your popover will attach to!
</div>`;

   const html = Prism.highlight(code, Prism.languages.html, "html");

   const supabase = createClient();
   const BASE_URL = "https://cmdpjhmqoqpkfwxqdekb.supabase.co/storage/v1/object/public/";
   const [imageFile, setImageFile] = useState(null);
   const [uploadStatus, setUploadStatus] = useState("idle");
   const [previewOpen, setPreviewOpen] = useState(true);
   const handlePaste = async (event) => {
      const clipboardItems = event.clipboardData.items;
      let blob = null;

      for (let i = 0; i < clipboardItems.length; i++) {
         if (clipboardItems[i].type.indexOf("image") === 0) {
            blob = clipboardItems[i].getAsFile();
         }
      }

      if (blob) {
         setImageFile(blob);
      }
   };

   useEffect(() => {
      if (imageFile) {
         setUploadStatus("uploading");
         const upload = async () => {
            const fileName = `${Date.now()}_${imageFile.name}`;
            const { data, error } = await supabase.storage
               .from("images")
               .upload(`${(await supabase.auth.getUser()).data.user.id}/${fileName}`, imageFile);
            if (error) return;
            setPoll((poll) => {
               return {
                  ...poll,
                  poll_data: {
                     ...poll.poll_data,
                     image_url: BASE_URL + data.fullPath,
                  },
               };
            });
            if (error) {
               setUploadStatus("error");
            } else {
               setUploadStatus("success");
               setImageFile(null); // Reset for next upload
            }
         };

         upload();
      }
   }, [imageFile]);
   useEffect(() => {
      // Add paste event listener
      window.addEventListener("paste", handlePaste);

      // Cleanup function (remove the listener when the component unmounts)
      return () => window.removeEventListener("paste", handlePaste);
   }, []); // Empty dependency array: Execute the effect only once on mount

   return (
      <div className="flex h-full w-full flex-row  justify-between gap-20 pl-1 ">
         <div className="flex w-1/2 flex-col  gap-6 pt-5">
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
            {poll.poll_data.type === "modal" && (
               <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="title">Image URL</Label>
                  <Input
                     className="w-full"
                     onChange={(e) => {
                        //  console.log(e);
                        setPoll((poll) => {
                           return {
                              ...poll,
                              poll_data: {
                                 ...poll.poll_data,
                                 image_url: e.target.value,
                              },
                           };
                        });
                     }}
                     value={poll.poll_data.image_url}
                     type="negative"
                     id="negative"
                     placeholder="https://your-server.com/image.jpg"
                  />
               </div>
            )}

            {poll.poll_data.type === "popover" && (
               <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="title">Anchor ID</Label>
                  <p className="text-sm text-neutral-700">
                     Popovers attach to an HTML element on your website. Choose the ID you are going to add to your codebase.
                  </p>
                  <div className="flex flex-row gap-1.5 py-1">
                     <Input
                        className="w-full"
                        onChange={(e) => {
                           //  console.log(e);
                           setPoll((poll) => {
                              return {
                                 ...poll,
                                 anchor: e.target.value,
                              };
                           });
                        }}
                        value={poll.anchor}
                        placeholder="Anchor ID"
                     />
                     <Sheet>
                        <SheetTrigger>
                           <Button variant={"outline"}>View code</Button>
                        </SheetTrigger>
                        <SheetContent side={"bottom"}>
                           <div className="flex w-full  flex-row justify-center gap-2">
                              <div className="flex flex-col gap-2">
                                 <p className="font-medium">How to tell Hyperuser which element to attach to</p>
                                 <div className="h-36 w-full  rounded-lg border border-neutral-300 bg-neutral-50 p-3 text-sm">
                                    <pre className=" pointer-events-auto select-text">
                                       <code className="w-min" dangerouslySetInnerHTML={{ __html: html }} />
                                    </pre>
                                 </div>
                              </div>
                           </div>
                        </SheetContent>
                     </Sheet>
                  </div>
               </div>
            )}
            <div className="grid w-full items-center gap-1.5">
               <div className="flex flex-row items-center justify-between">
                  {" "}
                  <Label htmlFor="title">Preview mode</Label>
                  <Switch
                     checked={poll.active}
                     onCheckedChange={async (active) => {
                        await supabase.from("polls").update({ active }).eq("id", poll.id);
                        setPoll((poll: poll) => {
                           return { ...poll, active };
                        });
                     }}
                     id="preview"
                  />
               </div>
               <p className="text-sm text-neutral-700">
                  When enabled, we'll show this message on all development servers. You should probably turn this off after you are done previewing.
               </p>
            </div>
         </div>

         <div className="flex h-full w-1/2 flex-col justify-start gap-4">
            {/* <div className=" "> */}
            <div className="flex w-full flex-row items-end justify-between  rounded-xl">
               <p className="text-xl font-semibold text-neutral-600">Live preview</p>
               <Button variant={"link"} size={"sm"}>
                  New deployment from message
               </Button>
            </div>
            {/* <div className=" overflow-hidden select-none  w-[500px] min-h-[200px] grid place-items-center rounded-lg border  dark:border-neutral-700 border-neutral-300"> */}
            {/* {typeof window !== "undefined" && YesNoComponent ? <YesNoComponent poll={poll}></YesNoComponent> : null} */}
            <RemoteWidget poll={poll}></RemoteWidget>
            {/* {previewOpen && (
               <RemoteWrapper poll={poll} open={previewOpen}>
                  <RemoteWidget poll={poll}></RemoteWidget>
               </RemoteWrapper>
            )} */}
            {/* </div> */}
            {/* </div> */}
         </div>
      </div>
   );
}
