"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export const AppWrapper = ({ className, children, style, ...props }) => {
   return (
      <div
         className={cn(" full-screen  max-w-full overflow-hidden overscroll-none ", className)}
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
         <div className="flex h-10 min-h-10 flex-row items-center justify-center border-b border-neutral-300">
            <p className="text-xs text-neutral-700">
               Holy User is in beta, please email kishansripada@formistudio.app with bugs reports & suggestions
            </p>
         </div>
         {/* <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta> */}
         {children}
      </div>
   );
};

// AppWrapper.displayName = "AppWrapper";
