import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ShoppingCart, Star, Shield, Clock, ArrowRight, Sparkles, Send } from "lucide-react";
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
    trustBadges: [
      { label: "已服务", value: "5000+", icon: Star },
      { label: "好评率", value: "98.5%", icon: Shield },
      { label: "响应", value: "<2h", icon: Clock }
    ]
  },
];

// Google Material Design 风格的 "Products" 页面
const Products = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <PageLayout
      title="专业服务商"
      description="提供高质量Facebook白号，严格质量把控，完善售后保障体系，助力您的业务拓展"
      backLabel="返回首页"
    >
      {/* 促销横幅: Google 风格 */}
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-800">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium">限时优惠 · 批量购买享更多折扣</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          // 卡片: Material Design "Outlined Card" 风格
          <Card key={product.id} className="border border-gray-200 shadow-none hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-start justify-between mb-1">
                <CardTitle className="text-xl font-medium text-gray-800">{product.name}</CardTitle>
                {product.badge && (
                  <Badge className="bg-blue-100 text-blue-800 font-semibold">{product.badge}</Badge>
                )}
              </div>
              <CardDescription className="text-sm text-gray-500">{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between mb-4">
                <p className="text-3xl font-bold text-blue-600">{product.price}</p>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">库存: 999+个</p>
                  <p className="text-sm text-gray-500">已售: {product.salesCount}</p>
                </div>
              </div>

              <ul className="space-y-2.5 mb-5">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3 mt-1.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              {/* 信任徽章 */}
              <div className="border-t border-gray-200 pt-4">
                <div className="grid grid-cols-3 gap-2 text-center">
                  {product.trustBadges?.map((badge, idx) => {
                    const Icon = badge.icon;
                    return (
                      <div key={idx} className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                        <Icon className="w-5 h-5 mx-auto text-blue-600 mb-1" />
                        <p className="text-sm font-semibold text-gray-800">{badge.value}</p>
                        <p className="text-xs text-gray-500">{badge.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {/* 主按钮: Material Design "Filled Button" 风格 */}
              <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all duration-300">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    咨询购买
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm rounded-lg">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-gray-900">专业服务团队</DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">我们的客服团队将为您提供一对一专业咨询服务</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-2 py-2">
                    {[1, 2, 3].map((_, index) => (
                      <a
                        key={index}
                        href="https://t.me/Facebookkf_bot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
                      >
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <Send className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm text-gray-800">Telegram</div>
                          <div className="text-xs text-gray-500">@Facebookkf_bot</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                      </a>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* 底部信息卡片 */}
      <Card className="mt-8 border border-gray-200 shadow-none">
        <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-base text-gray-800">安全保障</h3>
              <p className="text-sm text-gray-500">所有账号均经过严格质量检测</p>
            </div>
          </div>
          {/* 次要按钮: Material Design "Outlined Button" 风格 */}
          <Button variant="outline" onClick={() => window.open('https://t.me/Facebookkf_bot', '_blank')} className="border-gray-300 text-gray-700 hover:bg-gray-50">
            了解更多
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default Products;
