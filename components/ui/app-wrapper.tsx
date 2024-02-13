"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export const AppWrapper = ({ className, children, style, ...props }) => {
   return (
      <div
         className={cn(" overflow-hidden  full-screen overscroll-none max-w-full ", className)}
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
         {/* <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta> */}
         {children}
      </div>
   );
};

// AppWrapper.displayName = "AppWrapper";
