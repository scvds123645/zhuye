import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, AlertCircle } from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      <ParticleBackground />
      
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[120px]" />
      
      <div className="relative z-10 text-center px-4 animate-fade-in">
        {/* Error icon */}
        <div className="relative inline-flex mb-8">
          <div className="absolute inset-0 bg-destructive/30 rounded-full blur-2xl scale-150" />
          <div className="relative w-24 h-24 rounded-full bg-destructive/10 border-2 border-destructive/30 flex items-center justify-center">
            <AlertCircle className="w-12 h-12 text-destructive" />
          </div>
        </div>
        
        {/* 404 Text */}
        <h1 className="text-8xl md:text-9xl font-black mb-4">
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
            404
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-2">
          页面未找到
        </p>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          抱歉，您访问的页面不存在或已被移除
        </p>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-semibold px-8 py-6 rounded-xl group"
          >
            <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            返回首页
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate(-1)}
            className="border-primary/30 hover:border-primary hover:bg-primary/10 px-8 py-6 rounded-xl group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            返回上页
          </Button>
        </div>
        
        {/* Decorative dots */}
        <div className="flex items-center justify-center gap-3 mt-12">
          <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: '0s' }} />
          <div className="w-2 h-2 rounded-full bg-accent/60 animate-pulse" style={{ animationDelay: '0.3s' }} />
          <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: '0.6s' }} />
        </div>
      </div>
    </main>
  );
};

export default NotFound;
