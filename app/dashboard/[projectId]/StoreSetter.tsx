"use client";

import { useEffect, useRef, useState } from "react";
import { useStore } from "./store";
import { useUploadToSupabase } from "@/utils/supabase/hooks";

export default function StoreSettter({ project }: {}) {
   const { setProject } = useStore();

   useEffect(() => {
      setProject(project);
   }, []);

   //    console.log({ polls });
   return (
      <></>
      // <div className="fixed bottom-8 left-1/2 flex h-10 w-1/3 -translate-x-1/2 flex-row items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white text-sm text-neutral-500">
      //    saving...
      // </div>
   );
}
