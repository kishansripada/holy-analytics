import Header from "@/components/Header";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { Switch } from "@/components/ui/switch";
import Client from "./client";
import { Label } from "@/components/ui/label";

export default async function Index({ params: { id, projectId } }: { params: { id: string; projectId: string } }) {
   const cookieStore = cookies();
   const supabase = createClient(cookieStore);

   const {
      data: { user },
   } = await supabase.auth.getUser();

   let getDeployment = () => supabase.from("deployments").select("*").eq("id", id).single();
   const getProjectPolls = () => supabase.from("polls").select("*").eq("app_id", projectId);
   const [{ data: deployment }, { data: messages }] = await Promise.all([getDeployment(), getProjectPolls()]);
   // console.log({ deployment });

   // const deployment2 = {
   //    id: "361c86ac-48eb-43ff-b4a4-37b27adab398",
   //    is_live: false,
   //    data_tree: {
   //       initialTrigger: "page_load",
   //       initialAudience: 1,
   //       nodes: [
   //          {
   //             id: "2ndskf8",
   //             programmatic_filter: 1,
   //             message_id: 31,
   //             parent_id: "initialTrigger",
   //          },
   //          {
   //             id: "2ndskf8",
   //             programmatic_filter: 5,
   //             message_id: 28,
   //             parent_id: "initialTrigger",
   //          },
   //          {
   //             id: "dskjfh38",

   //             message_id: 32,
   //             parent_id: "2ndskf8",
   //          },
   //       ],
   //    },
   // };

   const getAudiences = () => supabase.from("audiences").select("*").eq("app_id", projectId);
   const { data: audiences } = await getAudiences();
   //    .eq("id", id).single();
   return <Client deployment={deployment} messages={messages} audiences={audiences} projectId={projectId}></Client>;
}
