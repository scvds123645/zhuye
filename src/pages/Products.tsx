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
    salesCount: "5418个",
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
      <div className="mb-6 flex justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary">
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-[13px] font-semibold text-foreground">限时优惠 · 批量购买享更多折扣</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <Card 
            key={product.id} 
            className="relative overflow-hidden hover:shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-all duration-200"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            
            <CardHeader className="relative">
              <div className="flex items-start justify-between mb-2">
                <CardTitle>{product.name}</CardTitle>
                {product.badge && (
                  <Badge variant={product.badgeVariant} className="bg-secondary text-foreground">
                    {product.badge}
                  </Badge>
                )}
              </div>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>

            <CardContent className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl font-bold text-primary">
                  {product.price}
                </div>
                <div className="flex flex-col gap-1.5">
                  <Badge variant="secondary" className="bg-secondary text-foreground px-3 py-1">
                    库存: 999+个
                  </Badge>
                  <Badge variant="outline" className="border-primary/20 text-primary px-3 py-1">
                    已售: {product.salesCount}
                  </Badge>
                </div>
              </div>
              
              <ul className="space-y-2.5 mb-4">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-[15px] text-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2.5 mt-1.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              {/* Trust badges */}
              <div className="border-t border-border pt-3 mt-4">
                <div className="grid grid-cols-3 gap-2 text-center">
                  {product.trustBadges?.map((badge, idx) => {
                    const Icon = badge.icon;
                    return (
                      <div key={idx} className="space-y-1 p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-all duration-200">
                        <Icon className="w-4 h-4 mx-auto text-primary" />
                        <div className="text-[15px] font-semibold text-foreground">{badge.value}</div>
                        <div className="text-[13px] text-muted-foreground">{badge.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
                <DialogTrigger asChild>
                  <Button variant="fb" className="w-full">
                    <ShoppingCart className="w-4 h-4" />
                    咨询购买
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      专业服务团队
                    </DialogTitle>
                    <DialogDescription>
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
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Bottom info card */}
      <Card className="mt-8 p-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-[15px] text-foreground">安全保障</h3>
              <p className="text-[13px] text-muted-foreground">所有账号均经过严格质量检测</p>
            </div>
          </div>
          <Button variant="secondary" onClick={() => window.open('https://t.me/Facebookkf_bot', '_blank')}>
            了解更多
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </PageLayout>
  );
};

export default Products;
