import Header from "@/components/Header";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { Switch } from "@/components/ui/switch";
import Client from "./client";
import { Label } from "@/components/ui/label";

export default async function Index({ params: { id } }: { params: { id: string } }) {
   const cookieStore = cookies();
   const supabase = createClient(cookieStore);

   const {
      data: { user },
   } = await supabase.auth.getUser();

   let getPoll = () => supabase.from("polls").select("*, app_id (name, app_id)").eq("id", id).single();
   let getSampleData = () => supabase.from("sample_data").select("*");
   //  .eq("app_id", );
   let getResponses = () => supabase.from("responses").select("*").eq("poll_id", id);

   const [{ data: poll }, { data: sampleData }, { data: responses }] = await Promise.all([getPoll(), getSampleData(), getResponses()]);
   //    .eq("id", id).single();
   return <Client poll={poll} responses={responses} sampleData={sampleData}></Client>;
}
