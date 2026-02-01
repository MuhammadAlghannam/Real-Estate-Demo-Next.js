import { cn } from "@/lib/utils";

export default function Empty({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <p className={cn("py-10 text-h5-regular text-center text-text-gray-dark", className)}>{children}</p>
  )
}
