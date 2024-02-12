import Header from "@/components/Header";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { Switch } from "@/components/ui/switch";
import Client from "./client";
import { Label } from "@/components/ui/label";
import { MCQ } from "@/Widget/Widget";
export default async function Index({ params: { id } }: { params: { id: string } }) {
   const cookieStore = cookies();
   const supabase = createClient(cookieStore);

   const {
      data: { user },
   } = await supabase.auth.getUser();

   let { data: poll, error } = await supabase.from("polls").select("*").eq("id", id).single();
   let { data: sampleData } = await supabase.from("sample_data").select("*");
   //    .eq("id", id).single();
   return <Client poll={poll} sampleData={sampleData}></Client>;
}
