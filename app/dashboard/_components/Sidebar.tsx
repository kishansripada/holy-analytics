"use client";

import Header from "@/components/Header";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/client";

export default function Sidebar({ polls }: any) {
   const supabase = createClient();

   return <div className="h-full min-h-screen border-r w-[250px] border-neutral-300 min-w-[250px]"></div>;
}
