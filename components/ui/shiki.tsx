import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";

export function Shiki({ code, theme }) {
   const [innerHtml, setHtml] = useState("Loading...");

   const text = async () => {
      const html = await codeToHtml(code, {
         lang: "javascript",
         theme: "vitesse-light",
      });
      setHtml(html);
   };

   useEffect(() => {
      text();
   }, [code, theme]);
   return <div className="overflow-scroll rounded-md border border-neutral-200 p-3 text-sm" dangerouslySetInnerHTML={{ __html: innerHtml }} />;
}
