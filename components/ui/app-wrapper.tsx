"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export const AppWrapper = ({ className, children, style, ...props }: { className?: string; children: React.ReactNode }) => {
   return (
      <div
         className={cn(" full-screen flex min-h-full w-full max-w-full  flex-col overflow-hidden overscroll-none ", className)}
         style={{
            touchAction: "none",
            ...style,
         }}
         {...props}
      >
         <style>
            {`
               html,
               body {
                  overscroll-behavior: none;
                  overscroll-behavior-y: none;
                  overflow-y: overlay;
           
               }
               .full-screen {
                  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
                  height: calc(var(--vh, 1vh) * 100);
               }
            `}
         </style>
         <div className="flex h-10 min-h-10 w-full flex-row items-center justify-center border-b border-neutral-300">
            <p className="text-xs text-neutral-700">
               Holy User is in beta, please email kishansripada@formistudio.app with bugs reports & suggestions
            </p>
         </div>

         {children}
      </div>
   );
};
