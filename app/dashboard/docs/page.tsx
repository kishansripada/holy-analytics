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

   return <iframe className="w-full" src="https://holy-user-docs.super.site/" frameborder="0"></iframe>;
   // return <iframe className="w-full" src="http://localhost:3000/14104/edit" frameborder="0"></iframe>;
}
