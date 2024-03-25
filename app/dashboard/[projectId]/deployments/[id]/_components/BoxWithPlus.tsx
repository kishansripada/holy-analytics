import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export const BoxWithPlus = ({ children, onPlus, canAdd }) => {
   return (
      <div className="relative flex min-w-[275px] max-w-xs flex-col justify-center gap-3 rounded-xl border border-neutral-300 px-5 py-3  ">
         {canAdd && (
            <button
               onClick={onPlus}
               className=" absolute right-0 top-1/2 grid h-7 w-7 -translate-y-1/2 translate-x-1/2  place-items-center rounded-full border border-neutral-300 bg-white transition hover:bg-neutral-100"
            >
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
               </svg>
            </button>
         )}
         {children}
      </div>
   );
};
