"use client";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { poll } from "@/utils/types";

export default function Who({ poll, sampleData, setPoll }: { poll: poll; setPoll: Function; sampleData: any }) {
   const [testIds, setTestIds] = useState("");
   const allKeys = extractKeys(sampleData.map((user) => user));
   const supabase = createClient();
   console.log({ poll });
   console.log({ allKeys });
   return (
      <div className="flex flex-row w-full justify-between h-full  gap-20 ">
         <div className="flex flex-col gap-3 items-start w-1/2">
            <div className="flex flex-row items-end justify-between w-full">
               <p className="tracking-tight font-medium text-2xl">Write your filter conditions</p>

               <Button
                  onClick={async () => {
                     setPoll((poll: poll) => {
                        return {
                           ...poll,
                           conditions: [...(poll.conditions || []), { id: Math.random().toString(36).substring(7), condition_string: "" }],
                        };
                     });
                  }}
               >
                  New condition
               </Button>
            </div>

            <div className="text-xs text-neutral-600">
               <p className="text-sm text-neutral-600 mb-1">Write conditions in Javascript where the root object is "user"</p>
               {/* <p className="">user.name === "Jonathan"</p>
               <p className="">{`user.created_at < (new Date() - 7)`}</p>
               <p className="">user.selectedUses.includes("Cheer")</p> */}
            </div>
            {poll.conditions.map((condition) => {
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
                        placeholder={`e.g. user.selectedUses.includes("Cheer")`}
                     />
                     <Button
                        className="w-12 p-0"
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
         </div>
         <div className="flex flex-col gap-5 items-start w-1/2 overflow-hidden">
            <div>
               <div className="flex flex-row items-end justify-between w-full py-2">
                  <p className="tracking-tight font-medium text-2xl">Test against sample users</p>

                  <Button
                     onClick={async () => {
                        const { data, error } = await supabase.from("sample_data").delete().eq("app_id", poll.app_id);
                        if (!error) {
                           toast("Removed all sample users");
                        }
                     }}
                     variant={"outline"}
                  >
                     Clear sample users
                  </Button>
               </div>
               <div className="text-xs text-neutral-600 mt-1">
                  <p className="text-sm text-neutral-600 mb-1">
                     We collect minimum of 10 and up to 50 sample users so that you have some test data to run conditions against
                  </p>
                  <div className="flex flex-row justify-between">
                     <p className="text-sm text-neutral-600 mb-1">Rows highlighted in green pass all conditions</p>
                     {/* <p className="text-sm text-neutral-600 mb-1">
                        {" "}
                        <span className="font-bold">42%</span>
                        {" of users pass"}
                     </p> */}
                  </div>
               </div>
            </div>
            <div className="overflow-scroll w-full max-h-[450px] border-2 border-neutral-300 text-xs rounded-md">
               {sampleData.length ? (
                  <div className="flex flex-row   ">
                     {Object.keys(sampleData[0].user).map((key) => (
                        <div className="flex flex-col min-w-[200px]">
                           <div className=" border-b border-r h-[40px] min-h-[40px] flex flex-col justify-center font-semibold items-center">
                              {key}
                           </div>
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
                              const value = user.user[key];

                              return (
                                 <div
                                    style={{
                                       backgroundColor: passesAllConditions ? "rgb(0 255 0 / 25%)" : "transparent",
                                    }}
                                    className=" border-b border-r h-[40px] min-h-[40px] flex flex-col justify-center"
                                 >
                                    <div>{typeof value === "string" ? <span>{value}</span> : <span>{JSON.stringify(value)}</span>}</div>
                                 </div>
                              );
                           })}
                        </div>
                     ))}
                  </div>
               ) : (
                  <div className="flex flex-row justify-center">
                     <p className="text-sm text-neutral-600 ">No sample users yet</p>
                  </div>
               )}
               {/* <table className="table-auto border-collapse w-full  ">
                  <thead>
                     <tr className="text-gray-600  text-sm leading-normal">
                        {allKeys.map((key) => (
                           <th key={key} className="py-2 px-4">
                              {key}
                           </th>
                        ))}
                     </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light flex flex-col">
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
                              <div className="flex flex-row">
                                 {allKeys.map((key) => {
                                    return (
                                       <td
                                          style={{
                                             backgroundColor: passesAllConditions ? "rgb(0 255 0 / 25%)" : "rgb(255 0 0 / 25%)",
                                          }}
                                          className="border-gray-200 border px-4 py-2 "
                                       >
                                          {JSON.stringify(user.user[key]) || ""}
                                       </td>
                                    );
                                 })}
                              </div>
                           </>
                        );
                     })}
                  </tbody>
               </table> */}
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
