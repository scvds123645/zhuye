import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Zap, Sparkles, ArrowRight, Package, Wrench } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ParticleBackground from "@/components/ParticleBackground";

const Index = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <main className="min-h-screen gradient-bg tech-grid relative overflow-hidden">
      <ParticleBackground />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/30 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/30 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/10 via-transparent to-transparent rounded-full" />
      
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-3xl mx-auto text-center space-y-10 animate-fade-in">
          
          {/* Floating badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm animate-bounce-slow">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">专业服务 · 品质保障</span>
          </div>
          
          {/* Main icon with glow effect */}
          <div className="relative inline-flex">
            <div className="absolute inset-0 bg-primary/40 rounded-full blur-2xl scale-150 animate-pulse-slow" />
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-2xl">
              <Zap className="w-12 h-12 text-primary-foreground" strokeWidth={2} />
            </div>
          </div>
          
          {/* Title with enhanced gradient */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
                联系我
              </span>
            </h1>
            
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
            </div>
          </div>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
            很高兴认识您！如有任何问题，欢迎随时与我联系。
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center pt-4">
            <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-bold px-10 py-7 text-lg rounded-2xl shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.6)] transition-all duration-300 group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    立即联系
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md border-primary/20 bg-background/95 backdrop-blur-xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
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
                      className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
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
              className="border-2 border-primary/30 hover:border-primary hover:bg-primary/10 text-foreground font-bold px-10 py-7 text-lg rounded-2xl transition-all duration-300 group backdrop-blur-sm"
            >
              <Package className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              查看商品
            </Button>
          </div>
          
          {/* Quick links */}
          <div className="pt-8 flex items-center justify-center gap-6">
            <button
              onClick={() => navigate('/tools')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-all duration-300 group"
            >
              <Wrench className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span className="text-sm font-medium">实用工具</span>
            </button>
          </div>
          
          {/* Decorative dots */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: '0s' }} />
            <div className="w-2 h-2 rounded-full bg-accent/60 animate-pulse" style={{ animationDelay: '0.3s' }} />
            <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: '0.6s' }} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
