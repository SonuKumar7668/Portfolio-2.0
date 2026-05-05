// components/ui/primitives.tsx
// Drop-in replacements for <button>, <input>, <textarea>
// that suppress the fdprocessedid hydration warning from
// browser extensions (LastPass, Dashlane, etc.)

import { forwardRef } from "react";

export const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => (
  <button ref={ref} suppressHydrationWarning {...props} />
));
Button.displayName = "Button";

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => (
  <input ref={ref} suppressHydrationWarning {...props} />
));
Input.displayName = "Input";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>((props, ref) => (
  <textarea ref={ref} suppressHydrationWarning {...props} />
));
Textarea.displayName = "Textarea";