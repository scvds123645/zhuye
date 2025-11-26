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
        <div className="max-w-2xl mx-auto text-center space-y-6 animate-fade-in">
          
          {/* Floating badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-[13px] font-semibold text-foreground">专业服务 · 品质保障</span>
          </div>
          
          {/* Main icon */}
          <div className="inline-flex">
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
              <Zap className="w-10 h-10 text-primary-foreground" strokeWidth={2.5} />
            </div>
          </div>
          
          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              联系我
            </h1>
          </div>
          
          {/* Description */}
          <p className="text-[15px] text-muted-foreground max-w-md mx-auto">
            很高兴认识您！如有任何问题，欢迎随时与我联系。
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="fb"
                  size="lg" 
                  className="group"
                >
                  <Zap className="w-4 h-4" />
                  立即联系
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
                <DialogHeader>
                  <DialogTitle className="text-[17px] font-semibold text-foreground">
                    专业服务团队
                  </DialogTitle>
                  <DialogDescription className="text-[13px]">
                    我们的客服团队将为您提供一对一专业咨询服务
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-2 py-2">
                  {[1, 2, 3].map((_, index) => (
                    <a
                      key={index}
                      href="https://t.me/Facebookkf_bot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-all duration-200 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-[15px] text-foreground">Telegram</div>
                        <div className="text-[13px] text-muted-foreground">@Facebookkf_bot</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                    </a>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
            
            <Button 
              size="lg"
              variant="secondary"
              onClick={() => navigate('/products')}
              className="group"
            >
              <Package className="w-4 h-4" />
              查看商品
            </Button>
          </div>
          
          {/* Quick links */}
          <div className="pt-4 flex items-center justify-center">
            <button
              onClick={() => navigate('/tools')}
              className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-all duration-200"
              aria-label="实用工具"
            >
              <Wrench className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
