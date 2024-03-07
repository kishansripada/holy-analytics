"use client";
import { Input } from "@/components/ui/input";
import { HStack, VStack } from "@/components/ui/stacks";
import { Switch } from "@/components/ui/switch";
import { poll } from "@/utils/types";
import dynamic from "next/dynamic";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

const RemoteWidget = dynamic(() => import("./remote-widget"), {
   ssr: false,
});
export default function Triggers({ poll, setPoll }: { poll: poll; setPoll: Function }) {
   const code = `function useCoolFeature() {
    window.holyTrigger("${poll.id}"); // Trigger a feature interaction using the tip ID
}`;
   const html = Prism.highlight(code, Prism.languages.javascript, "javascript");

   return (
      <HStack className=" h-full w-full justify-between gap-20 ">
         <VStack className=" w-2/3 items-start gap-6 ">
            <VStack className=" w-full gap-1 rounded-xl border border-neutral-300 p-4">
               <HStack className="w-full items-center justify-between">
                  <p className=" font-medium">Show on page load</p>
                  <Switch></Switch>
               </HStack>
               <p className="text-sm text-neutral-700">
                  We'll make sure not to show any user more than once. Useful for feature announcements etc...
               </p>
            </VStack>
            <div>
               <p className="text-xl font-semibold text-neutral-900">Code trigger</p>
               <p className="text-sm text-neutral-700">
                  Consider delaying tips (e.g. for a certain feature) until the user has gotten a chance to try it a few times, like after 2-3
                  interactions. Remind longtime users of unused features, maybe after 200 interactions.
               </p>
            </div>
            <div className="flex w-full flex-col gap-2">
               <p className="font-medium">Record a feature interaction</p>
               <div className="w-full overflow-scroll rounded-lg border border-neutral-300 bg-neutral-50 object-cover p-3 text-sm">
                  <pre className="w-full">
                     <code dangerouslySetInnerHTML={{ __html: html }} />
                  </pre>
               </div>
            </div>
            <div className="flex flex-col gap-2 py-1 pr-1">
               <p className="font-medium">Trigger schedule</p>
               <p className="text-sm text-neutral-700">
                  Use an trigger schedule of (e.g. 10, 50, 200) to trigger tips - the tip will be shown after 10, 50, and 200 interactions.
               </p>
               <Input
                  onChange={(e) => {
                     //  console.log(e);
                     setPoll({ ...poll, trigger_schedule: e.target.value });
                  }}
                  value={poll.trigger_schedule}
                  placeholder="10, 50, 200"
               />
            </div>
         </VStack>
      </HStack>
   );
}
