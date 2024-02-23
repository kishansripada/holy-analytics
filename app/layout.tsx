import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { VStack } from "@/components/ui/stacks";
// import { Toaster } from "@/components/ui/sonner";
const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata = {
   metadataBase: new URL(defaultUrl),
   title: "Holy User",
   description: "Holy User — Beautiful, in-app product announcements & notifications",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en" className={GeistSans.className}>
         <body className="bg-background text-foreground">
            <VStack className="min-h-screen items-center">{children}</VStack>
         </body>
      </html>
   );
}
