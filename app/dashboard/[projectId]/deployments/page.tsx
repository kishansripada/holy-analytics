import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import Client from "./client";
export default async function Index({ params: { projectId } }: { params: { projectId: string } }) {
   const cookieStore = cookies();
   const supabase = createClient(cookieStore);

   const getAudiences = () => supabase.from("audiences").select("*").eq("app_id", projectId);
   const getProject = () => supabase.from("projects").select("*").eq("app_id", projectId).single();

   const [{ data: audiences }, { data: project }] = await Promise.all([getAudiences(), getProject()]);

   return <Client projectId={projectId} project={project} audiences={audiences}></Client>;
}
