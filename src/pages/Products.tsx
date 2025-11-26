import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { } from "lucide-react";
import { useState } from "react";
import ParticleBackground from "@/components/ParticleBackground";

const products = [
  {
    id: 1,
    name: "脸书白号",
    description: "企业级账号解决方案，3天质保服务，安全稳定可靠",
    price: "¥2/个",
    features: [
      "真实IP注册，账号安全有保障",
      "账号注册时长30-180天，活跃度高",
      "Cookie登录方式，即开即用",
      "购买后立即交付，无需等待"
    ],
    badge: "企业优选",
    badgeVariant: "secondary" as const,
    trustBadges: [
      { label: "已服务", value: "5000+" },
      { label: "客户好评率", value: "98.5%" },
      { label: "平均响应时间", value: "<2小时" }
    ]
  },
];

const Products = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <main className="min-h-screen gradient-bg tech-grid relative overflow-hidden">
      <ParticleBackground />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/50 to-background/80 pointer-events-none"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 neon-glow">
            专业Facebook账号服务商
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            提供高质量Facebook白号，严格质量把控，完善售后保障体系，助力您的业务拓展
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {products.map((product, index) => (
            <Card 
              key={product.id} 
              className="relative overflow-hidden border-primary/20 bg-background/80 backdrop-blur-sm hover:shadow-neon transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gradient-start via-gradient-accent to-gradient-end"></div>
              
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  {product.badge && (
                    <Badge variant={product.badgeVariant} className="ml-2">
                      {product.badge}
                    </Badge>
                  )}
                </div>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="text-3xl font-bold mb-4 text-primary neon-glow">
                  {product.price}
                </div>
                <ul className="space-y-3 mb-6">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3 mt-1.5 flex-shrink-0"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="border-t border-border/50 pt-4">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {product.trustBadges?.map((badge, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="text-lg font-bold text-primary">{badge.value}</div>
                        <div className="text-xs text-muted-foreground">{badge.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full" variant="default">
                      咨询购买
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
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Products;
