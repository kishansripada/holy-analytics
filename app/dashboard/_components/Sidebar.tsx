"use client";

import { redirect, usePathname, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function Sidebar({ user }: { user: User }) {
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

   const searchParams = useSearchParams();
   const referer = searchParams.get("referer");

   return (
      <div className="flex h-full  w-[250px] min-w-[250px] flex-col gap-3 border-r border-neutral-200 px-4 py-5">
         {referer && typeof referer === "string" ? (
            <Link href={referer}>
               <Button size={"sm"}>
                  <div className="flex flex-row items-center gap-2">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                     >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                     </svg>
                     <p>Back to deployment</p>
                  </div>
               </Button>
            </Link>
         ) : (
            <p className="ml-2 text-2xl font-medium text-neutral-700">
               👧🏻 <span className="ml-1">hyperuser</span>
            </p>
         )}
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
                     href={`/dashboard/${projectId}/events`}
                     className={`w-full ${
                        path.includes("events") ? "bg-neutral-100" : ""
                     }  rounded-md px-2 py-2 text-sm text-neutral-800 hover:bg-neutral-100`}
                  >
                     Events
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
                  href={`/dashboard/${projectId}/docs`}
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
