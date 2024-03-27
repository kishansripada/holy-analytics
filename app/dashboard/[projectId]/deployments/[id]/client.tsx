"use client";
import "prismjs/themes/prism-tomorrow.css";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Prism from "prismjs";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadInput } from "@/components/upload-input";
import { HStack, VStack } from "@/components/ui/stacks";
import { codeToHtml } from "shiki";
import { createClient } from "@/utils/supabase/client";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";
import { generateNanoId } from "@/utils/nanoId";
import { Anchor } from "lucide-react";
import { DropdownPill } from "./_components/DropdownPill";
import { BoxWithPlus } from "./_components/BoxWithPlus";
import { Label } from "@/components/ui/label";
import { CopyInput } from "./_components/CopyInput";
import { Shiki } from "@/components/ui/shiki";
import RemoteWidget from "../../poll/_components/remote-widget";
import { useStore } from "../../store";
import { Textarea } from "@/components/ui/textarea";
import { useUploadCallToSupabase, useUploadRowToSupabase, useUploadToSupabaseFunction } from "@/utils/supabase/hooks";
import Saving from "@/app/dashboard/_components/Saving";

export default function Client({
   deploymentId,
   deployment: initialDeployment,
   audiences,
   messages: initialMessages,
   projects,
   projectId,
   events,
}: {}) {
   const [uploadPropertyToSupabase, propertySaved] = useUploadCallToSupabase();
   const [uploadRowToSupabase, rowSaved] = useUploadRowToSupabase();
   const [deployment, setDeployment2] = useState(initialDeployment);
   const [messages, setMessages] = useState(initialMessages);

   const setDeployment = (changedDeployment) => {
      uploadRowToSupabase("deployments", changedDeployment.id, changedDeployment);
      setDeployment2(changedDeployment);
      // setDeployments(
      //    deployments.map((d) => {
      //       if (d.id === deploymentId) {
      //          return changedDeployment;
      //       }
      //       return d;
      //    })
      // );
   };

   const setMessage = (messageId, newMessage) => {
      uploadPropertyToSupabase("polls", "markdown", newMessage.markdown, newMessage.id);

      setMessages(
         messages.map((message) => {
            if (message.id === messageId) {
               return newMessage;
            }
            return message;
         })
      );
   };

   const [messageSelect, setOpen] = useState<{ parentId?: string; current?: string } | false>(false);

   const initialTriggerEvent = events.find((event) => event.id === deployment?.data_tree?.initialTriggerEvent);

   const startDeploymentCode = `// Used to start deployment: ${deployment?.slug}
hyperuser.trackEvent("${initialTriggerEvent?.unique_id}")`;

   const endDeploymentCode = `function stopDeployment() {
   window.endHyperDeployment("${deployment?.id}"); // Trigger a feature interaction using the tip ID
}`;
   const html = Prism.highlight(startDeploymentCode, Prism.languages.javascript, "javascript");
   const html2 = Prism.highlight(endDeploymentCode, Prism.languages.javascript, "javascript");
   useEffect(() => {
      const highlight = async () => {
         await Prism.highlightAll(); // <--- prepare Prism
      };
      highlight(); // <--- call the async function
   }, []); // <--- run when post updates

   const supabase = createClient();

   const router = useRouter();
   // const audienceSaved = useUploadToSupabase("audiences", "conditions", deployment.conditions, deployment.id, true);
   const makeNewAudienceAndGoToIt = async (name: string) => {
      const supabase = createClient();
      const { data, error } = await supabase
         .from("audiences")
         .insert([
            {
               name: name,
               conditions: [
                  {
                     condition_string: "",
                     id: generateNanoId(),
                  },
               ],
               app_id: projectId,
            },
         ])
         .select("*")
         .single();

      router.push(`/dashboard/${projectId}/audiences/` + data.id + `?referer=/dashboard/${projectId}/deployments/${deployment.id}`);
   };

   const onUpdate = useCallback(
      async (name: string) => {
         await supabase.from("deployments").update({ name }).eq("id", deployment.id);
      },
      [deployment?.id]
   );

   useEffect(() => {
      const highlight = async () => {
         await Prism.highlightAll(); // <--- prepare Prism
      };
      highlight(); // <--- call the async function
   }, [deployment]); // <--- run when post updates

   return (
      <VStack className="h-full w-full overflow-hidden px-16 py-12">
         <Saving saved={propertySaved && rowSaved}></Saving>
         <CommandDialog open={Boolean(messageSelect)} onOpenChange={setOpen}>
            <CommandInput placeholder="Search for a message" />
            <CommandList>
               <CommandEmpty>No results found.</CommandEmpty>
               <CommandGroup heading={"Recent messages"}>
                  {messages.map((message) => {
                     const onSelect = (value) => {
                        if (!messageSelect) return;
                        if (messageSelect.current) {
                           setDeployment({
                              ...deployment,
                              data_tree: {
                                 ...deployment.data_tree,
                                 nodes: deployment.data_tree.nodes.map((node) => {
                                    if (node.id === messageSelect.current) {
                                       return { ...node, message_id: message.id };
                                    }
                                    return node;
                                 }),
                              },
                           });
                        }
                        if (messageSelect.parentId) {
                           setDeployment({
                              ...deployment,
                              data_tree: {
                                 ...deployment.data_tree,
                                 nodes: [
                                    ...deployment.data_tree.nodes,
                                    { id: generateNanoId(), parent_id: messageSelect.parentId, message_id: message.id },
                                 ],
                              },
                           });
                        }

                        setOpen(false);
                     };
                     return (
                        <CommandItem key={message.id} value={message.id} onSelect={onSelect}>
                           {message.title}
                           <Badge variant={"secondary"} className=" ml-auto">
                              <p className="capitalize">{message.poll_data.type}</p>
                           </Badge>
                        </CommandItem>
                     );
                  })}
               </CommandGroup>
            </CommandList>
         </CommandDialog>

         <div className="flex w-full flex-row items-center justify-between">
            <div>
               <p className="text-sm font-semibold uppercase tracking-wide text-neutral-500">Deployment</p>
               <UploadInput
                  onChange={(val) => {
                     setDeployment({ ...deployment, name: val });
                  }}
                  className="  min-w-min text-2xl font-medium tracking-tight"
                  value={deployment.name || "my first "}
                  onUpdate={onUpdate}
               />
            </div>
            <div className="flex flex-row items-center gap-2">
               <Sheet>
                  <SheetTrigger className="w-min whitespace-nowrap text-sm">End deployment early?</SheetTrigger>
                  <SheetContent side={"bottom"}>
                     <SheetHeader>
                        <SheetTitle>End deployment with code</SheetTitle>
                        <SheetDescription>
                           This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                        </SheetDescription>
                     </SheetHeader>
                     <div className="flex w-full flex-col gap-2">
                        {/* <p className="font-medium">Record a feature interaction</p> */}
                        <div className="w-full overflow-scroll rounded-lg border border-neutral-300 bg-neutral-50 object-cover p-3 text-sm">
                           <pre className="w-full">
                              <code dangerouslySetInnerHTML={{ __html: html2 }} />
                           </pre>
                        </div>
                     </div>
                  </SheetContent>
               </Sheet>

               <div
                  onClick={async () => {
                     const { data, error } = await supabase.from("deployments").update({ is_live: !deployment.is_live }).eq("id", deployment.id);
                     if (!error) {
                        setDeployment({ ...deployment, is_live: !deployment.is_live });
                     }
                  }}
               >
                  {deployment.is_live ? <Button variant={"destructive"}>Deactivate</Button> : <Button>Go Live</Button>}
               </div>
            </div>
         </div>

         <div className="flex h-full flex-row overflow-x-scroll py-12 ">
            <div className="relative flex h-full flex-col  items-start justify-center">
               <div className="relative flex flex-col items-center gap-4 text-sm font-medium text-neutral-700">
                  <p className=" absolute -top-1 -translate-y-full text-sm font-semibold uppercase tracking-wide text-neutral-500">Audience</p>
                  <DropdownMenu>
                     <DropdownMenuTrigger>
                        <div className="flex flex-row items-center gap-2 rounded-full border  border-blue-300 px-3 py-1  transition hover:bg-neutral-200  ">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                              <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM1.49 15.326a.78.78 0 0 1-.358-.442 3 3 0 0 1 4.308-3.516 6.484 6.484 0 0 0-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 0 1-2.07-.655ZM16.44 15.98a4.97 4.97 0 0 0 2.07-.654.78.78 0 0 0 .357-.442 3 3 0 0 0-4.308-3.517 6.484 6.484 0 0 1 1.907 3.96 2.32 2.32 0 0 1-.026.654ZM18 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM5.304 16.19a.844.844 0 0 1-.277-.71 5 5 0 0 1 9.947 0 .843.843 0 0 1-.277.71A6.975 6.975 0 0 1 10 18a6.974 6.974 0 0 1-4.696-1.81Z" />
                           </svg>

                           <p className="whitespace-nowrap">
                              {deployment.data_tree.initialAudience === "everyone"
                                 ? "Everyone"
                                 : audiences.find((audience) => audience.id === deployment.data_tree.initialAudience).name}
                           </p>
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                              <path
                                 fillRule="evenodd"
                                 d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                 clipRule="evenodd"
                              />
                           </svg>
                        </div>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent>
                        {audiences.length ? (
                           <>
                              {audiences.map((audience) => {
                                 return (
                                    <DropdownMenuItem
                                       onClick={() => {
                                          setDeployment({
                                             ...deployment,
                                             data_tree: { ...deployment.data_tree, initialAudience: audience.id },
                                          });
                                       }}
                                    >
                                       {audience.name}
                                    </DropdownMenuItem>
                                 );
                              })}
                              <DropdownMenuSeparator></DropdownMenuSeparator>
                           </>
                        ) : null}
                        <DropdownMenuItem
                           onClick={() => {
                              setDeployment({ ...deployment, data_tree: { ...deployment.data_tree, initialAudience: "everyone" } });
                           }}
                        >
                           Everyone
                        </DropdownMenuItem>
                        <DropdownMenuSeparator></DropdownMenuSeparator>
                        <DropdownMenuItem
                           className="flex flex-row items-center gap-2"
                           onClick={() => {
                              makeNewAudienceAndGoToIt("new audience");
                           }}
                        >
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                           </svg>
                           New audience
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </div>
            </div>
            <SpacerArrow />

            <div className="relative flex h-full  flex-col items-start justify-center">
               <div className="relative flex flex-col items-center gap-4 text-sm font-medium text-neutral-700">
                  <p className=" absolute -top-1 -translate-y-full text-sm font-semibold uppercase tracking-wide text-neutral-500">Event Trigger</p>

                  <BoxWithPlus
                     messages={messages}
                     onPlus={(messageId) => {
                        setDeployment({
                           ...deployment,
                           data_tree: {
                              ...deployment.data_tree,
                              nodes: [
                                 ...deployment.data_tree.nodes,
                                 {
                                    id: generateNanoId(),
                                    parent_id: "initialTrigger",
                                    message_id: messageId,
                                 },
                              ],
                           },
                        });
                     }}
                     canAdd={true}
                  >
                     <DropdownMenu>
                        <DropdownMenuTrigger>
                           <div className="flex w-full flex-row items-center gap-2 rounded-lg border  border-green-300 px-3 py-1  transition hover:bg-neutral-200  ">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                                 <path
                                    fillRule="evenodd"
                                    d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z"
                                    clipRule="evenodd"
                                 />
                              </svg>

                              <p className="text-left">
                                 {deployment.data_tree.initialTrigger === "event"
                                    ? events.find((event) => event.id === deployment.data_tree.initialTriggerEvent).name
                                    : "Page load"}
                              </p>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                                 <path
                                    fillRule="evenodd"
                                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                    clipRule="evenodd"
                                 />
                              </svg>
                           </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                           {events.map((event) => {
                              return (
                                 <DropdownMenuItem
                                    onClick={() => {
                                       setDeployment({
                                          ...deployment,
                                          data_tree: {
                                             ...deployment.data_tree,
                                             initialTrigger: "event",
                                             initialTriggerEvent: event.id,
                                          },
                                       });
                                    }}
                                 >
                                    {event.name}
                                 </DropdownMenuItem>
                              );
                           })}
                           <DropdownMenuSeparator> </DropdownMenuSeparator>
                           <DropdownMenuItem
                              onClick={() => {
                                 setDeployment({
                                    ...deployment,
                                    data_tree: {
                                       ...deployment.data_tree,
                                       initialTrigger: "page_load",
                                    },
                                 });
                              }}
                           >
                              Page load
                           </DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>

                     <div className="flex flex-row items-center">
                        Delay (ms)
                        <Input
                           value={deployment.data_tree.initialTriggerDelay || 0}
                           onChange={(e) => {
                              setDeployment({
                                 ...deployment,
                                 data_tree: {
                                    ...deployment.data_tree,
                                    initialTriggerDelay: parseInt(e.target.value),
                                 },
                              });
                           }}
                           className="mx-2 w-16"
                        />
                     </div>
                     {deployment.data_tree.initialTrigger !== "page_load" ? (
                        <>
                           <div className="h-px w-full bg-neutral-300"></div>
                           <Sheet>
                              <SheetTrigger className="w-min whitespace-nowrap">View code</SheetTrigger>
                              <SheetContent side={"bottom"}>
                                 <SheetHeader>
                                    <SheetTitle>Code trigger</SheetTitle>
                                    <SheetDescription>
                                       This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                                    </SheetDescription>
                                 </SheetHeader>
                                 <div className="flex w-full flex-col gap-2">
                                    {/* <p className="font-medium">Record a feature interaction</p> */}
                                    <div className="w-full overflow-scroll rounded-lg border border-neutral-300 bg-neutral-50 object-cover p-3 text-sm">
                                       <pre className="w-full">
                                          <code dangerouslySetInnerHTML={{ __html: html }} />
                                       </pre>
                                    </div>
                                 </div>
                              </SheetContent>
                           </Sheet>
                        </>
                     ) : null}
                  </BoxWithPlus>
               </div>
            </div>
            <SpacerArrow />
            <MessageLayer
               open={messageSelect}
               setOpen={setOpen}
               projectId={projectId}
               parentId={"initialTrigger"}
               deployment={deployment}
               messages={messages}
               setDeployment={setDeployment}
               setMessage={setMessage}
            ></MessageLayer>
         </div>
      </VStack>
   );
}

