"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

import Script from "next/script";
import hyperuser from "@/utils/hyperuser";
import Link from "next/link";

export default function Client() {
   const [notificationOpen, setNotificationOpen] = useState(false);
   const [announcementOpen, setAnnouncementOpen] = useState(false);

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

         <Button variant={"outline"}>Click here for mock onboarding/messaging</Button>
         <Link href="https://youtu.be/HF-IU7NZ25k?si=ynF1QAArwKct2d0f ">
            <Button data-hyperuser="watch_a_demo_element" variant={"outline"}>
               Watch a demo
            </Button>
         </Link>
      </>
   );
}
