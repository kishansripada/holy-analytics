"use client";

export default function Saving({ saved }: { saved: boolean }) {
   return (
      <div
         style={{
            transform: `translate(-50%, ${!saved ? "0" : "200%"})`,
         }}
         className="fixed bottom-8 left-1/2 flex h-10 w-1/3 flex-row items-center  justify-center gap-2 rounded-lg border border-neutral-200 bg-white text-sm text-neutral-500 transition-[transform] duration-300"
      >
         saving...
      </div>
   );
}
