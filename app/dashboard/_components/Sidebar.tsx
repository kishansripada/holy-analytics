import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
export default async function Sidebar({ polls }: any) {
   const cookiesStore = cookies();
   const supabase = createClient(cookiesStore);
   const {
      data: { user },
   } = await supabase.auth.getUser();

   return (
      <div className="h-full min-h-screen border-r w-[250px] border-neutral-200 min-w-[250px] py-8 px-4 flex flex-col gap-1 tetx-medium">
         <Link href={"/"} className="w-full bg-neutral-100  hover:bg-neutral-100 py-2 px-2 rounded-md text-sm text-neutral-800">
            Projects
         </Link>
         {/* <Link href={"/"} className="w-full hover:bg-neutral-100 py-2 px-2 rounded-md text-sm text-neutral-800">
            Projects
         </Link> */}
         <p className="mt-auto text-sm text-neutral-700">{user?.email}</p>
      </div>
   );
}
