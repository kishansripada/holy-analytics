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

   let { data: polls, error } = await supabase.from("polls").select("*, app_id (name)").eq("app_id", id);

   return <Client projectId={id} polls={polls}></Client>;
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
