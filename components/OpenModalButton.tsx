"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

function OpenModalButton({
  selector,
  title = "Ändern",
  className,
  children,
  ...props
}: {
  selector: string;
  title?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <span className="ml-4 flex-shrink-0">
      <button
        type="button"
        onClick={() => {
          const modal = document.querySelector<HTMLDialogElement>(selector);
          modal?.showModal();
        }}
        className={cn(
          "font-medium text-secondary hover:text-secondary/60",
          className
        )}
        {...props}
      >
        {children || title}
      </button>
    </span>
  );
}

export default OpenModalButton;
