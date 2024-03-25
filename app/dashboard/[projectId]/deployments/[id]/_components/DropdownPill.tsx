import { ReactHTMLElement } from "react";

export const DropdownPill = ({ value, type, onClick }: { value: string; type?: "audience" | "trigger" | "message"; onClick: () => void }) => {
   return (
      <button
         onClick={onClick}
         className={`flex flex-row items-center gap-3 rounded-xl border ${type === "message" ? "border-pink-300" : "border-blue-300"}  px-3 py-1  transition hover:bg-neutral-200  `}
      >
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 min-h-[16px] w-4 min-w-[16px]">
            <path
               fillRule="evenodd"
               d="M3.43 2.524A41.29 41.29 0 0 1 10 2c2.236 0 4.43.18 6.57.524 1.437.231 2.43 1.49 2.43 2.902v5.148c0 1.413-.993 2.67-2.43 2.902a41.102 41.102 0 0 1-3.55.414c-.28.02-.521.18-.643.413l-1.712 3.293a.75.75 0 0 1-1.33 0l-1.713-3.293a.783.783 0 0 0-.642-.413 41.108 41.108 0 0 1-3.55-.414C1.993 13.245 1 11.986 1 10.574V5.426c0-1.413.993-2.67 2.43-2.902Z"
               clipRule="evenodd"
            />
         </svg>
         <p className="text-left">{value}</p>
      </button>
   );
};