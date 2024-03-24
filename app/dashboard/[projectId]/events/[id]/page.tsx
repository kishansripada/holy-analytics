import Client from "./client";
import Header from "@/components/Header";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export default async function Index({ params: { id, projectId } }: { params: { id: string; projectId: string } }) {
   const cookieStore = cookies();
   const supabase = createClient(cookieStore);

   const {
      data: { user },
   } = await supabase.auth.getUser();

   let getEvent = () => supabase.from("events").select("*, app_id (name, app_id)").eq("id", id).single();

   const [{ data: event }] = await Promise.all([getEvent()]);

   //    .eq("id", id).single();
   return <Client event={event} projectId={projectId}></Client>;
}
