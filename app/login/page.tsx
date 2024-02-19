import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Client from "./client";
export const dynamic = "force-dynamic";
const getServerSideProps = async () => {
   const cookieStore = cookies();
   const supabase = createClient(cookieStore);

   const {
      data: { user },
   } = await supabase.auth.getUser();

   if (user) {
      redirect("/dashboard");
   }
};
export default async function Page({}) {
   const _ = await getServerSideProps();
   return <Client></Client>;
}
