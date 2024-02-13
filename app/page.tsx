import { MCQ } from "@/Widget/Widget";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import MCQWrapper from "./_components/MCQWrapper";
export default async function Index() {
   return (
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
         <style>{`
            .gradient {
               /* Beautiful, in-app product announcements & notifications */

               line-height: 75px;
               /* or 123% */
               text-align: center;
               letter-spacing: -1.9px;

               background: linear-gradient(270.06deg, #ff0000 47.82%, #ff00f5 99.95%);
               -webkit-background-clip: text;
               -webkit-text-fill-color: transparent;
               background-clip: text;
               text-fill-color: transparent;
            }

            .blob {
               /* Rectangle 32 */

               position: absolute;
               width: 628px;
               height: 641px;
               left: 1026px;
               top: -100px;

               background: radial-gradient(50% 50% at 50% 50%, rgba(217, 1, 162, 0.14) 0%, rgba(217, 1, 162, 0) 100%);
               filter: blur(50px);
               
            }

            .blob2 {
               /* Rectangle 33 */

               position: absolute;
               width: 628px;
               height: 641px;
               left: -277px;
               top: 200px;

               background: radial-gradient(50% 50% at 50% 50%, rgba(217, 1, 1, 0.135) 0%, rgba(217, 1, 1, 0) 100%);
               filter: blur(50px);
            }
         `}</style>
         <nav className="w-full flex justify-center border-b border-b-foreground/10 h-20">
            <div className="w-full max-w-7xl flex justify-between items-center p-3 text-sm">
               <div className="flex flex-row items-end gap-4">
                  {/* <div className="w-8 h-8 rotate-12 border-4 border-purple-500"></div> */}
                  <p className="text-4xl">🙏🏽</p>
                  <div className=" text-3xl font-medium whitespace-nowrap ">holy user</div>
                  <div className="flex flex-row gap-5 items-end ml-4 text-neutral-500 text-sm  mb-1">
                     <p>Pricing</p>
                     <p>Features</p>
                  </div>
               </div>

               <Link href={"/dashboard"}>
                  {" "}
                  <Button variant={"outline"}>Log in</Button>
               </Link>
            </div>
         </nav>

         <div className="flex flex-col ">
            {/* <p className="text-center text-neutral-500 text-lg">Get to know your users with</p> */}
            <div className="animate-in text-6xl tracking-tight max-w-4xl text-center">
               <span className="gradient font-semibold">Beautiful</span>, in-app product announcements & notifications
            </div>
            <p className="text-center text-neutral-500 text-lg mt-5">for React developers</p>
         </div>
         <div className="blob pointer-events-none"></div>
         <div className="blob2 pointer-events-none"></div>
         <div>
            <p className="text-center text-neutral-500 text-lg">Get to know your users with our suite of notifications</p>
            <div className="w-full flex flex-row "></div>
         </div>

         <div className="mt-auto flex flex-row py-16 text-2xl text-center gap-12 text-neutral-800 w-full px-16 border-y border-neutral-300">
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
            <p className="">"No one replies to my shitty emails"</p>
         </div>
      </div>
   );
}
