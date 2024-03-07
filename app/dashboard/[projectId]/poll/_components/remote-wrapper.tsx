"use client";

import { poll } from "@/utils/types";
import Script from "next/script";

export default function RemoteWrapper({ poll, open, children }: { poll: poll; open: boolean; children: any }) {
   const Widget =
      poll.poll_data.type === "notification" ? (
         (window as any).NotificationWrapper
      ) : poll.poll_data.type === "modal" ? (
         (window as any).ModalWrapper
      ) : (
         <></>
      );

   return (
      <>
         <Script strategy="afterInteractive" type="module" src="https://widget.holyuser.com/holyuser.js"></Script>
         {typeof window !== "undefined" && Widget ? (
            <Widget open={open}>{children}</Widget>
         ) : (
            <></>
            // <p className="text-xl font-bold text-neutral-600">Loading live preview...</p>
         )}
      </>
   );
}
