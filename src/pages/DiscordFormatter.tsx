import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormattedResult {
  email: string;
  key: string;
  formatted: string;
}

const DiscordFormatter = () => {
  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState<FormattedResult[]>([]);
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const { toast } = useToast();

  const handleFormat = () => {
    if (!inputText.trim()) {
      alert("请输入账号信息！");
      return;
    }

    const lines = inputText.split("\n").filter((line) => line.trim());
    const formattedResults: FormattedResult[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const parts = line.split(/\s+/);

      // 验证格式
      if (parts.length !== 2) {
        alert(`第 ${i + 1} 行格式错误：应为 "账号@域名.xyz 密钥" 格式（用空格分隔）`);
        return;
      }

      const [email, key] = parts;

      // 验证邮箱格式
      if (!email.includes("@")) {
        alert(`第 ${i + 1} 行格式错误：邮箱必须包含 @ 符号`);
        return;
      }

      // 提取域名（@后面的部分）
      const domain = email.split("@")[1];

      // 生成格式化结果
      const formatted = `账号 ${email} 密码 ${email} 接码地址 https://2.584136.xyz/${key}`;

      formattedResults.push({
        email,
        key,
        formatted,
      });
    }

    setResults(formattedResults);
  };

  const handleCopyAll = async () => {
    if (results.length === 0) {
      toast({
        title: "没有内容可复制",
        variant: "destructive",
      });
      return;
    }

    const allText = results.map((r) => r.formatted).join("\n");

    try {
      await navigator.clipboard.writeText(allText);
      setShowCopySuccess(true);
      setTimeout(() => setShowCopySuccess(false), 2000);
    } catch (err) {
      toast({
        title: "复制失败",
        variant: "destructive",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === "Enter") {
      e.preventDefault();
      handleFormat();
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            账号信息格式化工具
          </h1>
          <p className="text-muted-foreground">
            输入账号信息，自动格式化为标准格式
          </p>
        </div>

        {/* Input Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              输入账号信息
              <span className="text-muted-foreground ml-2">
                （格式：账号@域名.xyz 密钥，每行一条）
              </span>
            </label>
            <Textarea
              placeholder="example@domain.xyz abc123&#10;user@site.com key456&#10;...&#10;&#10;提示：可以按 Ctrl+Enter 快速格式化"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-[200px] font-mono text-sm"
            />
          </div>

          <Button onClick={handleFormat} className="w-full" size="lg">
            <Wand2 className="mr-2 h-5 w-5" />
            格式化
          </Button>
        </div>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                格式化结果 ({results.length} 条)
              </h2>
              <Button onClick={handleCopyAll} variant="outline">
                <Copy className="mr-2 h-4 w-4" />
                复制全部
              </Button>
            </div>

            {/* Copy Success Message */}
            {showCopySuccess && (
              <div className="bg-primary text-primary-foreground px-4 py-3 rounded-md text-center font-medium animate-fade-in">
                已复制到剪贴板！
              </div>
            )}

            {/* Results Cards */}
            <div className="space-y-3">
              {results.map((result, index) => (
                <Card
                  key={index}
                  className="p-4 bg-card border border-border"
                >
                  <pre className="font-mono text-sm whitespace-pre-wrap break-all text-foreground">
                    {result.formatted}
                  </pre>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <Card className="p-6 bg-muted/50 border-border">
          <h3 className="font-semibold text-foreground mb-3">使用说明</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• 每行输入一条账号信息，格式为：账号@域名.xyz 密钥</li>
            <li>• 账号和密钥之间用空格分隔</li>
            <li>• 邮箱必须包含 @ 符号</li>
            <li>• 支持批量处理多条记录</li>
            <li>• 快捷键：Ctrl+Enter 快速格式化</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default DiscordFormatter;
