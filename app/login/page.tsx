import Link from "next/link";
import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3002";

export default function Login({ searchParams }: { searchParams: { message: string } }) {
   const signIn = async (formData: FormData) => {
      "use server";
      const email = formData.get("email") as string;

      const cookieStore = cookies();
      const supabase = createClient(cookieStore);

      const { data, error } = await supabase.auth.signInWithOtp({
         email,
         options: {
            emailRedirectTo: `${defaultUrl}/auth/callback`,
         },
      });
   };

   return (
      <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
         <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground" action={signIn}>
            <label className="text-md" htmlFor="email">
               Email
            </label>
            <input className="rounded-md px-4 py-2 bg-inherit border mb-6" name="email" placeholder="you@example.com" required />

            <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">Sign In</button>
         </form>
      </div>
   );
}
