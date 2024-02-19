"use client";

import { poll } from "@/utils/types";
import Script from "next/script";

export default function RemoteWidget({ poll }: { poll: poll }) {
   const Widget =
      poll.poll_data.type === "yesorno" ? (
         (window as any).YesOrNo
      ) : poll.poll_data.type === "announcement" ? (
         (window as any).VerticalAnnouncement
      ) : (
         <></>
      );
   const Container = window.Container;
   return (
      <>
         <Script
            onReady={() => {
               // setWidget(window.YesOrNo);
               // console.log();
            }}
            strategy="afterInteractive"
            type="module"
            src="https://holyuser-widget.vercel.app/holyuser.js"
         ></Script>
         {typeof window !== "undefined" && Widget && Container ? (
            <Container>
               <Widget sendResponse={() => null} poll={poll} />
            </Container>
         ) : (
            <p className="font-bold text-neutral-600 text-xl">Loading live preview...</p>
         )}
      </>
   );
}
