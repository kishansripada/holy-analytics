import { AppWrapper } from "@/components/ui/app-wrapper";
import { GeistSans } from "geist/font/sans";
import { HStack } from "@/components/ui/stacks";
import Sidebar from "./_components/Sidebar";
import StoreSettter from "./StoreSetter";
// import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { cookies } from "next/headers";
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
      redirect("/login");
   }

   const projectId = "c64bcec7-3e92-4e10-bbed-3a4fd551175d";

   const getProjectPolls = () => supabase.from("polls").select("*").eq("app_id", projectId);
   const getProject = () => supabase.from("projects").select("*").eq("app_id", projectId).single();

   const [{ data: polls }, { data: project }] = await Promise.all([getProjectPolls(), getProject()]);

   return (
      <>
         <StoreSettter polls={polls} project={project} />
         {children}
      </>
   );
}
