"use client";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { poll } from "@/utils/types";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Responses({
   poll,
   sampleData,
   setPoll,
   responses: initialResponses,
}: {
   poll: poll;
   setPoll: Function;
   sampleData: any;
   responses: any;
}) {
   const [responses, setResponses] = useState(initialResponses);
   const supabase = createClient();

   const handleInserts = (payload) => {
      console.log("Change received!", payload);
   };

   // Listen to inserts
   useEffect(() => {
      const responses = supabase
         .channel("custom-insert-channel")
         .on("postgres_changes", { event: "INSERT", schema: "public", table: "responses" }, (payload) => {
            console.log("Change received!", payload);
            setResponses((responses) => [...responses, payload.new]);
         })
         .subscribe();

      //   console.log(responses);
   }, []);

   const exportCSV = () => {
      // Function to convert object to CSV row
      const objectToCSVRow = (obj) => {
         const keys = Object.keys(obj);
         const values = Object.values(obj);
         const escapedValues = values.map((value) => `"${value}"`);
         return escapedValues.join(",");
      };

      // Function to extract all unique keys from response_data objects
      const extractKeys = () => {
         const allKeys = responses.reduce((keys, response) => {
            Object.keys(response.response_data).forEach((key) => {
               if (!keys.includes(key)) {
                  keys.push(key);
               }
            });
            return keys;
         }, []);
         return allKeys;
      };

      // Combine user_id and response_data keys to create CSV header
      const csvHeader = ["user_id", ...extractKeys()];

      // Combine user_id and corresponding response_data values for each response
      const csvRows = responses.map((response) => {
         const rowData = extractKeys().map((key) => {
            return response.response_data[key] || ""; // Handle missing data
         });
         return `${response.user_id},${rowData.join(",")}`;
      });

      // Combine header and rows
      const csvContent = `${csvHeader.join(",")}\n${csvRows.join("\n")}`;

      // Create a Blob object with CSV data
      const blob = new Blob([csvContent], { type: "text/csv" });

      // Create a temporary URL to download the CSV file
      const url = window.URL.createObjectURL(blob);

      // Create a link element and trigger a click event to download the CSV file
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "responses.csv");
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
   };
   return (
      <div className="flex h-full w-full  flex-col overflow-hidden ">
         <div className="flex flex-row items-center justify-between">
            <div className="bg-neutral-900 text-neutral-50 text-white"></div>

            <Button
               variant={"link"}
               onClick={() => {
                  exportCSV();
               }}
            >
               Export CSV
            </Button>
         </div>
         <div className="flex w-full flex-col overflow-hidden">
            <div className="flex w-full flex-row justify-between font-semibold ">
               <p>user_id</p>
               <p>response_data</p>
            </div>
            <div className="flex w-full flex-col items-start overflow-y-scroll">
               {responses.map((response) => {
                  return (
                     <div key={response.id} className="flex w-full flex-row justify-between border-t  py-4">
                        <p className="text-sm text-neutral-600">{response.user_id}</p>
                        <p className="text-sm text-neutral-600">{JSON.stringify(response.response_data)}</p>
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
}
