import AuthButton from "../components/AuthButton";
import { cookies } from "next/headers";

export default async function Index() {
   const cookieStore = cookies();

   return (
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
         <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-6xl flex justify-between items-center p-3 text-sm">
               <div className="font-medium text-4xl">holy analytics</div>
               <AuthButton />
            </div>
         </nav>

         <div className="flex flex-col gap-5">
            <div className="animate-in text-6xl tracking-tight max-w-4xl text-center">
               Quickly learn from your users with our{" "}
               <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">beautiful</span> React embeds
               {/* <Header /> */}
            </div>
            <p className="text-center text-neutral-500 text-lg">A set of well-designed react components to sprinkle in your app</p>
         </div>
      </div>
   );
}
