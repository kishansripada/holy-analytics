"use client";

import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { redirect, usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
export default function Sidebar({ user }: { user: User }) {
   const path = usePathname();
   const router = useRouter();

   const signOut = async () => {
      const supabase = createClient();
      await supabase.auth.signOut();
      return router.push("/login");
   };
   console.log(path);
   return (
      <div className="h-full min-h-screen border-r w-[250px] border-neutral-200 min-w-[250px] py-8 px-4 flex flex-col gap-1 tetx-medium">
         <Link
            href={"/dashboard"}
            className={`w-full ${path === "/dashboard" ? "bg-neutral-100" : ""}  hover:bg-neutral-100 py-2 px-2 rounded-md text-sm text-neutral-800`}
         >
            Projects
         </Link>
         <Link
            href={"/dashboard/docs"}
            className={`w-full ${
               path === "/dashboard/docs" ? "bg-neutral-100" : ""
            }  hover:bg-neutral-100 py-2 px-2 rounded-md text-sm text-neutral-800`}
         >
            Docs
         </Link>
         {/* <Link href={"/"} className="w-full hover:bg-neutral-100 py-2 px-2 rounded-md text-sm text-neutral-800">
            Projects
         </Link> */}
         <div className="mt-auto">
            <button
               onClick={() => {
                  signOut();
               }}
            >
               Sign out
            </button>
            <p className="mt-auto text-sm text-neutral-700">{user?.email}</p>
         </div>
      </div>
   );
}
