import { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { createClient } from "@/utils/supabase/client";
const supabase = createClient();
export const useUploadToSupabase = (dataKey: string, dataValue: any, danceId: string, enabled: boolean) => {
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

   return [upload, saved];
};

export const useUploadToSupabaseFunction = (tableName: "polls" | "audience" | "events" | "deployments", dataKey: string) => {
   const [saved, setSaved] = useState(true);
   // If viewOnlyInitial is true, immediately exit from the hook

   const upload = useCallback(
      debounce(async (dataValue: any, dataId: string) => {
         console.log(`uploading ${tableName}:${dataKey}`);
         const { data, error } = await supabase
            .from(tableName)
            .update({ [dataKey]: dataValue })
            .eq("id", dataId);
         console.log({ data });
         console.log({ error });
         setSaved(true);
      }, 2000),
      []
   );

   return upload;
};

export const useUploadCallToSupabase = () => {
   const [saved, setSaved] = useState(true);
   const uploadPropertyToSupabase = useCallback(
      debounce(async (tableName: string, columnName: string, dataValue: any, dataId: string) => {
         console.log(`uploading on ${tableName}:${columnName} for ${tableName} id ${dataId}`);
         const { data, error } = await supabase
            .from(tableName)
            .update({ [columnName]: dataValue, last_edited: new Date() })
            .eq("id", dataId);
         setSaved(true);
         console.log({ data });
         console.log({ error });
      }, 2000),
      []
   );

   const upload = (tableName: string, columnName: string, dataValue: any, dataId: string) => {
      uploadPropertyToSupabase(tableName, columnName, dataValue, dataId);
      setSaved(false);
   };

   return [upload, saved];
};

export const useUploadRowToSupabase = () => {
   const [saved, setSaved] = useState(true);
   const uploadRowToSupabase = useCallback(
      debounce(async (tableName: string, dataId: string, row: any) => {
         console.log(`uploading entire row on ${tableName} for id ${dataId}`);
         const { data, error } = await supabase
            .from(tableName)
            .update({ ...row, last_edited: new Date() })
            .eq("id", dataId);
         setSaved(true);
         console.log({ data });
         console.log({ error });
      }, 2000),
      []
   );

   const upload = (tableName: string, dataId: string, row: any) => {
      uploadRowToSupabase(tableName, dataId, row);
      setSaved(false);
   };

   return [upload, saved];
};
