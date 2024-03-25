"use client";

import "prismjs/themes/prism-tomorrow.css";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
   Command,
   CommandDialog,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
   CommandSeparator,
   CommandShortcut,
} from "@/components/ui/command";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ReactComponentElement, ReactHTMLElement, useCallback, useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Prism from "prismjs";
import { Tabs } from "@/components/ui/tabs";
import { UploadInput } from "@/components/upload-input";
import { HStack, VStack } from "@/components/ui/stacks";
import { createClient } from "@/utils/supabase/client";
// import { useUploadToSupabase } from "@/utils/supabase/hooks";
import debounce from "lodash.debounce";
import { poll } from "@/utils/types";
import { useRouter } from "next/navigation";
import { generateNanoId } from "@/utils/nanoId";
import { DropdownPill } from "./_components/DropdownPill";
import { Badge } from "@/components/ui/badge";
import { Anchor } from "lucide-react";

export default function Client({
   deployment: initialDeployment,
   projectId,
   audiences,
   messages,
   events,
}: {
   deployment: any;
   projectId: string;
   audiences: any[];
   messages: any[];
   events: any[];
}) {
   const [messageSelect, setOpen] = useState<{ parentId?: string; current?: string } | false>(false);

   const [deployment, setDeployment] = useState(initialDeployment);
   const deploymentSaved = useUploadToSupabase("data_tree", deployment.data_tree, deployment.id, true);

   const initialTriggerEvent = events.find((event) => event.id === deployment.data_tree.initialTriggerEvent);

   const startDeploymentCode = `// Used to start deployment: ${deployment.slug}
hyperuser.trackEvent("${initialTriggerEvent?.unique_id}")`;

   const endDeploymentCode = `function stopDeployment() {
   window.endHyperDeployment("${deployment.id}"); // Trigger a feature interaction using the tip ID
}`;
   const html = Prism.highlight(startDeploymentCode, Prism.languages.javascript, "javascript");
   const html2 = Prism.highlight(endDeploymentCode, Prism.languages.javascript, "javascript");

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
      [deployment.id]
   );

   useEffect(() => {
      const highlight = async () => {
         await Prism.highlightAll(); // <--- prepare Prism
      };
      highlight(); // <--- call the async function
   }, [deployment]); // <--- run when post updates

   return (
      <VStack className="h-full w-full overflow-hidden px-16 py-12">
         <CommandDialog open={messageSelect} onOpenChange={setOpen}>
            <CommandInput placeholder="Search for a message" />
            <CommandList>
               <CommandEmpty>No results found.</CommandEmpty>
               <CommandGroup heading={"Recent messages"}>
                  {messages.map((message) => {
                     return (
                        <CommandItem
                           value={message.id}
                           onSelect={(value) => {
                              if (messageSelect.current) {
                                 setDeployment({
                                    ...deployment,
                                    data_tree: {
                                       ...deployment.data_tree,
                                       nodes: deployment.data_tree.nodes.map((node) => {
                                          if (node.id === messageSelect) {
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
                           }}
                        >
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
                        setDeployment((deployment) => {
                           return { ...deployment, is_live: !deployment.is_live };
                        });
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
                                          setDeployment((deployment) => {
                                             return { ...deployment, data_tree: { ...deployment.data_tree, initialAudience: audience.id } };
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
                              setDeployment((deployment) => {
                                 return { ...deployment, data_tree: { ...deployment.data_tree, initialAudience: "everyone" } };
                              });
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
                                       setDeployment((deployment) => {
                                          return {
                                             ...deployment,
                                             data_tree: {
                                                ...deployment.data_tree,
                                                initialTrigger: "event",
                                                initialTriggerEvent: event.id,
                                             },
                                          };
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
                                 setDeployment((deployment) => {
                                    return {
                                       ...deployment,
                                       data_tree: {
                                          ...deployment.data_tree,
                                          initialTrigger: "page_load",
                                       },
                                    };
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
                              setDeployment((deployment) => {
                                 return {
                                    ...deployment,
                                    data_tree: {
                                       ...deployment.data_tree,
                                       initialTriggerDelay: parseInt(e.target.value),
                                    },
                                 };
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
            ></MessageLayer>
         </div>
      </VStack>
   );
}

const BoxWithPlus = ({ children, onPlus, canAdd }) => {
   return (
      <div className="relative flex min-w-[320px] max-w-xs flex-col justify-center gap-3 rounded-xl border border-neutral-300 px-5 py-3  ">
         {canAdd && (
            <button
               onClick={onPlus}
               className=" absolute right-0 top-1/2 grid h-7 w-7 -translate-y-1/2 translate-x-1/2  place-items-center rounded-full border border-neutral-300 bg-white transition hover:bg-neutral-100"
            >
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
               </svg>
            </button>
         )}
         {children}
      </div>
   );
};

const SpacerArrow = () => {
   return (
      <div className="flex h-full flex-col items-center justify-center px-4">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
         </svg>
      </div>
   );
};

const MessageLayer = ({ deployment, messages, setDeployment, parentId, projectId, open, setOpen }) => {
   if (!deployment.data_tree.nodes.filter((node) => node.parent_id === parentId).length) return;
   return (
      <>
         <div className="relative flex h-full  flex-col items-start justify-center">
            <div className="flex flex-col items-start gap-4 text-sm font-medium text-neutral-700">
               {deployment.data_tree.nodes
                  .filter((node) => node.parent_id === parentId)
                  .map((node) => {
                     const message = messages.find((message) => message.id === node.message_id);

                     return (
                        <BoxWithPlus onPlus={() => setOpen({ parentId: node.id })} canAdd={true}>
                           <HStack className="items-center justify-between">
                              <TooltipProvider>
                                 <Tooltip>
                                    <TooltipTrigger asChild>
                                       <Anchor className="h-4 w-4" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                       <p>{`data-hyperuser="${message.anchor}"`}</p>
                                    </TooltipContent>
                                 </Tooltip>
                              </TooltipProvider>

                              {/* <p className="">{message.anchor}</p> */}

                              <div className="flex w-32  flex-shrink flex-col items-start p-1">
                                 <p className="text-nuetral-700 text-xs font-medium tracking-wide">STEP ID</p>
                                 <div
                                    className={
                                       "flex w-full  items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2"
                                    }
                                 >
                                    <button
                                       onClick={() => {
                                          navigator.clipboard.writeText(node.id);
                                       }}
                                       className="rounded-md p-1 transition hover:bg-neutral-100"
                                    >
                                       <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={1.5}
                                          stroke="currentColor"
                                          className="h-4 w-4"
                                       >
                                          <path
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                                          />
                                       </svg>
                                    </button>

                                    <input
                                       value={node.id}
                                       //  {...props}

                                       //  ref={ref}
                                       className="w-full px-2 py-1 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                    />
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
                                             setDeployment((deployment) => {
                                                return {
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
                                                };
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

                              <div className="flex h-full flex-col justify-between">
                                 <Link href={`/dashboard/${projectId}/poll/${message.id}`}>
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
                                 </Link>

                                 <DropdownMenu>
                                    <DropdownMenuTrigger>
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
                                                d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                                             />
                                          </svg>
                                       </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                       <DropdownMenuItem
                                          onClick={() => {
                                             setDeployment((deployment) => {
                                                return {
                                                   ...deployment,
                                                   data_tree: {
                                                      ...deployment.data_tree,
                                                      nodes: deployment.data_tree.nodes.filter((nodex) => nodex.id !== node.id),
                                                   },
                                                };
                                             });
                                          }}
                                       >
                                          Delete
                                       </DropdownMenuItem>
                                    </DropdownMenuContent>
                                 </DropdownMenu>
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
         ></MessageLayer>
      </>
   );
};

const useUploadToSupabase = (dataKey: string, dataValue: any, danceId: string, enabled: boolean) => {
   const supabase = createClient();
   const [saved, setSaved] = useState(true);
   // If viewOnlyInitial is true, immediately exit from the hook

   const upload = useCallback(
      debounce(async (dataValue) => {
         console.log(`uploading ${dataKey}`);
         const { data, error } = await supabase
            .from("deployments")
            .update({ [dataKey]: dataValue })
            .eq("id", danceId);
         console.log({ data });
         console.log({ error });
         setSaved(true);
      }, 2000),
      [danceId]
   );

   useEffect(() => {
      if (!enabled) return;

      setSaved(false);
      upload(dataValue);
   }, [dataValue]);
   return saved;
};
