import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Hash, FileText, Cookie, UserCheck, ExternalLink, KeyRound, RefreshCw, ListFilter, AtSign, Sparkles, Store } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const Tools = () => {
  const navigate = useNavigate();
  const tools = [
    {
      path: "/14",
      icon: Hash,
      title: "14位数字提取工具",
      description: "自动从文本中提取并去重14位连续数字",
      // gradient: "from-blue-500 to-cyan-500", // Material Design 倾向于使用实色或更细微的渐变
      external: false,
    },
    {
      path: "/discord",
      icon: FileText,
      title: "账号信息格式化工具",
      description: "批量格式化账号信息为标准格式",
      // gradient: "from-green-500 to-emerald-500",
      external: false,
    },
    {
      path: "/jh",
      icon: Cookie,
      title: "Cookie 筛选工具",
      description: "快速筛选指定的Cookie字段",
      // gradient: "from-purple-500 to-violet-500",
      external: false,
    },
    {
      path: "/cookie",
      icon: RefreshCw,
      title: "Cookie 格式转换工具",
      description: "提取c_user并转换为指定格式",
      // gradient: "from-cyan-500 to-blue-500",
      external: false,
    },
    {
      path: "/qc",
      icon: ListFilter,
      title: "文本去重工具",
      description: "快速去除文本中的重复行",
      // gradient: "from-indigo-500 to-purple-500",
      external: false,
    },
    {
      path: "/yopmail",
      icon: AtSign,
      title: "域名转邮箱后缀工具",
      description: "批量格式化域名为邮箱后缀",
      // gradient: "from-teal-500 to-cyan-500",
      external: false,
    },
    {
      path: "/rj",
      icon: Store,
      title: "软件商店",
      description: "浏览并下载常用软件工具",
      // gradient: "from-emerald-500 to-teal-500",
      external: false,
    },
    {
      path: "https://3.584136.xyz",
      icon: UserCheck,
      title: "账号状态检查器",
      description: "Facebook 账号状态在线检测工具",
      // gradient: "from-orange-500 to-amber-500",
      external: true,
    },
    {
      path: "https://1.584136.xyz",
      icon: KeyRound,
      title: "Cookie 注入器",
      description: "Facebook Cookie 快速注入工具",
      // gradient: "from-pink-500 to-rose-500",
      external: true,
    },
  ];

  const handleNavigation = (path: string, isExternal: boolean) => {
    if (isExternal) {
      window.open(path, '_blank');
    } else {
      navigate(path);
    }
  };

  return (
    <PageLayout
      title="实用工具"
      description="选择下方工具，快速完成各种数据处理任务"
      backLabel="返回首页"
    >
      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* 增加间距 */}
        {tools.map((tool) => {
          const IconComponent = tool.icon;
          return (
            // 卡片: Material Design "Outlined Card" 风格
            <Card
              key={tool.path}
              onClick={() => handleNavigation(tool.path, tool.external)}
              className="relative border border-gray-200 p-5 shadow-none hover:border-blue-300 hover:shadow-lg cursor-pointer group transition-all duration-300 ease-in-out" // 调整边框和阴影
            >
              <div className="relative space-y-4"> {/* 调整间距 */}
                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300"> {/* 使用蓝色背景 */}
                  <IconComponent className="w-6 h-6 text-blue-600" /> {/* 使用蓝色图标 */}
                </div>
                
                {/* Content */}
                <div className="space-y-1.5"> {/* 调整间距 */}
                  <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2"> {/* 调整字体大小和颜色 */}
                    {tool.title}
                    {tool.external && <ExternalLink className="w-4 h-4 text-gray-500" />} {/* 调整图标大小和颜色 */}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed"> {/* 调整字体大小和颜色 */}
                    {tool.description}
                  </p>
                </div>
                
                {/* Action link */}
                <div className="pt-2"> {/* 调整间距 */}
                  <span className="text-sm font-medium text-blue-600 inline-flex items-center gap-1"> {/* 调整字体大小和颜色 */}
                    {tool.external ? '访问链接' : '立即使用'}
                    <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Footer Info */}
      <Card className="mt-8 border border-gray-200 shadow-none"> {/* 调整边框和阴影 */}
        <div className="flex items-start gap-4 p-5"> {/* 调整内边距和间距 */}
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0"> {/* 使用蓝色背景 */}
            <Sparkles className="w-6 h-6 text-blue-600" /> {/* 使用蓝色图标 */}
          </div>
          <div>
            <h3 className="font-semibold text-base text-gray-800 mb-2">使用提示</h3> {/* 调整字体大小和颜色 */}
            <ul className="space-y-1.5 text-sm text-gray-600"> {/* 调整字体大小和颜色 */}
              <li>• 所有工具均支持批量处理和快捷键操作</li>
              <li>• 数据处理完全在浏览器本地进行，不会上传到服务器</li>
              <li>• 支持一键复制结果，方便快捷使用</li>
              <li>• 移动端和桌面端均可正常使用</li>
            </ul>
          </div>
        </div>
      </Card>
    </PageLayout>
  );
};

export default Tools;
