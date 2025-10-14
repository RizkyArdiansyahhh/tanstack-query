"use client";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useRef } from "react";

export const Modal = ({ children }: { children: React.ReactNode }) => {
  const overlay = useRef(null);
  const router = useRouter();

  const handleClose: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === overlay.current) {
      router.back();
    }
  };

  return (
    <div
      ref={overlay}
      onClick={handleClose}
      className="fixed z-10 top-0 right-0 bottom-0 left-0 bg-black/25"
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-7 rounded-md">
        {children}
      </div>
    </div>
  );
};
