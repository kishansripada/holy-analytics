import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import Client from "./client";
export default async function Index({ params: { projectId } }: { params: { projectId: string } }) {
   const cookieStore = cookies();
   const supabase = createClient(cookieStore);

   const getDeployments = () => supabase.from("deployments").select("*").eq("app_id", projectId);
   const getProject = () => supabase.from("projects").select("*").eq("app_id", projectId).single();

   const [{ data: deployments }, { data: project }] = await Promise.all([getDeployments(), getProject()]);

   return <Client projectId={projectId} project={project} deployments={deployments}></Client>;
}
