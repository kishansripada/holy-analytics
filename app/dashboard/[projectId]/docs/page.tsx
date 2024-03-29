import Client from "./client";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export default async function Index({ params: { projectId } }: { params: { projectId: string } }) {
   const cookieStore = cookies();
   const supabase = createClient(cookieStore);
   const getDeployments = () => supabase.from("deployments").select("*").eq("app_id", projectId);
   const getEvents = () => supabase.from("events").select("*").eq("app_id", projectId);
   const getProjectPolls = () => supabase.from("polls").select("*").eq("app_id", projectId);

   const [{ data: deployments }, { data: events }, { data: polls }] = await Promise.all([getDeployments(), getEvents(), getProjectPolls()]);

   const {
      data: { user },
   } = await supabase.auth.getUser();

   return <Client deployments={deployments} polls={polls} events={events} projectId={projectId}></Client>;

   // return <iframe className="w-full" src="https://holy-user-docs.super.site/" frameborder="0"></iframe>;
   // return <iframe className="w-full" src="https://www.formistudio.app/25644/edit" frameBorder="0"></iframe>;
}
