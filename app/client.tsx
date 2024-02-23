"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import RemoteModal from "./remote-modal";

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
         <div className="flex w-full flex-row items-center justify-between gap-10">
            {/* <Button
               onClick={() => {
                  setNotificationOpen(true);
               }}
               variant={"outline"}
            >
               View Notification Example
            </Button> */}
            <Button
               onClick={() => {
                  setAnnouncementOpen(true);
               }}
               variant={"outline"}
            >
               View Example
            </Button>
         </div>

         <RemoteModal poll={SAMPLE_YES_OR_NO} open={notificationOpen} setOpen={setNotificationOpen}></RemoteModal>
         <RemoteModal poll={SAMPLE_ANNOUNCEMENT} open={announcementOpen} setOpen={setAnnouncementOpen}></RemoteModal>
      </>
   );
}
