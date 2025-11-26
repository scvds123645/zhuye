import { ReactNode, useEffect } from "react";
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

  // Set document title
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = "联系我";
    };
  }, [title]);

  return (
    <main className={`min-h-screen bg-background relative overflow-hidden ${className}`}>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-10">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-6 sm:mb-8">
          {showBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(backTo)}
              className="mb-3 sm:mb-4 -ml-2 text-muted-foreground hover:text-foreground group text-sm"
            >
              <ArrowLeft className="mr-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:-translate-x-1 transition-transform" />
              {backLabel}
            </Button>
          )}
          
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              {title}
            </h1>
            {description && (
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl">
                {description}
              </p>
            )}
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
