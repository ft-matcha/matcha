"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

function Button({
  children,
  className,
}: Partial<{
  children: React.ReactNode | string;
  className: string;
}>) {
  const { pending } = useFormStatus();

  console.log(pending);
  return (
    <button type="submit" className={className} aria-disabled={pending}>
      {children}
    </button>
  );
}

export default Button;
