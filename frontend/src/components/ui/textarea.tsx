"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import TextareaAutosize, {
  TextareaAutosizeProps,
} from "react-textarea-autosize";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaAutosizeProps>(
  ({ className, ...props }, ref) => {
    return (
      <TextareaAutosize
        className={cn(
          "flex min-h-[80px] w-full rounded-md border  bg-white px-3 py-2 text-sm placeholder:text-slate-500  disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950  dark:placeholder:text-slate-400 ",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
