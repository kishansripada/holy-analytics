"use client";
import { createClient } from "@/utils/supabase/client";
import { ReactComponentElement, ReactHTMLElement, useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
// import { useUploadToSupabase } from "@/utils/supabase/hooks";
import debounce from "lodash.debounce";
import { poll } from "@/utils/types";
import { VStack } from "@/components/ui/stacks";
import { UploadInput } from "@/components/upload-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import "prismjs/themes/prism-tomorrow.css";
import Prism from "prismjs";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function Client({
   deployment: initialDeployment,
   projectId,
   audiences,
   messages,
}: {
   deployment: any;
   projectId: string;
   audiences: any[];
   messages: any[];
}) {
   const code = `function useCoolFeature() {
      window.holyTrigger("DEPLOYMENT_ID"); // Trigger a feature interaction using the tip ID
  }`;
   const html = Prism.highlight(code, Prism.languages.javascript, "javascript");

   const [deployment, setDeployment] = useState(initialDeployment);
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
                     id: "yolo",
                  },
               ],
               app_id: projectId,
            },
         ])
         .select("*")
         .single();

      router.push(`/dashboard/${projectId}/audiences/` + data.id);
   };
   const onUpdate = async (name: string) => {
      await supabase.from("audiences").update({ name }).eq("id", deployment.id);
   };

   useEffect(() => {
      const highlight = async () => {
         await Prism.highlightAll(); // <--- prepare Prism
      };
      highlight(); // <--- call the async function
   }, [deployment]); // <--- run when post updates

   return (
      <VStack className="h-full w-full overflow-hidden px-16 py-12">
         <div className="flex w-full flex-row items-center justify-between">
            <div>
               <p className="text-sm font-semibold uppercase tracking-wide text-neutral-500">Deployment</p>
               <UploadInput className="  min-w-min text-2xl font-medium tracking-tight" value={deployment.name || "my first "} onUpdate={onUpdate} />
            </div>

            <div
               onClick={async () => {
                  await supabase.from("deployments").update({ is_live: !deployment.is_live }).eq("id", deployment.id);
               }}
            >
               {deployment.is_live ? <Button variant={"destructive"}>Deactivate</Button> : <Button>Go Live</Button>}
            </div>
         </div>

         <div className="flex h-full flex-row py-12">
            <div className="relative flex h-full flex-col  items-start justify-center  px-3">
               <div className="flex flex-col items-center gap-4 text-sm font-medium text-neutral-700">
                  <p className=" text-sm font-semibold uppercase tracking-wide text-neutral-500">Audience</p>
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
            <div className="flex h-full flex-col items-center justify-center px-6">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
               </svg>
            </div>

            <div className="relative flex h-full  flex-col items-start justify-center  px-3">
               <div className="flex flex-col items-center gap-4 text-sm font-medium text-neutral-700">
                  <p className=" text-sm font-semibold uppercase tracking-wide text-neutral-500">Trigger</p>

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
                                    id: "newTrigger",

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
                           <div className="flex flex-row items-center gap-2 rounded-full border  border-green-300 px-3 py-1  transition hover:bg-neutral-200  ">
                              {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                              <path
                                 fillRule="evenodd"
                                 d="M6.28 5.22a.75.75 0 0 1 0 1.06L2.56 10l3.72 3.72a.75.75 0 0 1-1.06 1.06L.97 10.53a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Zm7.44 0a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L17.44 10l-3.72-3.72a.75.75 0 0 1 0-1.06ZM11.377 2.011a.75.75 0 0 1 .612.867l-2.5 14.5a.75.75 0 0 1-1.478-.255l2.5-14.5a.75.75 0 0 1 .866-.612Z"
                                 clipRule="evenodd"
                              />
                           </svg> */}
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                                 <path
                                    fillRule="evenodd"
                                    d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z"
                                    clipRule="evenodd"
                                 />
                              </svg>

                              <p className="whitespace-nowrap">
                                 {deployment.data_tree.initialTrigger === "programmatic" ? "Code trigger" : "Page load"}
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
                           <DropdownMenuItem
                              onClick={() => {
                                 setDeployment((deployment) => {
                                    return { ...deployment, data_tree: { ...deployment.data_tree, initialTrigger: "programmatic" } };
                                 });
                              }}
                           >
                              Code trigger
                           </DropdownMenuItem>
                           <DropdownMenuItem
                              onClick={() => {
                                 setDeployment((deployment) => {
                                    return { ...deployment, data_tree: { ...deployment.data_tree, initialTrigger: "page_load" } };
                                 });
                              }}
                           >
                              On page load
                           </DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                     <Sheet>
                        <SheetTrigger className="w-min whitespace-nowrap">View code</SheetTrigger>
                        <SheetContent>
                           <SheetHeader>
                              <SheetTitle>Code trigger</SheetTitle>
                              <SheetDescription>
                                 This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                              </SheetDescription>
                           </SheetHeader>
                           <div className="flex w-full flex-col gap-2">
                              <p className="font-medium">Record a feature interaction</p>
                              <div className="w-full overflow-scroll rounded-lg border border-neutral-300 bg-neutral-50 object-cover p-3 text-sm">
                                 <pre className="w-full">
                                    <code dangerouslySetInnerHTML={{ __html: html }} />
                                 </pre>
                              </div>
                           </div>
                        </SheetContent>
                     </Sheet>
                  </BoxWithPlus>
               </div>
            </div>
            <div className="flex h-full flex-col items-center justify-center px-6">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
               </svg>
            </div>
            <div className="relative flex h-full  flex-col items-start justify-center">
               <div className="flex flex-col items-start gap-4 text-sm font-medium text-neutral-700">
                  {deployment.data_tree.nodes
                     .filter((node) => node.parent_id === "initialTrigger")
                     .map((node) => {
                        const message = messages.find((message) => message.id === node.message_id);

                        return (
                           <BoxWithPlus messages={messages} canAdd={false}>
                              <DropdownPill
                                 type="message"
                                 dropdownContent={
                                    <>
                                       {messages.map((message) => {
                                          return (
                                             <DropdownMenuItem
                                                onClick={() => {
                                                   setDeployment((deployment) => {
                                                      return {
                                                         ...deployment,
                                                         data_tree: {
                                                            ...deployment.data_tree,
                                                            nodes: deployment.data_tree.nodes.map((nodex) => {
                                                               if (nodex.id === node.id) {
                                                                  return { ...nodex, message_id: message.id };
                                                               }
                                                               return nodex;
                                                            }),
                                                         },
                                                      };
                                                   });
                                                }}
                                             >
                                                {message.title}
                                             </DropdownMenuItem>
                                          );
                                       })}
                                    </>
                                 }
                                 value={message.title}
                                 valueIcon={
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                                       <path
                                          fillRule="evenodd"
                                          d="M3.43 2.524A41.29 41.29 0 0 1 10 2c2.236 0 4.43.18 6.57.524 1.437.231 2.43 1.49 2.43 2.902v5.148c0 1.413-.993 2.67-2.43 2.902a41.102 41.102 0 0 1-3.55.414c-.28.02-.521.18-.643.413l-1.712 3.293a.75.75 0 0 1-1.33 0l-1.713-3.293a.783.783 0 0 0-.642-.413 41.108 41.108 0 0 1-3.55-.414C1.993 13.245 1 11.986 1 10.574V5.426c0-1.413.993-2.67 2.43-2.902Z"
                                          clipRule="evenodd"
                                       />
                                    </svg>
                                 }
                              ></DropdownPill>

                              {deployment.data_tree.initialTrigger === "programmatic" ? (
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
                                    />{" "}
                                    triggers
                                 </div>
                              ) : (
                                 <></>
                              )}
                           </BoxWithPlus>
                        );
                     })}
               </div>
            </div>
         </div>
      </VStack>
   );
}

