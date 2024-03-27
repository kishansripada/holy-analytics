"use client";

import { poll } from "@/utils/types";
import Script from "next/script";

export default function RemoteWidget({ poll }: { poll: poll }) {
   const Widget =
      poll.poll_data.type === "notification"
         ? (window as any).DefaultNotification
         : poll.poll_data.type === "modal"
           ? (window as any).DefaultModal
           : (window as any).DefaultPopover;

   return (
      <>
         <Script strategy="afterInteractive" type="module" src="https://static.hyperuser.dev/main.js"></Script>
         {typeof window !== "undefined" && Widget ? (
            <div className="relative rounded-lg border border-neutral-300">
               <div className="right-[16px] top-[16px]"></div>
               <Widget sendResponse={() => null} poll={poll} />
            </div>
         ) : (
            <p className="text-xl font-bold text-neutral-600">Loading live preview...</p>
         )}
      </>
   );
}
