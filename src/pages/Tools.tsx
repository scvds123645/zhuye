import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hash, FileText, Cookie, ArrowLeft, UserCheck, ExternalLink, KeyRound, RefreshCw, ListFilter, AtSign } from "lucide-react";

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
      path: "/cookie",
      icon: RefreshCw,
      title: "Cookie 格式转换工具",
      description: "提取c_user并转换为指定格式",
      color: "bg-cyan-500/10 group-hover:bg-cyan-500/20",
      iconColor: "text-cyan-500",
      external: false,
    },
    {
      path: "/qc",
      icon: ListFilter,
      title: "文本去重工具",
      description: "快速去除文本中的重复行",
      color: "bg-indigo-500/10 group-hover:bg-indigo-500/20",
      iconColor: "text-indigo-500",
      external: false,
    },
    {
      path: "/yopmail",
      icon: AtSign,
      title: "域名转邮箱后缀工具",
      description: "批量格式化域名为邮箱后缀",
      color: "bg-teal-500/10 group-hover:bg-teal-500/20",
      iconColor: "text-teal-500",
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

  // 工具卡片保持延时跳转逻辑
  const handleNavigation = (path, isExternal = false) => {
    setTimeout(() => {
      if (isExternal) {
        window.open(path, '_blank');
      } else {
        navigate(path);
      }
    }, 150);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Container: 调整 padding，手机端更紧凑 px-4，py也相应减小 */}
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8 md:mb-12">
          <Button
            variant="ghost"
            // 修改：直接使用 navigate 实现立即跳转
            onClick={() => navigate("/")}
            // 手机端按钮边距更小，-ml-2 让图标在视觉上与左边缘对齐
            className="mb-4 md:mb-6 -ml-2 md:ml-0 px-2 md:px-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回首页
          </Button>

          <div className="text-center space-y-2 md:space-y-3">
            {/* Title: 字体响应式调整 text-3xl -> text-5xl */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              实用工具
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              选择下方工具，快速完成各种数据处理任务
            </p>
          </div>
        </div>

        {/* Tools Grid */}
        {/* 放宽 max-w 以适应4列布局 */}
        <div className="max-w-7xl mx-auto">
          {/* Grid Layout: 手机1列 -> 平板2列 -> 笔记本3列 -> 大屏4列 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {tools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <Card
                  key={tool.path}
                  // Card 优化:
                  // 1. p-4 md:p-6: 手机端减少内边距
                  // 2. h-full: 确保 flex 布局下拉伸高度一致
                  // 3. active:scale-[0.98]: 增加手机端触摸反馈
                  className="flex flex-col h-full p-4 md:p-6 bg-card border-border hover:border-primary hover:shadow-xl active:scale-[0.98] transition-all duration-300 cursor-pointer group"
                  // 卡片点击保持原有延时效果
                  onClick={() => handleNavigation(tool.path, tool.external)}
                >
                  <div className="space-y-3 md:space-y-4 flex-1">
                    {/* Icon: 手机端 w-12，桌面端 w-14 */}
                    <div
                      className={`w-12 h-12 md:w-14 md:h-14 rounded-xl ${tool.color} flex items-center justify-center transition-colors`}
                    >
                      {/* Icon SVG: 手机端 w-6，桌面端 w-7 */}
                      <IconComponent className={`w-6 h-6 md:w-7 md:h-7 ${tool.iconColor}`} />
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                      {/* Title: 手机端 text-lg，桌面端 text-xl */}
                      <h3 className="font-bold text-foreground text-lg md:text-xl group-hover:text-primary transition-colors flex items-center gap-2">
                        {tool.title}
                        {tool.external && <ExternalLink className="w-4 h-4 text-muted-foreground" />}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                  {/* Link: 增加上边距，并确保始终位于底部 */}
                  <div className="pt-3 md:pt-4 mt-auto">
                    <span className="text-sm font-medium text-primary group-hover:underline flex items-center">
                      {tool.external ? '访问链接' : '立即使用'} <span className="ml-1">→</span>
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Footer Info */}
        <div className="max-w-4xl mx-auto mt-12 md:mt-16">
          <Card className="p-4 md:p-6 bg-muted/50 border-border">
            <h3 className="font-semibold text-foreground mb-2 md:mb-3">使用提示</h3>
            <ul className="space-y-1.5 md:space-y-2 text-sm text-muted-foreground">
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