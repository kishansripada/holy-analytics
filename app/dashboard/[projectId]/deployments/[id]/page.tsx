import Client from "./client";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export default async function Index({ params: { id, projectId } }: { params: { id: string; projectId: string } }) {
   const cookieStore = cookies();
   const supabase = createClient(cookieStore);

   const {
      data: { user },
   } = await supabase.auth.getUser();

   const getDeployment = () => supabase.from("deployments").select("*").eq("id", id).single();
   const getProjectPolls = () => supabase.from("polls").select("*").eq("app_id", projectId);
   const getEvents = () => supabase.from("events").select("*").eq("app_id", projectId);

   const [{ data: deployment }, { data: messages }, { data: events }] = await Promise.all([getDeployment(), getProjectPolls(), getEvents()]);

   const getAudiences = () => supabase.from("audiences").select("*").eq("app_id", projectId);
   const { data: audiences } = await getAudiences();
   //    .eq("id", id).single();
   return <Client deployment={deployment} events={events} messages={messages} audiences={audiences} projectId={projectId}></Client>;
}
