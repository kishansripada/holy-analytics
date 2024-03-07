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

   const currentURL = window.location.href;
   const urlParts = currentURL.split("/");
   console.log(urlParts.length === 5 && urlParts[3] === "dashboard");
   const projectId = urlParts[4]; // Index 4 assuming the structure is always consistent

   return (
      <div className="flex h-full  w-[250px] min-w-[250px] flex-col gap-3 border-r border-neutral-200 px-4 py-5">
         <div className="flex flex-row items-center gap-3">
            <img referrerPolicy="no-referrer" className="h-8 w-8 rounded-full" src={user?.user_metadata.avatar_url} alt="" />
            <p className="text-sm text-neutral-700">{user?.user_metadata.full_name}</p>
         </div>
         <div data-hyperuser="testing" className="flex h-full flex-col gap-1">
            {/* FOR PROJECTS */}
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
                  {/* <div className="h-px w-full bg-neutral-200"></div> */}
                  <Link
                     href={`/dashboard/${projectId}/deployments`}
                     className={`w-full ${
                        path.includes("deployments") ? "bg-neutral-100" : ""
                     }  rounded-md px-2 py-2 text-sm text-neutral-800 hover:bg-neutral-100`}
                  >
                     Deployments
                  </Link>
                  {/* <div className="h-px w-full bg-neutral-300"></div> */}
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
            </div>
         </div>
      </div>
   );
}
