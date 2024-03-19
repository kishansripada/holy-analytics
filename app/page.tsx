import { Button } from "@/components/ui/button";
import Link from "next/link";
import dynamic from "next/dynamic";
import styles from "./landing-page-styles.module.css";

const Client = dynamic(() => import("./client"), {
   ssr: false,
});
export default async function Index() {
   return (
      <div className="flex h-full w-full flex-1 flex-col items-center gap-16 overflow-hidden ">
         <nav className="border-b-foreground/10 flex h-20 w-full justify-center border-b bg-white">
            <div className="flex w-full max-w-7xl items-center justify-between p-3 text-sm">
               <div className="flex flex-row items-end gap-4">
                  {/* <div className="w-8 h-8 rotate-12 border-4 border-purple-500"></div> */}
                  {/* <p className="text-4xl">👽</p> */}
                  <div className="flex flex-row items-end">
                     <div className=" mr-2 whitespace-nowrap text-3xl font-medium ">
                        {" "}
                        <span className="mr-2"></span> hyperuser
                     </div>
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

         <div className="flex flex-col items-center ">
            {/* <p className="text-center text-neutral-500 text-lg">Get to know your users with</p> */}
            <div className="animate-in max-w-4xl text-center text-6xl tracking-tight">
               User onboarding & messaging for
               <span className={`${styles.gradient} font-semibold`}> developers</span>
            </div>
            <p className="mt-5 max-w-2xl text-center text-lg text-neutral-500">
               Deliver beautiful pop-ups & messages to segmented user groups to help them start using your software.
            </p>
         </div>
         <div className={`${styles.blob} pointer-events-none`}></div>
         <div className={`${styles.blob2} pointer-events-none`}></div>
         <div className="flex flex-row gap-2">
            <Link href={"/login"}>
               <Button>Get started</Button>
            </Link>
            <Client></Client>
         </div>

         <img src="/modal.jpg" className="absolute right-[-100px] top-[250px] -z-10 max-w-md" alt="" />

         {/* <div className="mt-10 flex flex-row gap-16 px-36">
            <div className="flex w-1/2 flex-col gap-5">
               <p className="text-4xl">Gorgeous, pre-built React components to get you off the ground quickly</p>
               <ul className=" flex flex-col gap-3 font-medium text-neutral-800">
                  <p>Modals</p>
                  <p>Popovers</p>
                  <p>Slide-in notifications</p>
               </ul>
            </div>

            <div className="flex w-1/2 flex-col items-end gap-6 text-2xl font-semibold text-neutral-700">
               <img className="w-full" src="/formiModal.png" alt="" />
               <p>formi.dance</p>
            </div>
         </div> */}

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
