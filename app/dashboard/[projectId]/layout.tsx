import StoreSettter from "./StoreSetter";
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

   // const projectId = "c64bcec7-3e92-4e10-bbed-3a4fd551175d";

   // const getProject = () => supabase.from("projects").select("*").eq("app_id", projectId).single();

   // const getDeployments = () => supabase.from("deployments").select("*").eq("app_id", projectId);
   // const getProjectPolls = () => supabase.from("polls").select("*").eq("app_id", projectId);
   // const getEvents = () => supabase.from("events").select("*").eq("app_id", projectId);
   // const getAudiences = () => supabase.from("audiences").select("*").eq("app_id", projectId);

   // const [{ data: polls }, { data: project }, { data: deployments }, { data: events }, { data: audiences }] = await Promise.all([
   //    getProjectPolls(),
   //    getProject(),
   //    getDeployments(),
   //    getEvents(),
   //    getAudiences(),
   // ]);

   // console.log("called layout");

   return (
      <>
         {/* <StoreSettter polls={polls} project={project} deployments={deployments} events={events} audiences={audiences} /> */}
         {children}
      </>
   );
}
