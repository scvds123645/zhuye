import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Zap, Sparkles, ArrowRight, Package, Wrench } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ParticleBackground from "@/components/ParticleBackground";

const Index = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "联系我";
  }, []);

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
          
          {/* Floating badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">专业服务 · 品质保障</span>
          </div>
          
          {/* Main icon */}
          <div className="inline-flex">
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center card-shadow">
              <Zap className="w-12 h-12 text-primary-foreground" strokeWidth={2} />
            </div>
          </div>
          
          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
              联系我
            </h1>
          </div>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
            很高兴认识您！如有任何问题，欢迎随时与我联系。
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-base rounded-lg fb-transition group"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  立即联系
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md card-shadow">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-foreground">
                    专业服务团队
                  </DialogTitle>
                  <DialogDescription>
                    我们的客服团队将为您提供一对一专业咨询服务
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 py-4">
                  {[1, 2, 3].map((_, index) => (
                    <a
                      key={index}
                      href="https://t.me/Facebookkf_bot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-secondary fb-transition group"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 fb-transition">
                        <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground">Telegram</div>
                        <div className="text-sm text-muted-foreground">@Facebookkf_bot</div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </a>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
            
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate('/products')}
              className="border-2 border-border hover:bg-secondary text-foreground font-semibold px-8 py-6 text-base rounded-lg fb-transition group"
            >
              <Package className="w-5 h-5 mr-2" />
              查看商品
            </Button>
          </div>
          
          {/* Quick links */}
          <div className="pt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => navigate('/tools')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground fb-transition group"
            >
              <Wrench className="w-4 h-4" />
              <span className="text-sm font-medium">实用工具</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
