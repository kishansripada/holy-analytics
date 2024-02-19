"use client";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { poll } from "@/utils/types";

export default function Preview({ poll, sampleData, setPoll }: { poll: poll; setPoll: Function; sampleData: any }) {
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
                  className="w-full mt-2"
                  type="title"
                  id="condition"
                  placeholder={`7599296f-6f69-4673-8b16-cfca049582fb, e778f4d7-3830-46ca-9fde-dde57fa1d087`}
               />
            </div>
         </div>
      </div>
   );
}
