"use client";

import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { redirect, usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
export default function Sidebar({ user }: { user: User }) {
   console.log(user);
   const path = usePathname();
   const router = useRouter();
   const supabase = createClient();
   const signOut = async () => {
      await supabase.auth.signOut();
      return router.push("/login");
   };
   const urlParts = path.split("/");

   const projectId = path.split("/")[2];
   console.log(projectId);

   return (
      <div className="flex h-full  w-[250px] min-w-[250px] flex-col gap-3 border-r border-neutral-200 px-4 py-5">
         <p className="ml-2 text-2xl font-medium text-neutral-700">
            👧🏻 <span className="ml-1">hyperuser</span>
         </p>
         <div data-hyperuser="testing" className="flex h-full flex-col gap-1">
            {path.includes("/dashboard/") ? (
               <>
                  <Link
                     href={`/dashboard/${projectId}`}
                     className={`w-full ${
                        !path.includes("audiences") && !path.includes("deployments") && urlParts[3] === "dashboard" ? "bg-neutral-100" : ""
                     }  rounded-md px-2 py-2 text-sm text-neutral-800 hover:bg-neutral-100`}
                  >
                     Messages
                  </Link>
                  <Link
                     href={`/dashboard/${projectId}/audiences`}
                     className={`w-full ${
                        path.includes("audiences") ? "bg-neutral-100" : ""
                     }  rounded-md px-2 py-2 text-sm text-neutral-800 hover:bg-neutral-100`}
                  >
                     Audiences
                  </Link>

                  <Link
                     href={`/dashboard/${projectId}/deployments`}
                     className={`w-full ${
                        path.includes("deployments") ? "bg-neutral-100" : ""
                     }  rounded-md px-2 py-2 text-sm text-neutral-800 hover:bg-neutral-100`}
                  >
                     Deployments
                  </Link>
               </>
            ) : null}

            <div className="mt-auto flex flex-col">
               <Link
                  href={"/dashboard/docs"}
                  className={`w-full ${
                     path === "/dashboard/docs" ? "bg-neutral-100" : ""
                  }  rounded-md px-2 py-2 text-sm text-neutral-800 hover:bg-neutral-100`}
               >
                  Docs
               </Link>
               <Link
                  href={"/dashboard"}
                  className={` w-full ${
                     path === "/dashboard" ? "bg-neutral-100" : ""
                  }  rounded-md px-2 py-2 text-sm text-neutral-800 hover:bg-neutral-100`}
               >
                  My projects
               </Link>
               <button
                  className="rounded-md px-2 py-2 text-left text-sm text-neutral-800 hover:bg-neutral-100"
                  onClick={() => {
                     signOut();
                  }}
               >
                  Sign out
               </button>
               <div className="mt-3 flex flex-row items-center gap-3">
                  <img referrerPolicy="no-referrer" className="h-8 w-8 rounded-full" src={user?.user_metadata.avatar_url} alt="" />
                  <p className="text-sm text-neutral-700">{user?.user_metadata.full_name}</p>
               </div>
            </div>
         </div>
      </div>
   );
}
