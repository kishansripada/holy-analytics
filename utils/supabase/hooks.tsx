import { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { createClient } from "@/utils/supabase/client";

export const useUploadToSupabase = (dataKey: string, dataValue: any, danceId: string, enabled: boolean) => {
   const supabase = createClient();
   const [saved, setSaved] = useState(true);
   // If viewOnlyInitial is true, immediately exit from the hook

   const upload = useCallback(
      debounce(async (dataValue) => {
         console.log(`uploading ${dataKey}`);
         const { data, error } = await supabase
            .from("polls")
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
