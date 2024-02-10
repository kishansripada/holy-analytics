"use client";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";

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

export default function Who({ poll, sampleData, setPoll }: { poll: poll; setPoll: Function }) {
   const allKeys = extractKeys(sampleData.map((user) => user));

   return (
      <div className="flex flex-row w-full gap-20">
         <div className="flex flex-col gap-5 items-start w-1/2">
            <div className="flex flex-row items-end justify-between w-full">
               <p className="tracking-tight font-medium text-2xl">Write your filter conditions</p>

               <Button
                  onClick={async () => {
                     setPoll((poll: poll) => {
                        return {
                           ...poll,
                           conditions: [...poll.conditions, { id: Math.random().toString(36).substring(7), condition_string: "" }],
                        };
                     });
                  }}
               >
                  New condition
               </Button>
            </div>
            <div className="text-xs text-neutral-600">
               <p className="text-sm text-neutral-800 mb-1">Write conditions in Javascript where the root object is "user"</p>
               {/* <p className="">user.name === "Jonathan"</p>
               <p className="">{`user.created_at < (new Date() - 7)`}</p>
               <p className="">user.selectedUses.includes("Cheer")</p> */}
            </div>
            {poll.conditions.map((condition: condition) => {
               return (
                  <div className="flex flex-row w-full items-center gap-1.5 ">
                     <Input
                        style={{
                           outlineColor: isValidJavaScriptCondition(condition.condition_string) ? "rgb(0 255 0 / 25%)" : "rgb(255 0 0 / 25%)",
                        }}
                        className="w-full"
                        onChange={(e) => {
                           //  console.log(e);
                           setPoll((poll) => {
                              return {
                                 ...poll,
                                 conditions: poll.conditions.map((conditionx) => {
                                    if (conditionx.id === condition.id) {
                                       return { ...conditionx, condition_string: e.target.value };
                                    }
                                    return conditionx;
                                 }),
                              };
                           });
                        }}
                        value={condition.condition_string}
                        type="title"
                        id="condition"
                        placeholder={`e.g. user.selectedUses.includes("Cheer"); user.name === "Jonathan"; user.created_at < (new Date() - 7)"`}
                     />
                     <Button
                        onClick={() => {
                           setPoll((poll: poll) => {
                              return {
                                 ...poll,
                                 conditions: poll.conditions.filter((conditionx) => {
                                    return conditionx.id !== condition.id;
                                 }),
                              };
                           });
                        }}
                        variant={"destructive"}
                     >
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth={1.5}
                           stroke="currentColor"
                           className="w-6 h-6"
                        >
                           <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                     </Button>
                  </div>
               );
            })}
         </div>
         <div className="flex flex-col gap-5 items-start w-1/2 overflow-hidden">
            <div>
               <div className="flex flex-row items-end justify-between w-full">
                  <p className="tracking-tight font-medium text-2xl">Live testing against sample users</p>
               </div>
               <div className="text-xs text-neutral-600 mt-1">
                  <p className="text-sm text-neutral-800 mb-1">
                     We collect minimum of 10 and up to 100 sample users so that you have some test data to run conditions against
                  </p>
               </div>
            </div>
            <div className="overflow-x-scroll w-full">
               {" "}
               <table className="table-auto border-collapse w-full  ">
                  <thead>
                     <tr className="text-gray-600  text-sm leading-normal">
                        {allKeys.map((key) => (
                           <th key={key} className="py-2 px-4">
                              {key}
                           </th>
                        ))}
                     </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                     {sampleData.map((user) => {
                        let passesAllConditions = false;
                        //   console.log();
                        try {
                           const filterFns = poll.conditions.map((cond) => {
                              return new Function("user", `return ${cond.condition_string}`);
                           });

                           passesAllConditions = filterFns.every((fn) => {
                              return fn(user.user);
                           });
                        } catch {
                           console.log("error in condition");
                        }
                        return (
                           <>
                              {allKeys.map((key) => {
                                 return (
                                    <td
                                       style={{
                                          backgroundColor: passesAllConditions ? "rgb(0 255 0 / 25%)" : "rgb(255 0 0 / 25%)",
                                       }}
                                       className="border-gray-200 border px-4 py-2"
                                    >
                                       {JSON.stringify(user.user[key]) || ""}
                                    </td>
                                 );
                              })}
                           </>
                        );
                     })}
                  </tbody>
               </table>
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
