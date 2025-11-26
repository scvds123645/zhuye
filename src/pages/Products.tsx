import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ShoppingCart, Star, Shield, Clock, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";

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
      { label: "已服务", value: "5000+", icon: Star },
      { label: "好评率", value: "98.5%", icon: Shield },
      { label: "响应", value: "<2h", icon: Clock }
    ]
  },
];

const Products = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <PageLayout
      title="专业服务商"
      description="提供高质量Facebook白号，严格质量把控，完善售后保障体系，助力您的业务拓展"
      backLabel="返回首页"
    >
      {/* Floating promotion banner */}
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-sm font-medium text-primary">限时优惠 · 批量购买享更多折扣</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <Card 
            key={product.id} 
            className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)] transition-all duration-500 animate-fade-in group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-60 group-hover:opacity-100 transition-opacity" />
            
            {/* Corner glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <CardHeader className="relative">
              <div className="flex items-start justify-between mb-2">
                <CardTitle className="text-xl font-bold">{product.name}</CardTitle>
                {product.badge && (
                  <Badge variant={product.badgeVariant} className="bg-primary/10 text-primary border-primary/20">
                    {product.badge}
                  </Badge>
                )}
              </div>
              <CardDescription className="text-muted-foreground">{product.description}</CardDescription>
            </CardHeader>

            <CardContent className="relative">
              <div className="text-4xl font-black mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {product.price}
              </div>
              
              <ul className="space-y-3 mb-6">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm text-muted-foreground group/item">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3 mt-2 flex-shrink-0 group-hover/item:shadow-[0_0_8px_hsl(var(--primary))] transition-shadow" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              {/* Trust badges */}
              <div className="border-t border-border/50 pt-4">
                <div className="grid grid-cols-3 gap-2 text-center">
                  {product.trustBadges?.map((badge, idx) => {
                    const Icon = badge.icon;
                    return (
                      <div key={idx} className="space-y-1 p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                        <Icon className="w-4 h-4 mx-auto text-primary" />
                        <div className="text-lg font-bold text-foreground">{badge.value}</div>
                        <div className="text-xs text-muted-foreground">{badge.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-semibold py-6 rounded-xl group/btn">
                    <ShoppingCart className="w-5 h-5 mr-2 group-hover/btn:scale-110 transition-transform" />
                    咨询购买
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
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
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Bottom info card */}
      <Card className="mt-10 p-6 bg-card/30 border-border/50 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">安全保障</h3>
              <p className="text-sm text-muted-foreground">所有账号均经过严格质量检测</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => window.open('https://t.me/Facebookkf_bot', '_blank')} className="border-primary/30 hover:border-primary hover:bg-primary/10">
            了解更多
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>
    </PageLayout>
  );
};

export default Products;
