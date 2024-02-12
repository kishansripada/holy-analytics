"use client";

import { MCQ } from "@/Widget/Widget";

export default function MCQWrapper() {
   return (
      <div className=" overflow-hidden select-none  w-[500px] min-h-[100px] rounded-lg border  dark:border-neutral-700 border-neutral-300">
         <MCQ
            poll={{
               id: 4,
               created_at: "2024-02-10T04:04:28.112875+00:00",
               title: "My first poll",
               user_id: "e778f4d7-3830-46ca-9fde-dde57fa1d087",
               active_until: "2024-03-01T04:07:11+00:00",
               poll_data: {
                  title: "How disappointed would you be if you couldn't use FORMI anymore?",
                  options: [
                     {
                        id: "very_disappointed",
                        title: "Very disappointed",
                     },
                     {
                        id: "disappointed",
                        title: "Disappointed",
                     },
                     {
                        id: "neutral",
                        title: "Neutral",
                     },
                     {
                        id: "not_disappointed",
                        title: "Not disappointed",
                     },
                  ],
                  subtitle: "We poll our users sometimes to make FORMI better for everyone!",
               },
               time_delay_ms: 0,
               active: true,
               conditions: [
                  {
                     id: "ak1h75",
                     condition_string: "(new Date() - new Date(user.created_at)) > (7 * 24 * 60 * 60 * 1000)",
                  },
                  {
                     id: "fzv5v5",
                     condition_string: 'user.selectedUses.includes("Theater/Stage Management")',
                  },
               ],
               app_id: "7599296f-6f69-4673-8b16-cfca049582fb",
            }}
         ></MCQ>
      </div>
   );
}
