import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  showBack?: boolean;
  backTo?: string;
  backLabel?: string;
  showParticles?: boolean;
  className?: string;
}

const PageLayout = ({
  children,
  title,
  description,
  showBack = true,
  backTo = "/",
  backLabel = "返回首页",
  showParticles = true,
  className = "",
}: PageLayoutProps) => {
  const navigate = useNavigate();

  return (
    <main className={`min-h-screen bg-background relative overflow-hidden ${className}`}>
      {showParticles && <ParticleBackground />}
      
      {/* Background gradient orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px] translate-x-1/2 translate-y-1/2" />
      
      <div className="relative z-10 container mx-auto px-4 py-6 md:py-10">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8">
          {showBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(backTo)}
              className="mb-4 -ml-2 text-muted-foreground hover:text-foreground group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              {backLabel}
            </Button>
          )}
          
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
                {title}
              </span>
            </h1>
            {description && (
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
                {description}
              </p>
            )}
            
            {/* Decorative line */}
            <div className="flex items-center gap-3 pt-2">
              <div className="h-px w-16 bg-gradient-to-r from-primary to-transparent" />
              <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </div>
    </main>
  );
};

export default PageLayout;
