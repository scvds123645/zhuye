import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Zap } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ParticleBackground from "@/components/ParticleBackground";

const Index = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <main className="min-h-screen gradient-bg tech-grid relative overflow-hidden flex items-center justify-center">
      <ParticleBackground />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/50 to-background/80 pointer-events-none"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent animate-pulse-slow">
            <Zap className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
          
          {/* Title with gradient */}
          <div className="space-y-3">
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-primary via-gradient-accent to-accent bg-clip-text text-transparent">
              联系我
            </h1>
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary"></div>
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-accent"></div>
            </div>
          </div>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
            很高兴认识您！如有任何问题，欢迎随时与我联系。
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="relative overflow-hidden bg-gradient-to-r from-primary via-gradient-accent to-accent hover:shadow-neon transition-all duration-300 text-white font-semibold px-8 py-6 text-lg group"
                >
                  <Zap className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  立即联系
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-2xl">专业服务团队</DialogTitle>
                  <DialogDescription>
                    我们的客服团队将为您提供一对一专业咨询服务，解答您的疑问并协助完成购买流程
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <a
                    href="https://t.me/Facebookkf_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-accent/50 transition-all duration-200"
                  >
                    <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                    </svg>
                    <div>
                      <div className="font-medium">Telegram</div>
                      <div className="text-sm text-muted-foreground">@Facebookkf_bot</div>
                    </div>
                  </a>
                  <a
                    href="https://t.me/Facebookkf_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-accent/50 transition-all duration-200"
                  >
                    <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                    </svg>
                    <div>
                      <div className="font-medium">Telegram</div>
                      <div className="text-sm text-muted-foreground">@Facebookkf_bot</div>
                    </div>
                  </a>
                  <a
                    href="https://t.me/Facebookkf_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-accent/50 transition-all duration-200"
                  >
                    <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                    </svg>
                    <div>
                      <div className="font-medium">Telegram</div>
                      <div className="text-sm text-muted-foreground">@Facebookkf_bot</div>
                    </div>
                  </a>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate('/products')}
              className="border-2 border-primary/50 hover:border-primary hover:bg-primary/10 text-foreground font-semibold px-8 py-6 text-lg transition-all duration-300"
            >
              查看商品
            </Button>

          </div>
          
          
          {/* Decorative dots */}
          <div 
            className="flex items-center justify-center gap-3 pt-8 cursor-pointer group/dots"
            onClick={() => navigate('/tools')}
            role="button"
            aria-label="进入工具页面"
          >
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse group-hover/dots:scale-150 transition-transform duration-300" style={{ animationDelay: '0s' }}></div>
            <div className="w-3 h-3 rounded-full bg-accent animate-pulse group-hover/dots:scale-150 transition-transform duration-300" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse group-hover/dots:scale-150 transition-transform duration-300" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
