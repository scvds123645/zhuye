import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Mail, Sparkles, ArrowRight, Package, Wrench, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Google Material Design 风格的 "联系我" 页面
const Index = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "联系我";
  }, []);

  return (
    // 使用简洁的灰色背景，移除粒子效果
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-md mx-auto text-center space-y-6">
          
          {/* 徽章: 改为 Google 风格的浅蓝色背景 */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-800">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium">专业服务 · 品质保障</span>
          </div>
          
          {/* 主图标: 使用 Mail 图标和 Google 蓝 */}
          <div className="inline-flex">
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center shadow-md">
              <Mail className="w-10 h-10 text-white" strokeWidth={2} />
            </div>
          </div>
          
          {/* 标题 */}
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              联系我
            </h1>
          </div>
          
          {/* 描述 */}
          <p className="text-base text-gray-500 max-w-md mx-auto">
            很高兴认识您！如有任何问题，欢迎随时与我联系。
          </p>
          
          {/* 操作按钮 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
              <DialogTrigger asChild>
                {/* 主按钮: Google Material "Contained Button" 风格 */}
                <Button 
                  size="lg" 
                  className="group bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <Send className="w-4 h-4 mr-2" />
                  立即联系
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm rounded-lg">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold text-gray-900">
                    专业服务团队
                  </DialogTitle>
                  <DialogDescription className="text-sm text-gray-500">
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
            
            {/* 次要按钮: Google Material "Outlined Button" 风格 */}
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate('/products')}
              className="group border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
            >
              <Package className="w-4 h-4 mr-2" />
              查看商品
            </Button>
          </div>
          
          {/* 快速链接: 简单的图标按钮 */}
          <div className="pt-6 flex items-center justify-center">
            <button
              onClick={() => navigate('/tools')}
              className="w-12 h-12 rounded-full hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
              aria-label="实用工具"
            >
              <Wrench className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
