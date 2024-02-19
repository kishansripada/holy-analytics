import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata = {
   metadataBase: new URL(defaultUrl),
   title: "Dashboard | Holy User",
   description: "Dashboard for Holy User. Create and edit your notifications",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en" className={GeistSans.className}>
         <Toaster />

         <body className="bg-background text-foreground">
            <main className="min-h-screen flex flex-col items-center">{children}</main>
         </body>
      </html>
   );
}
