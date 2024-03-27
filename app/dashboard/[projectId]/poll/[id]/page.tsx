import Client from "./client";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export default async function Index({ params: { id, projectId } }: { params: { id: string; projectId: string } }) {
   const cookieStore = cookies();
   const supabase = createClient(cookieStore);

   const {
      data: { user },
   } = await supabase.auth.getUser();

   let getPoll = () => supabase.from("polls").select("*").eq("id", id).single();
   let getSampleData = () => supabase.from("sample_data").select("*").eq("app_id", projectId).limit(50);
   //  .eq("app_id", );
   let getResponses = () => supabase.from("responses").select("*").eq("poll_id", id);

   const [{ data: poll }, { data: sampleData }, { data: responses }] = await Promise.all([getPoll(), getSampleData(), getResponses()]);
   //    .eq("id", id).single();
   return <Client poll={poll} projectId={projectId} responses={responses} sampleData={sampleData}></Client>;
}
