"use client";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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

export default function Preview({ poll, sampleData, setPoll }: { poll: poll; setPoll: Function }) {
   const allKeys = extractKeys(sampleData.map((user) => user));
   const supabase = createClient();
   console.log({ poll });
   console.log({ allKeys });
   return (
      <div className="flex flex-row w-full justify-between h-full  gap-20 ">
         <div className="flex flex-col gap-5 items-start w-1/2">
            <div className="w-full ">
               <Label className="text-2xl" htmlFor="title">
                  Test User IDs
               </Label>
               <p className="text-sm text-neutral-600">
                  A comma separated list of user ids who will always receive the notification no matter what, even if the poll isn't live
               </p>
               <Input
                  value={poll.test_ids}
                  onChange={(e) => {
                     setPoll({ ...poll, test_ids: e.target.value });
                  }}
                  style={
                     {
                        // outlineColor: isValidJavaScriptCondition(condition.condition_string) ? "rgb(0 255 0 / 25%)" : "rgb(255 0 0 / 25%)",
                     }
                  }
                  className="w-full mt-2"
                  // onChange={(e) => {
                  //    //  console.log(e);
                  //    setPoll((poll) => {
                  //       return {
                  //          ...poll,
                  //          conditions: poll.conditions.map((conditionx) => {
                  //             if (conditionx.id === condition.id) {
                  //                return { ...conditionx, condition_string: e.target.value };
                  //             }
                  //             return conditionx;
                  //          }),
                  //       };
                  //    });
                  // }}
                  // value={condition.condition_string}
                  type="title"
                  id="condition"
                  placeholder={`7599296f-6f69-4673-8b16-cfca049582fb, e778f4d7-3830-46ca-9fde-dde57fa1d087`}
               />
            </div>
         </div>
      </div>
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
