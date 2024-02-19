"use client";

import { poll } from "@/utils/types";
import Script from "next/script";

export default function RemoteModal({ poll, open, setOpen }: { poll: poll; open: boolean; setOpen: (open: boolean) => void }) {
   const Widget =
      poll.poll_data.type === "yesorno" ? (
         (window as any).YesOrNo
      ) : poll.poll_data.type === "announcement" ? (
         (window as any).VerticalAnnouncement
      ) : (
         <></>
      );
   const Container = window.Container;
   const ModalWrapper = window.ModalWrapper;
   return (
      <>
         <div className="absolute left-0 left-1/2  top-0 top-1/2 hidden h-full w-full -translate-x-1/2 -translate-y-1/2 bg-neutral-950/60 bg-white"></div>
         <Script strategy="afterInteractive" type="module" src="https://holyuser-widget.vercel.app/holyuser.js"></Script>
         {typeof window !== "undefined" && Widget && Container && ModalWrapper ? (
            <ModalWrapper sendResponse={() => null} visible={open} setVisible={setOpen}>
               <Container>
                  <Widget sendResponse={() => null} poll={poll} />
               </Container>
            </ModalWrapper>
         ) : null}
      </>
   );
}
