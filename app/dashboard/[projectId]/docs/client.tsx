"use client";

import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HStack, VStack } from "@/components/ui/stacks";

export default function Client({ deployments, projectId, events, polls }: { deployments: any[]; projectId: string; events: any[]; polls: any[] }) {
   const [framework, setFramework] = useState("react");
   const anchors = polls.map((poll) => poll.anchor).filter((anchor) => anchor);
   const router = useRouter();
   useEffect(() => {
      const highlight = async () => {
         await Prism.highlightAll(); // <--- prepare Prism
      };
      highlight(); // <--- call the async function
   }, [deployments, framework]); // <--- run when post updates

   const nextScriptString = `import Script from "next/script";
import hyperuser from "../utils/hyperuser";
   
   <Script
     src="https://static.hyperuser.dev/main.js"
     onLoad={() => {
      hyperuser.initialize({
         userId: "<user_id>",
         apiKey: "<api_key>",
         darkMode: false,
         user: {
            displayName: "<user_display_name>",
            email: "<user_email>",
            isProUser: false,
         },
      });
     }}
   />
   `;

   const reactScript = `<script src="https://static.hyperuser.dev/main.js"></script>`;
   const reactConsume = `import hyperuser from "../utils/hyperuser";

useEffect(() => {
      hyperuser.initialize({
         userId: "<user_id>",
         apiKey: "<api_key>",
         darkMode: false,
         user: {
            displayName: "<user_display_name>",
            email: "<user_email>",
            isProUser: false,
         },
      });
   }, []);`;

   return (
      <div className="h-screen overflow-y-scroll">
         <div>
            <div className=" h-full px-24 py-24">
               <p className="text-4xl font-semibold">Installation</p>

               <p className="text-neutral-600\ mt-1 text-xs">API Key: {projectId}</p>
               <div className="h-5"></div>
               <p className="text-2xl font-semibold">Helper file (important!)</p>
               <div className="h-2"></div>
               <p className="text-sm text-neutral-700">
                  Copy and paste this code to some utils file in your codebase, this exports the hyperuser object you will use. It also includes types
                  for all the events and deployments in your project. You should copy and paste this code every time you make a change in your
                  dashboard in order to keep your codebase up to date and typesafe.
               </p>
               <div className="h-5"></div>

               <CodeFile
                  language="typescript"
                  code={buildUtilsFile(
                     deployments.map((deployment) => deployment.id),
                     events.map((event) => event.unique_id),
                     anchors
                  )
                     .replace(/(\r\n|\n|\r)/gm, "")
                     .replace(/\s+/g, " ")}
                  fileName={"/utils/hyperuser.ts"}
               ></CodeFile>
               <div className="h-10"></div>

               <HStack className="justify-between p-1">
                  <VStack>
                     <p className="text-2xl font-semibold">Consuming</p>
                     <div className="h-2"></div>
                     <p className="text-sm text-neutral-700">
                        You can import the hyperuser object anywhere in your codebase from the utils file to start deployments and track events.
                     </p>
                  </VStack>
                  <Select
                     onValueChange={(value) => {
                        setFramework(value);
                     }}
                     value={framework}
                  >
                     <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="React" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectGroup>
                           <SelectItem value="nextjs">Next.js</SelectItem>
                           <SelectItem value="react">React</SelectItem>
                        </SelectGroup>
                     </SelectContent>
                  </Select>
               </HStack>
               <div className="h-5"></div>
               {framework === "nextjs" ? (
                  <CodeFile language="tsx" code={nextScriptString} fileName={"/someClientFile.tsx"}></CodeFile>
               ) : (
                  <>
                     <div className="flex flex-col gap-4">
                        <CodeFile language="tsx" code={reactScript} fileName={"/index.html"}></CodeFile>
                        <CodeFile language="tsx" code={reactConsume} fileName={"/someClientFile.tsx"}></CodeFile>
                     </div>
                  </>
               )}
            </div>
         </div>
      </div>
   );
}

const buildUtilsFile = (deploymentIds: string[], eventIds: string[], anchors: string[]) => {
   return `
   declare module "react" {
      interface HTMLAttributes<T> extends DOMAttributes<T> {
         "data-hyperuser"?:
            | ${anchors.map((anchor) => `"${anchor}"`).join(" | ")}
            ${anchors.length ? "|" : ""} null;
      }
   }
   
   export interface EmbedProps {
      disabled?: boolean;
      darkMode?: boolean;
      userId: string;
      apiKey: string;
      user: any;
   }
   const eventIds = [${eventIds.map((id) => `"${id}"`).join(", ")}] as const;
   type EventId = (typeof eventIds)[number];
   const deploymentIds = [${deploymentIds.map((id) => `"${id}"`).join(", ")}] as const;
   type DeploymentId = (typeof deploymentIds)[number];
   type Hyperuser = {
      initialize(params: EmbedProps): void;
      startDeployment(deploymentId: DeploymentId): void;
      /** * Starts a new deployment with the specified deployment ID. * @param deploymentId - The unique identifier of the deployment. */ startDeployment(
         deploymentId: DeploymentId
      ): void;
   
      trackEvent(eventId: EventId, data?: any): void;
   };
   const errorBoundary = (functionToExcecute: Function) => {
      if (typeof window !== "undefined" && (window as any).hyperuser) {
         try {
            functionToExcecute();
         } catch {
            console.warn("There was an error excuting a function");
         }
      } else {
      }
   };
   class hyperuser implements Hyperuser {
      initialize(props: EmbedProps) {
         return errorBoundary((window as any)?.hyperuser?.initialize(props));
      }
      startDeployment(deploymentId: string) {
         return errorBoundary((window as any)?.hyperuser?.startDeployment(deploymentId));
      }
      trackEvent(eventId: EventId, data?: any) {
         return errorBoundary((window as any)?.hyperuser?.trackEvent(eventId, data));
      }
      nextStep(deploymentId: DeploymentId, eventId: EventId) {
         return errorBoundary((window as any)?.hyperuser?.nextStep(deploymentId, eventId));
      }
   }
   export default new hyperuser();
   `;
};

const CodeFile = ({ code, fileName, language }) => {
   return (
      <div className=" flex flex-col">
         <div className="flex w-full flex-row items-center gap-2  rounded-t-xl border-l border-r border-t border-neutral-300 bg-white px-3 py-3  text-sm  text-neutral-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
               />
            </svg>

            <p>{fileName}</p>
         </div>
         <div className=" group relative rounded-b-xl border  border-neutral-300 bg-neutral-50 ">
            <button
               onClick={() => {
                  navigator.clipboard.writeText(code);
               }}
               className="absolute right-5 top-5 rounded-lg border border-neutral-300 bg-neutral-50 p-2 opacity-0 transition hover:bg-neutral-300 group-hover:opacity-100"
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5 text-neutral-500"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                  />
               </svg>
            </button>

            <pre
               style={{
                  backgroundColor: "transparent",
               }}
               className={`language-${language}`}
            >
               <code
                  style={{
                     fontSize: "0.8em",
                  }}
                  className="text-xs"
               >
                  {code}
               </code>
            </pre>
         </div>
      </div>
   );
};
