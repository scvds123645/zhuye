import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hash, FileText, Cookie, ArrowLeft, UserCheck, ExternalLink, KeyRound } from "lucide-react";

const Tools = () => {
  const navigate = useNavigate();

  const tools = [
    {
      path: "/14",
      icon: Hash,
      title: "14位数字提取工具",
      description: "自动从文本中提取并去重14位连续数字",
      color: "bg-blue-500/10 group-hover:bg-blue-500/20",
      iconColor: "text-blue-500",
      external: false,
    },
    {
      path: "/discord",
      icon: FileText,
      title: "账号信息格式化工具",
      description: "批量格式化账号信息为标准格式",
      color: "bg-green-500/10 group-hover:bg-green-500/20",
      iconColor: "text-green-500",
      external: false,
    },
    {
      path: "/jh",
      icon: Cookie,
      title: "Cookie 筛选工具",
      description: "快速筛选指定的Cookie字段",
      color: "bg-purple-500/10 group-hover:bg-purple-500/20",
      iconColor: "text-purple-500",
      external: false,
    },
    {
      path: "https://3.584136.xyz",
      icon: UserCheck,
      title: "账号状态检查器",
      description: "Facebook 账号状态在线检测工具",
      color: "bg-orange-500/10 group-hover:bg-orange-500/20",
      iconColor: "text-orange-500",
      external: true,
    },
    {
      path: "https://1.584136.xyz",
      icon: KeyRound,
      title: "Cookie 注入器",
      description: "Facebook Cookie 快速注入工具",
      color: "bg-pink-500/10 group-hover:bg-pink-500/20",
      iconColor: "text-pink-500",
      external: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回首页
          </Button>

          <div className="text-center space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              实用工具
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              选择下方工具，快速完成各种数据处理任务
            </p>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <Card
                  key={tool.path}
                  className="p-6 bg-card border-border hover:border-primary hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => tool.external ? window.open(tool.path, '_blank') : navigate(tool.path)}
                >
                  <div className="space-y-4">
                    <div
                      className={`w-14 h-14 rounded-xl ${tool.color} flex items-center justify-center transition-colors`}
                    >
                      <IconComponent className={`w-7 h-7 ${tool.iconColor}`} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-bold text-foreground text-xl group-hover:text-primary transition-colors flex items-center gap-2">
                        {tool.title}
                        {tool.external && <ExternalLink className="w-4 h-4 text-muted-foreground" />}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                    <div className="pt-2">
                      <span className="text-sm font-medium text-primary group-hover:underline">
                        {tool.external ? '访问链接 →' : '立即使用 →'}
                      </span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Footer Info */}
        <div className="max-w-4xl mx-auto mt-16">
          <Card className="p-6 bg-muted/50 border-border">
            <h3 className="font-semibold text-foreground mb-3">使用提示</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 所有工具均支持批量处理和快捷键操作</li>
              <li>• 数据处理完全在浏览器本地进行，不会上传到服务器</li>
              <li>• 支持一键复制结果，方便快捷使用</li>
              <li>• 移动端和桌面端均可正常使用</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Tools;
