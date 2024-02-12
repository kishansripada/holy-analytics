"use client";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MCQ } from "@/Widget/Widget";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import What from "../_components/what";
import Who from "../_components/who";
import { AppWrapper } from "@/components/ui/app-wrapper";
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

export default function Client({ poll: initialPoll, sampleData }: { poll: poll }) {
   const [poll, setPoll] = useState(initialPoll);

   const supabase = createClient();

   const allKeys = extractKeys(sampleData.map((user) => user));

   return (
      // <AppWrapper>
      <div className="flex flex-col px-16 py-16 w-full overflow-hidden">
         <button
            onClick={async () => {
               const { data, error } = await supabase
                  .from("polls")
                  .update({ poll_data: poll.poll_data, conditions: poll.conditions })
                  .eq("id", poll.id);
            }}
         >
            push data
         </button>
         <Tabs defaultValue="what" className="w-full ">
            {/* <div className="flex flex-row items-center justify-center">
              
            </div> */}
            <div className="mb-10 ">
               <div className="flex flex-row items-end justify-between">
                  <div>
                     <p className="tracking-wider font-semibold text-neutral-600">FORMI</p>
                     <p className="tracking-tight font-medium text-4xl">{poll.title}</p>
                  </div>
                  <TabsList>
                     <TabsTrigger value="what">Design it</TabsTrigger>
                     <TabsTrigger value="who">Choose who sees it</TabsTrigger>
                  </TabsList>
                  <div className="flex flex-row gap-5 items-end">
                     {/* <div className="flex flex-col items-end">
                     <p className="text-3xl font-medium text-neutral-900">34</p>
                     <p className="text-sm text-neutral-600 ">responses</p>
                  </div> */}
                     {poll.active ? (
                        <Button
                           onClick={async () => {
                              const { data, error } = await supabase.from("polls").update({ active: false }).eq("id", poll.id);
                              if (!error) {
                                 setPoll({ ...poll, active: false });
                              }
                           }}
                           variant={"destructive"}
                        >
                           Stop collecting responses
                        </Button>
                     ) : (
                        <Button
                           onClick={async () => {
                              const { data, error } = await supabase.from("polls").update({ active: true }).eq("id", poll.id);
                              if (!error) {
                                 setPoll({ ...poll, active: true });
                              }
                           }}
                        >
                           Go live
                        </Button>
                     )}
                  </div>
               </div>
            </div>
            <TabsContent value="what">
               <What setPoll={setPoll} poll={poll}></What>
            </TabsContent>
            <TabsContent value="who">
               <Who poll={poll} setPoll={setPoll} sampleData={sampleData}></Who>
            </TabsContent>
         </Tabs>
      </div>
      // </AppWrapper>
   );
}

function extractKeys(data) {
   const keys = new Set();
   data.forEach((obj) => {
      Object.keys(obj).forEach((key) => {
         keys.add(key);
         if (typeof obj[key] === "object") {
            Object.keys(obj[key]).forEach((innerKey) => {
               keys.add(innerKey);
            });
         }
      });
   });
   return Array.from(keys);
}

function isValidJavaScriptCondition(condition: string): boolean {
   try {
      // Creating a new function with 'if' and the provided condition.
      // If there's a syntax error, it will throw an exception.
      new Function(`if (${condition}) return true;`);
      return true;
   } catch (error) {
      // If there's a syntax error, return false
      return false;
   }
}
