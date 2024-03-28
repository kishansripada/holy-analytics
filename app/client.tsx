"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import styles from "./landing-page-styles.module.css";
import Script from "next/script";
import hyperuser from "@/utils/hyperuser";
import Link from "next/link";

export default function Client() {
   return (
      <>
         <Script
            src="https://static.hyperuser.dev/main.js"
            onLoad={() => {
               hyperuser.initialize({
                  userId: "dummy",
                  apiKey: "6ff56c62-aad3-418a-88a0-9e94fc50de19",
                  user: {},
               });
            }}
         />
         <div className="flex flex-col items-center ">
            {/* <p className="text-center text-neutral-500 text-lg">Get to know your users with</p> */}
            <div className="max-w-4xl text-center text-6xl tracking-tight animate-in">
               User onboarding & messaging for{" "}
               <span
                  onClick={() => {
                     hyperuser.nextStep("1b6b1979-0d47-40e6-af86-e872a42d0300", "2cloz");
                  }}
                  data-hyperuser="this_text_says_developers"
                  className={`bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text font-semibold text-transparent`}
               >
                  developers
               </span>
            </div>
            <p className="mt-5 max-w-2xl text-center text-lg text-neutral-500">
               Teach and inform your users with in-app notifications, popovers, and modals. For React and Next.js developers.
            </p>
         </div>
         <div className={`${styles.blob} pointer-events-none`}></div>
         <div className={`${styles.blob2} pointer-events-none`}></div>
         <div className="flex flex-row gap-2">
            <Link href={"/login"}>
               <Button>Get started</Button>
            </Link>
            <Button
               onClick={() => {
                  hyperuser.trackEvent("user_clicks_start_onboarding_on_landing_page");
               }}
               variant={"outline"}
            >
               Click here for mock onboarding/messaging
            </Button>
            <Link href="https://youtu.be/HF-IU7NZ25k?si=ynF1QAArwKct2d0f ">
               <Button data-hyperuser="watch_a_demo_element" variant={"outline"}>
                  Watch a demo
               </Button>
            </Link>
         </div>
      </>
   );
}
