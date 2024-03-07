import Header from "@/components/Header";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { Switch } from "@/components/ui/switch";
import Client from "./client";
import { Label } from "@/components/ui/label";

export default async function Index({ params: { id, projectId } }: { params: { id: string; projectId: string } }) {
   const cookieStore = cookies();
   const supabase = createClient(cookieStore);

   const {
      data: { user },
   } = await supabase.auth.getUser();

   let getAudience = () => supabase.from("audiences").select("*, app_id (name, app_id)").eq("id", id).single();

   const [{ data: audience }] = await Promise.all([getAudience()]);
   //    .eq("id", id).single();
   return <Client audience={audience} projectId={projectId}></Client>;
}
