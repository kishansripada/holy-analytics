import Header from "@/components/Header";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { Switch } from "@/components/ui/switch";
import Client from "./client";
export default async function Index({ params: { id } }: { params: { id: string } }) {
   const cookieStore = cookies();
   const supabase = createClient(cookieStore);

   const {
      data: { user },
   } = await supabase.auth.getUser();

   const getProjectPolls = () => supabase.from("polls").select("*").eq("app_id", id);
   const getProject = () => supabase.from("projects").select("*").eq("app_id", id).single();

   const [{ data: polls }, { data: project }] = await getAllThatShit([getProjectPolls(), getProject()]);

   return <Client projectId={id} project={project} polls={polls || []}></Client>;
}

function getAllThatShit<T>(promises: Promise<T>[]): Promise<T[]> {
   return Promise.all(promises);
}
