import { GeistSans } from "geist/font/sans";
// import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { cookies } from "next/headers";
import Sidebar from "./_components/Sidebar";
import { AppWrapper } from "@/components/ui/app-wrapper";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata = {
   metadataBase: new URL(defaultUrl),
   title: "Dashboard | Holy User",
   description: "Dashboard for Holy User. Create and edit your notifications",
};
export default async function RootLayout({ children }: { children: React.ReactNode }) {
   const cookiesStore = cookies();
   const supabase = createClient(cookiesStore);

   const {
      data: { user },
   } = await supabase.auth.getUser();

   if (!user) {
      redirect("login");
   }

   return (
      <AppWrapper>
         <div className="flex flex-row w-full h-full overflow-hidden w-screen">
            <Sidebar user={user}></Sidebar>
            {children}
         </div>
      </AppWrapper>
   );
}
