"use client";
import { createClient } from "@/utils/supabase/client";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
// import { useUploadToSupabase } from "@/utils/supabase/hooks";
import debounce from "lodash.debounce";
import { poll } from "@/utils/types";
import { VStack } from "@/components/ui/stacks";
import { UploadInput } from "@/components/upload-input";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import "prismjs/themes/prism.css";
import Prism from "prismjs";

export default function Client({ audience: initialAudience, projectId, sampleUsers }: { audience: any; projectId: string; sampleUsers: any }) {
   const [audience, setAudience] = useState(initialAudience);
   const supabase = createClient();

   const audienceSaved = useUploadToSupabase("audiences", "conditions", audience.conditions, audience.id, true);

   const onUpdate = async (name: string) => {
      await supabase.from("audiences").update({ name }).eq("id", audience.id);
   };

   useEffect(() => {
      const highlight = async () => {
         await Prism.highlightAll(); // <--- prepare Prism
      };
      highlight(); // <--- call the async function
   }, [audience]); // <--- run when post updates

   return (
      <VStack className="h-full w-full overflow-hidden px-16 py-12">
         <Tabs defaultValue="what" className="flex h-full w-full flex-col overflow-hidden ">
            <VStack className="max-h-full gap-10">
               <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-neutral-500">Audience</p>
                  <UploadInput className="  min-w-min text-2xl font-medium tracking-tight" value={audience.name} onUpdate={onUpdate} />
               </div>
               <div className="flex h-full w-full flex-row justify-between  gap-20 ">
                  <div className="flex w-1/2 flex-col items-start gap-3 p-1">
                     <div className="flex w-full flex-row items-end justify-between">
                        <p className="text-2xl font-medium tracking-tight">Filters</p>

                        <Button
                           onClick={async () => {
                              setAudience((audience: poll) => {
                                 return {
                                    ...audience,
                                    conditions: [
                                       ...(audience.conditions || []),
                                       { id: Math.random().toString(36).substring(7), condition_string: "user" },
                                    ],
                                 };
                              });
                           }}
                        >
                           New condition
                        </Button>
                     </div>
                     {/* <pre>
                        <code className="language-javascript">
                           const userArray = [ "London", "Sydney", "Madrid", "Boston", "Verona", "Rome", "Athens", "Porto", "Meteora", ]{" "}
                        </code>
                     </pre> */}

                     <div className=" text-xs text-neutral-600">
                        <a href="https://holy-user-docs.super.site/" className="mb-1 text-sm text-neutral-600">
                           Write conditions in Javascript where the root object is "user"
                        </a>

                        {/* <p className="">user.name === "Jonathan"</p>
               <p className="">{`user.created_at < (new Date() - 7)`}</p>
               <p className="">user.selectedUses.includes("Cheer")</p> */}
                     </div>
                     <a href="https://holy-user-docs.super.site/" className="mb-1 text-sm text-neutral-600">
                        View docs
                     </a>
                     {audience.conditions.map((condition) => {
                        return (
                           <div className="relative flex w-full flex-row items-center gap-1.5 overflow-hidden px-1 py-1">
                              <pre
                                 style={{
                                    paddingLeft: 17,
                                    // paddingRight: 12,
                                    backgroundColor: "transparent",
                                    margin: 0,
                                    fontFamily: "'__GeistSans_ac79ff', '__GeistSans_Fallback_ac79ff'",
                                 }}
                                 className="language-javascript pointer-events-none absolute left-0 top-0 flex  h-full w-full flex-col justify-center"
                              >
                                 <code
                                    style={{
                                       fontSize: 14,
                                       lineHeight: "1rem",
                                       padding: 0,
                                       margin: 0,
                                       backgroundColor: "transparent",
                                       fontFamily: "'__GeistSans_ac79ff', '__GeistSans_Fallback_ac79ff'",
                                    }}
                                    className="  text-xs "
                                 >
                                    {condition.condition_string}
                                 </code>
                              </pre>
                              <Input
                                 style={{
                                    outlineColor: isValidJavaScriptCondition(condition.condition_string)
                                       ? "rgb(0 255 0 / 25%)"
                                       : "rgb(255 0 0 / 25%)",
                                 }}
                                 className=" w-full overflow-scroll text-white caret-black"
                                 onChange={(e) => {
                                    //  console.log(e);
                                    setAudience((audience) => {
                                       return {
                                          ...audience,
                                          conditions: audience.conditions.map((conditionx) => {
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
                                    setAudience((audience: any) => {
                                       return {
                                          ...audience,
                                          conditions: audience.conditions.filter((conditionx) => {
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
                                    className="h-5 w-5 text-neutral-600"
                                 >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                 </svg>
                              </Button>
                           </div>
                        );
                     })}
                  </div>
                  <div className="flex w-1/2 flex-col items-start gap-5 overflow-hidden">
                     <div className="w-full">
                        <div className="flex w-full flex-row items-end justify-between py-2">
                           <p className="text-2xl font-medium tracking-tight">Check against sample</p>
                        </div>
                        <div className="mt-1 text-xs text-neutral-600">
                           <div className="flex flex-row justify-between">
                              <p className="mb-1 text-sm text-neutral-600">Rows highlighted in green pass all conditions</p>
                              {/* <p className="text-sm text-neutral-600 mb-1">
                        {" "}
                        <span className="font-bold">42%</span>
                        {" of users pass"}
                     </p> */}
                           </div>
                        </div>
                     </div>
                     <div className="h-full w-full overflow-scroll rounded-md border border-neutral-300 text-xs">
                        {sampleUsers.length ? (
                           <div className="flex flex-row   ">
                              {[...new Set(sampleUsers.map((row) => Object.keys(row.user)).flat())].map((key) => (
                                 <div className="relative flex min-w-[200px] flex-col">
                                    <div className="absolute top-0 flex h-[40px] min-h-[40px] w-full flex-col items-center justify-center border-b border-r bg-white font-semibold">
                                       {key}
                                    </div>
                                    {sampleUsers.map((user) => {
                                       let passesAllConditions = false;
                                       //   console.log();
                                       try {
                                          const filterFns = audience.conditions.map((cond) => {
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
                                             className=" flex h-[40px] min-h-[40px] flex-col justify-center border-b border-r px-2"
                                          >
                                             <div>{typeof value === "string" ? <span>{value}</span> : <span>{JSON.stringify(value)}</span>}</div>
                                          </div>
                                       );
                                    })}
                                 </div>
                              ))}
                           </div>
                        ) : (
                           <div className="flex flex-col items-center justify-center gap-3 px-5 py-5 text-center">
                              <p className="text-sm text-neutral-700 ">No sample users yet</p>
                              <p className="text-sm text-neutral-700 ">
                                 Once you drop the widget in your React app, sample users will start populating here
                              </p>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </VStack>
         </Tabs>
      </VStack>
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

const useUploadToSupabase = (tableName: string, dataKey: string, dataValue: any, danceId: string, enabled: boolean) => {
   const supabase = createClient();
   const [saved, setSaved] = useState(true);
   // If viewOnlyInitial is true, immediately exit from the hook

   const upload = useCallback(
      debounce(async (dataValue) => {
         console.log(`uploading ${dataKey}`);
         const { data, error } = await supabase
            .from(tableName)
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
