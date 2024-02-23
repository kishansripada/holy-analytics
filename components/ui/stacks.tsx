import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const HStack = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
   return <div className={cn("flex flex-row overflow-hidden", className)} ref={ref} {...props} />;
});

HStack.displayName = "HStack";

const VStack = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
   return <div className={cn("flex flex-col overflow-hidden", className)} ref={ref} {...props} />;
});

VStack.displayName = "VStack";
export { HStack, VStack };
