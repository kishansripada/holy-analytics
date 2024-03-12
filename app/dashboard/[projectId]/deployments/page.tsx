import Client from "./client";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
export default async function Index({ params: { projectId } }: { params: { projectId: string } }) {
   const cookieStore = cookies();
   const supabase = createClient(cookieStore);

   const getDeployments = () => supabase.from("deployments").select("*").eq("app_id", projectId);
   const getProject = () => supabase.from("projects").select("*").eq("app_id", projectId).single();
   const getAudiences = () => supabase.from("audiences").select("*").eq("app_id", projectId);
   const getPolls = () => supabase.from("polls").select("*").eq("app_id", projectId);

   const [{ data: deployments }, { data: project }, { data: audiences }, { data: messages }] = await Promise.all([
      getDeployments(),
      getProject(),
      getAudiences(),
      getPolls(),
   ]);

   return <Client audiences={audiences} messages={messages} projectId={projectId} project={project} deployments={deployments}></Client>;
}
