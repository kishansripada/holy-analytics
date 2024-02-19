"use client";

import Link from "next/link";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AppWrapper } from "@/components/ui/app-wrapper";
import { VStack } from "@/components/ui/stacks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

export default function Client({ searchParams }: { searchParams: { message: string } }) {
   const supabase = createClient();
   const [email, setEmail] = useState("");
   const signIn = async () => {
      const { data, error } = await supabase.auth.signInWithOtp({
         email,
         options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
         },
      });
   };

   async function signInWithGithub() {
      const { data, error } = await supabase.auth.signInWithOAuth({
         provider: "github",
         options: {
            redirectTo: `${window.location.origin}/auth/callback`,
         },
      });
   }

   async function signInWithGoogle() {
      const { data, error } = await supabase.auth.signInWithOAuth({
         provider: "google",
         options: {
            redirectTo: `${window.location.origin}/auth/callback`,
         },
      });
   }

   return (
      <AppWrapper
         className={"flex flex-col items-center justify-center h-screen w-full "}
         style={
            {
               // backgroundImage: "linear-gradient(180deg, #3A2C34 0%, #22191E 51.04%, #231A1F 97.92%)",
               // background: "linear-gradient(180deg, rgba(255, 0, 122, 0.15) 0%, rgba(188, 0, 0, 0.38) 100%)",
            }
         }
      >
         <VStack className="max-w-[330px] w-[330px] items-center gap-6">
            <Link href={"/"}>
               <img className="w-8" src="/logo.png" alt="" />
            </Link>
            <p className="text-xl w-full  font-semibold text-center">Sign in to holy user</p>

            <VStack className="w-full gap-3">
               <Button
                  onClick={() => {
                     signInWithGoogle();
                  }}
                  className=""
               >
                  <p>Continue with Google</p>
               </Button>
               <Button
                  onClick={() => {
                     signInWithGithub();
                  }}
                  className=""
               >
                  <p>Continue with GitHub</p>
               </Button>
            </VStack>
            {/* <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
               <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground" action={signIn}>
                  <label className="text-md" htmlFor="email">
                     Email
                  </label>
                  <input
                     onChange={(event) => {
                        setEmail(event.target.value);
                     }}
                     value={email}
                     className="rounded-md px-4 py-2 bg-inherit border mb-6"
                     name="email"
                     placeholder="you@example.com"
                     required
                  />

                  <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">Sign In</button>
               </form>
            </div> */}
         </VStack>
      </AppWrapper>
   );
}