const SpacerArrow = () => {
   return (
      <div className="flex h-full flex-col items-center justify-center px-4">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
         </svg>
      </div>
   );
};

const MessageLayer = ({ deployment, messages, setDeployment, parentId, projectId, open, setOpen, setMessage }) => {
   if (!deployment.data_tree.nodes.filter((node) => node.parent_id === parentId).length) return;
   return (
      <>
         <div className="relative flex h-full  flex-col items-start justify-center">
            <div className="flex flex-col items-start gap-4 text-sm font-medium text-neutral-700">
               {deployment.data_tree.nodes
                  .filter((node) => node.parent_id === parentId)
                  .map((node) => {
                     const message = messages.find((message) => message.id === node.message_id);
                     // const code = `hyperuser.nextStep("${deployment.id}", "${node.id}")`; // input code
                     // const endDeploymentCode = codeToHtml(code, {
                     //    lang: "javascript",
                     //    theme: "vitesse-dark",
                     // }).then((r) => r);

                     return (
                        <BoxWithPlus onPlus={() => setOpen({ parentId: node.id })} canAdd={true}>
                           <HStack className="items-center justify-between">
                              <div className="flex h-full w-full flex-row items-center justify-between gap-2">
                                 <div>
                                    <Badge className="capitalize" variant={"outline"}>
                                       {message.poll_data.type}
                                    </Badge>
                                 </div>
                                 <div>
                                    <Sheet>
                                       <SheetTrigger asChild>
                                          <button>
                                             <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="h-6 w-6"
                                             >
                                                <path
                                                   strokeLinecap="round"
                                                   strokeLinejoin="round"
                                                   d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                                />
                                             </svg>
                                          </button>
                                       </SheetTrigger>
                                       <SheetContent>
                                          <div className="flex h-full flex-col">
                                             <Badge className="mb-1 w-min capitalize" variant={"secondary"}>
                                                {message.poll_data.type}
                                             </Badge>
                                             <SheetTitle>{message.title}</SheetTitle>
                                             <div className="mt-2 flex flex-col items-center justify-between gap-2">
                                                <CopyInput className="w-full" value={node.id} title={"step id"}></CopyInput>
                                                {message.poll_data.type === "popover" ? (
                                                   <CopyInput
                                                      className="w-full"
                                                      value={`data-hyperuser="${message.anchor}"`}
                                                      title={"anchor tag"}
                                                   ></CopyInput>
                                                ) : null}
                                             </div>
                                             <p className="mt-6 font-semibold text-neutral-700">Trigger next step</p>
                                             <Shiki code={`hyperuser.nextStep("${deployment.id}", "${node.id}")`} theme="vitesse-dark"></Shiki>
                                             <Textarea
                                                className="mt-4 w-full"
                                                value={message.markdown}
                                                onChange={(e) => {
                                                   setMessage(message.id, { ...message, markdown: e.target.value });
                                                }}
                                             ></Textarea>
                                             <div className="mt-auto">
                                                <RemoteWidget poll={message}></RemoteWidget>
                                             </div>
                                             {/* <SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription> */}
                                          </div>
                                          {/* <div className="grid gap-4 py-4">
                                          <div className="grid grid-cols-4 items-center gap-4">
                                             <Label htmlFor="name" className="text-right">
                                                Name
                                             </Label>
                                             <Input id="name" value="Pedro Duarte" className="col-span-3" />
                                          </div>
                                          <div className="grid grid-cols-4 items-center gap-4">
                                             <Label htmlFor="username" className="text-right">
                                                Username
                                             </Label>
                                             <Input id="username" value="@peduarte" className="col-span-3" />
                                          </div>
                                       </div> */}
                                          {/* <SheetFooter>
                                          <SheetClose asChild>
                                             <Button type="submit">Save changes</Button>
                                          </SheetClose>
                                       </SheetFooter> */}
                                       </SheetContent>
                                    </Sheet>

                                    <DropdownMenu>
                                       <DropdownMenuTrigger>
                                          <button className="grid place-items-center">
                                             <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="h-6 w-6"
                                             >
                                                <path
                                                   strokeLinecap="round"
                                                   strokeLinejoin="round"
                                                   d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                                                />
                                             </svg>
                                          </button>
                                       </DropdownMenuTrigger>
                                       <DropdownMenuContent>
                                          <DropdownMenuItem
                                             onClick={() => {
                                                setDeployment({
                                                   ...deployment,
                                                   data_tree: {
                                                      ...deployment.data_tree,
                                                      nodes: deployment.data_tree.nodes.filter((nodex) => nodex.id !== node.id),
                                                   },
                                                });
                                             }}
                                          >
                                             Delete
                                          </DropdownMenuItem>
                                       </DropdownMenuContent>
                                    </DropdownMenu>
                                 </div>
                              </div>
                           </HStack>

                           <div className="flex flex-row items-end justify-between gap-2">
                              <div className="flex w-full flex-col gap-2">
                                 <DropdownPill
                                    type="message"
                                    onClick={() => setOpen((open: boolean) => (open ? false : { current: node.id }))}
                                    value={message.title}
                                 />

                                 {deployment.data_tree.initialTrigger !== "page_load" ? (
                                    <div className="flex flex-row items-center text-sm">
                                       After{" "}
                                       <Input
                                          value={deployment.data_tree.nodes.find((nodex) => nodex.id === node.id).programmatic_filter}
                                          onChange={(e) => {
                                             setDeployment({
                                                ...deployment,
                                                data_tree: {
                                                   ...deployment.data_tree,
                                                   nodes: deployment.data_tree.nodes.map((nodex) => {
                                                      if (nodex.id === node.id) {
                                                         return { ...nodex, programmatic_filter: e.target.value };
                                                      }
                                                      return nodex;
                                                   }),
                                                },
                                             });
                                          }}
                                          className="mx-2 w-12"
                                       />
                                       triggers
                                    </div>
                                 ) : (
                                    <></>
                                 )}
                              </div>
                           </div>
                        </BoxWithPlus>
                     );
                  })}
            </div>
         </div>
         <div className="flex h-full flex-col items-center justify-center px-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
         </div>
         <MessageLayer
            open={open}
            setOpen={setOpen}
            parentId={deployment.data_tree.nodes.filter((node) => node.parent_id === parentId)[0].id}
            deployment={deployment}
            messages={messages}
            setDeployment={setDeployment}
            projectId={projectId}
            setMessage={setMessage}
         ></MessageLayer>
      </>
   );
};
