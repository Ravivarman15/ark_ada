import { cn } from "@/lib/utils";
import arkLogo from "/WhatsApp Image 2026-02-04 at 11.06.19.jpeg";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export const Logo = ({ size = "md", showText = true, className }: LogoProps) => {
  const sizeClasses = {
    sm: "h-8 w-auto",
    md: "h-11 w-auto",
    lg: "h-14 w-auto",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <img
        src={arkLogo}
        alt="ARK Logo"
        className={cn("object-contain rounded-lg shadow-sm border border-border/10 bg-white p-1", sizeClasses[size])}
      />
      {showText && (
        <div className="flex flex-col justify-center">
          <span className={cn("font-heading font-extrabold text-foreground leading-none tracking-tight", textSizes[size])}>
            ARK
          </span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-0.5 leading-none">
            Diagnostic Assessment
          </span>
        </div>
      )}
    </div>
  );
};
