import { Button } from "@/components/ui/button";
import Link from "next/link";
import dynamic from "next/dynamic";
import styles from "./landing-page-styles.module.css";
import { Logo } from "./dashboard/_components/Logo";

const Client = dynamic(() => import("./client"), {
   ssr: false,
});
export default async function Index() {
   return (
      <div className="flex h-full w-full flex-1 flex-col items-center gap-16 overflow-hidden ">
         <nav className="flex h-20 w-full justify-center border-b border-b-foreground/10 bg-white">
            <div className="flex w-full max-w-7xl items-center justify-between p-3 text-sm">
               <div className="flex flex-row items-end gap-4">
                  {/* <div className="w-8 h-8 rotate-12 border-4 border-purple-500"></div> */}
                  {/* <p className="text-4xl">👽</p> */}
                  <div data-hyperuser="this_is_our_logo_element" className="flex flex-row items-end">
                     <Logo />
                     <p className="mb-1 text-xs text-neutral-700">beta</p>
                  </div>
                  <div className="mb-1 ml-4 flex flex-row items-end gap-5 text-sm  text-neutral-500">
                     {/* <p>Pricing</p>
                     <p>Features</p> */}
                     <a target="_blank" href="https://holy-user-docs.super.site/">
                        Docs
                     </a>
                  </div>
               </div>

               <Link href={"/login"}>
                  {" "}
                  <Button variant={"outline"}>Log in</Button>
               </Link>
            </div>
         </nav>

         <Client></Client>

         {/* <div className="mt-auto flex w-full flex-row gap-12 border-y border-neutral-300 px-16 py-16 text-center text-2xl text-neutral-800">
            <p className="">
               "I need to get a user who does <span className="font-bold">hip hop</span> on a <span className="font-bold">zoom call</span> ASAP"
            </p>
            <p className="">
               "I want to let all the <span className="font-bold">cheerleaders</span> on my platform know about this{" "}
               <span className="font-bold">new feature</span>"
            </p>
            <p className="">
               "I want to ask all the <span className="font-bold">students</span> on my platform a quick question"
            </p>
         </div> */}
      </div>
   );
}
