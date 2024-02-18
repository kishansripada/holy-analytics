import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import Client from "./client";
export default async function Index({ params: { id } }: { params: { id: string } }) {
   const cookieStore = cookies();
   const supabase = createClient(cookieStore);

   const getProjectPolls = () => supabase.from("polls").select("*").eq("app_id", id);
   const getProject = () => supabase.from("projects").select("*").eq("app_id", id).single();

   const [{ data: polls }, { data: project }] = await Promise.all([getProjectPolls(), getProject()]);

   return <Client projectId={id} project={project} polls={polls || []}></Client>;
}
