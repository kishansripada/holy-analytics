"use client";

import { poll } from "@/utils/types";
import Script from "next/script";

export default function RemoteWidget({ poll }: { poll: poll }) {
   // console.log({ type: poll.poll_data.type });

   const Widget =
      poll.poll_data.type === "notification"
         ? (window as any).DefaultNotification
         : poll.poll_data.type === "modal"
           ? (window as any).DefaultModal
           : (window as any).DefaultPopover;

   console.log(Widget);
   // const Container = window.Container;
   return (
      <>
         <Script strategy="afterInteractive" type="module" src="https://widget.holyuser.com/holyuser.js"></Script>
         {typeof window !== "undefined" && Widget ? (
            // <Container>
            // <></>
            <div className="rounded-lg border border-neutral-300">
               <Widget sendResponse={() => null} poll={poll} />
            </div>
         ) : (
            // <></>
            //
            // </Container>

            <p className="text-xl font-bold text-neutral-600">Loading live preview...</p>
         )}
      </>
   );
}