const BoxWithPlus = ({ children, onPlus, canAdd, messages }) => {
   return (
      <div className="relative flex flex-col justify-center gap-3 rounded-xl border border-neutral-300 px-5 py-3  ">
         {canAdd && (
            <DropdownMenu>
               <DropdownMenuTrigger>
                  <button className=" absolute right-0 top-1/2 grid h-7 w-7 -translate-y-1/2 translate-x-1/2  place-items-center rounded-full border border-neutral-300 bg-white transition hover:bg-neutral-100">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                        <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                     </svg>
                  </button>
               </DropdownMenuTrigger>
               <DropdownMenuContent data-side="right" className=" absolute top-10 w-96">
                  <DropdownMenuLabel>Choose a message </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {messages.map((message) => {
                     return (
                        <DropdownMenuItem
                           onClick={() => {
                              onPlus(message.id);
                           }}
                        >
                           {message.title}
                        </DropdownMenuItem>
                     );
                  })}
               </DropdownMenuContent>
            </DropdownMenu>
         )}
         {children}
      </div>
   );
};

const DropdownPill = ({
   value,
   valueIcon,
   type,
   dropdownContent,
}: {
   value: string;
   type: "audience" | "trigger" | "message";
   valueIcon: ReactHTMLElement;
   dropdownContent: ReactHTMLElement;
}) => {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger>
            <div
               className={`flex flex-row items-center gap-2 rounded-full border ${type === "message" ? "border-pink-300" : "border-blue-300"}  px-3 py-1  transition hover:bg-neutral-200  `}
            >
               {valueIcon}

               <p className="whitespace-nowrap">{value}</p>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path
                     fillRule="evenodd"
                     d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                     clipRule="evenodd"
                  />
               </svg>
            </div>
         </DropdownMenuTrigger>
         <DropdownMenuContent>{dropdownContent}</DropdownMenuContent>
      </DropdownMenu>
   );
};
