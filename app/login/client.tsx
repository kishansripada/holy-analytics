"use client";

import Link from "next/link";
import { AppWrapper } from "@/components/ui/app-wrapper";
import { VStack } from "@/components/ui/stacks";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

export default function Client() {
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
      <AppWrapper className={"flex select-none flex-col items-center justify-center "}>
         <VStack className="h-full w-[330px] max-w-[330px] items-center ">
            <VStack className="h-full w-full items-center justify-center gap-6 ">
               <Link href={"/"}>
                  <p className="text-6xl">🙏🏽</p>
               </Link>
               <p className="w-full text-center  text-xl font-semibold">Log in to Holy User</p>

               <VStack className="w-full gap-3">
                  <Button
                     variant={"default"}
                     onClick={() => {
                        signInWithGoogle();
                     }}
                     className=""
                  >
                     <p>Continue with Google</p>
                  </Button>
                  <Button
                     variant={"outline"}
                     onClick={() => {
                        signInWithGithub();
                     }}
                     className=""
                  >
                     <p>Continue with GitHub</p>
                  </Button>
               </VStack>
            </VStack>
         </VStack>
      </AppWrapper>
   );
}
