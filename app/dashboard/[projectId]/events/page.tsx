import Client from "./client";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
export default async function Index({ params: { projectId } }: { params: { projectId: string } }) {
   const cookieStore = cookies();
   const supabase = createClient(cookieStore);

   const getEvents = () => supabase.from("events").select("*").eq("app_id", projectId);
   const getProject = () => supabase.from("projects").select("*").eq("app_id", projectId).single();

   const [{ data: events }, { data: project }] = await Promise.all([getEvents(), getProject()]);

   return <Client projectId={projectId} project={project} events={events}></Client>;
}
