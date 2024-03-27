import Client from "./client";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export default async function Index({ params: { projectId } }: { params: { projectId: string } }) {
   const cookieStore = cookies();
   const supabase = createClient(cookieStore);

   const getProjectPolls = () => supabase.from("polls").select("*").eq("app_id", projectId);
   const getProject = () => supabase.from("projects").select("*").eq("app_id", projectId).single();

   const [{ data: polls }, { data: project }] = await Promise.all([getProjectPolls(), getProject()]);

   return <Client project={project} messages={polls || []} projectId={projectId}></Client>;
}
