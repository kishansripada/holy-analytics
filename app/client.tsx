"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import RemoteModal from "./remote-modal";
import Script from "next/script";
import hyperuser from "@/utils/hyperuser";

const SAMPLE_ANNOUNCEMENT = {
   poll_data: {
      type: "announcement",
      title: "Hey [USER_SEGMENT_NAME]!",
      subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
      image_url: "https://i.imgur.com/AbqHr71.png",
   },
};

const SAMPLE_YES_OR_NO = {
   poll_data: {
      type: "yesorno",
      title: "Are you open to taking a 15 min zoom call to learn about how you use [YOUR_APP_NAME]?",
      yesorno: {
         no_button: "No, thanks",
         yes_button: "Sure",
      },
      subtitle: "Just quickly want to learn how to make the app better for you guys",
   },
};

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

         <Button data-hyperuser="watch_a_demo_element" variant={"outline"}>
            Click here for mock onboarding/messaging
         </Button>
         <Button data-hyperuser="watch_a_demo_element" variant={"outline"}>
            Watch a demo
         </Button>

         <RemoteModal poll={SAMPLE_YES_OR_NO} open={notificationOpen} setOpen={setNotificationOpen}></RemoteModal>
         <RemoteModal poll={SAMPLE_ANNOUNCEMENT} open={announcementOpen} setOpen={setAnnouncementOpen}></RemoteModal>
      </>
   );
}
