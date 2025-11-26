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
      <div className="relative z-10 text-center px-4 animate-fade-in">
        {/* Error icon */}
        <div className="inline-flex mb-8">
          <div className="w-24 h-24 rounded-full bg-destructive/10 border-2 border-destructive/20 flex items-center justify-center">
            <AlertCircle className="w-12 h-12 text-destructive" />
          </div>
        </div>
        
        {/* 404 Text */}
        <h1 className="text-8xl md:text-9xl font-black mb-4 text-foreground">
          404
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-2">
          页面未找到
        </p>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          抱歉，您访问的页面不存在或已被移除
        </p>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            size="lg"
            onClick={() => navigate('/')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 rounded-lg fb-transition"
          >
            <Home className="w-5 h-5 mr-2" />
            返回首页
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate(-1)}
            className="border-2 border-border hover:bg-secondary px-8 py-6 rounded-lg fb-transition"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            返回上页
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
