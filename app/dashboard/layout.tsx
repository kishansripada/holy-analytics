import { AppWrapper } from "@/components/ui/app-wrapper";
import { GeistSans } from "geist/font/sans";
import { HStack } from "@/components/ui/stacks";
import Sidebar from "./_components/Sidebar";
// import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata = {
   metadataBase: new URL(defaultUrl),
   title: "Dashboard | Hyperuser",
   description: "Dashboard for Hyperuser. Create and edit your notifications",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
   const cookiesStore = cookies();
   const supabase = createClient(cookiesStore);

   const {
      data: { user },
   } = await supabase.auth.getUser();

   if (!user) {
      redirect("/login");
   }

   return (
      <AppWrapper>
         <HStack className="h-full w-screen items-start">
            <Sidebar user={user}></Sidebar>
            {children}
         </HStack>
      </AppWrapper>
   );
}
