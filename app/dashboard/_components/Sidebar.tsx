"use client";

import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { redirect, usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
export default function Sidebar({ user }: { user: User }) {
   // console.log(user);
   const path = usePathname();
   const router = useRouter();
   const supabase = createClient();
   const signOut = async () => {
      await supabase.auth.signOut();
      return router.push("/login");
   };
   console.log(path);
   return (
      <div className="tetx-medium flex h-full min-h-screen w-[250px] min-w-[250px] flex-col gap-3 border-r border-neutral-200 px-4 py-8">
         <div className="flex flex-row items-center gap-3">
            <img className="h-8 w-8 rounded-full" src={user?.user_metadata.avatar_url} alt="" />
            <p className="text-sm text-neutral-700">{user?.user_metadata.full_name}</p>
         </div>
         <div className="flex flex-col gap-1">
            {" "}
            <Link
               href={"/dashboard"}
               className={`w-full ${
                  path === "/dashboard" ? "bg-neutral-100" : ""
               }  rounded-md px-2 py-2 text-sm text-neutral-800 hover:bg-neutral-100`}
            >
               Projects
            </Link>
            <Link
               href={"/dashboard/docs"}
               className={`w-full ${
                  path === "/dashboard/docs" ? "bg-neutral-100" : ""
               }  rounded-md px-2 py-2 text-sm text-neutral-800 hover:bg-neutral-100`}
            >
               Docs
            </Link>
         </div>
         {/* <Link href={"/"} className="w-full hover:bg-neutral-100 py-2 px-2 rounded-md text-sm text-neutral-800">
            Projects
         </Link> */}
         <div className="mt-auto">
            <button
               className="text-sm text-neutral-700"
               onClick={() => {
                  signOut();
               }}
            >
               Sign out
            </button>
         </div>
      </div>
   );
}
