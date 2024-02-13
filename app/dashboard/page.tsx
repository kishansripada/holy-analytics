import Header from "@/components/Header";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { Switch } from "@/components/ui/switch";
import Client from "./client";
import { redirect } from "next/navigation";
export default async function Index() {
   const cookieStore = cookies();
   const supabase = createClient(cookieStore);

   const {
      data: { user },
   } = await supabase.auth.getUser();
   if (!user) {
      redirect("/login");
   }

   let { data: projects, error: projectError } = await supabase.from("projects").select("*").eq("user_id", user.id);
   return <Client projects={projects}></Client>;
}

function formatDate(date: Date): string {
   const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

   const suffixes = ["st", "nd", "rd", "th"];

   const month = months[date.getMonth()];
   const day = date.getDate();
   let daySuffix = "th";
   if (day <= 3) {
      daySuffix = suffixes[day - 1];
   }

   const hours = date.getHours();
   const minutes = date.getMinutes();
   const ampm = hours >= 12 ? "PM" : "AM";
   const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
   const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

   return `${month} ${day}${daySuffix} at ${formattedHours}:${formattedMinutes} ${ampm}`;
}
