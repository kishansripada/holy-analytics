import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import Client from "./client";
export default async function Index() {
   const cookieStore = cookies();
   const supabase = createClient(cookieStore);

   const {
      data: { user },
   } = await supabase.auth.getUser();

   let { data: projects, error: projectError } = await supabase.from("projects").select("*").eq("user_id", user.id);
   return <Client projects={projects}></Client>;
}
