import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Wand2, CheckCircle2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageLayout from "@/components/PageLayout";

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
      toast({ title: "请输入账号信息！", variant: "destructive" });
      return;
    }

    const lines = inputText.split("\n").filter((line) => line.trim());
    const formattedResults: FormattedResult[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const parts = line.split(/\s+/);

      if (parts.length !== 2) {
        toast({ title: `第 ${i + 1} 行格式错误`, description: '应为 "账号@域名.xyz 密钥" 格式', variant: "destructive" });
        return;
      }

      const [email, key] = parts;

      if (!email.includes("@")) {
        toast({ title: `第 ${i + 1} 行格式错误`, description: "邮箱必须包含 @ 符号", variant: "destructive" });
        return;
      }

      const formatted = `账号 ${email} 密码 ${email} 接码地址 https://2.584136.xyz/${key}`;
      formattedResults.push({ email, key, formatted });
    }

    setResults(formattedResults);
  };

  const handleCopyAll = async () => {
    if (results.length === 0) {
      toast({ title: "没有内容可复制", variant: "destructive" });
      return;
    }

    const allText = results.map((r) => r.formatted).join("\n");

    try {
      await navigator.clipboard.writeText(allText);
      setShowCopySuccess(true);
      setTimeout(() => setShowCopySuccess(false), 2000);
    } catch {
      toast({ title: "复制失败", variant: "destructive" });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === "Enter") {
      e.preventDefault();
      handleFormat();
    }
  };

  return (
    <PageLayout
      title="账号信息格式化工具"
      description="输入账号信息，自动格式化为标准格式"
      backTo="/tools"
      backLabel="返回工具列表"
    >
      <div className="space-y-6">
        {/* Input Section */}
        <Card className="p-5 bg-card border-border card-shadow">
          <label className="text-base font-semibold text-foreground block mb-3">
            输入账号信息
            <span className="text-muted-foreground ml-2 font-normal text-sm">
              （格式：账号@域名.xyz 密钥，每行一条）
            </span>
          </label>
          <Textarea
            placeholder="example@domain.xyz abc123&#10;user@site.com key456&#10;...&#10;&#10;提示：可以按 Ctrl+Enter 快速格式化"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-[200px] font-mono text-sm bg-background border-border focus:border-primary fb-transition"
          />
          <Button onClick={handleFormat} className="w-full mt-4 py-6 bg-primary hover:bg-primary/90 font-semibold fb-transition" size="lg">
            <Wand2 className="mr-2 h-5 w-5" />
            格式化
          </Button>
        </Card>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                格式化结果 <span className="text-primary">({results.length} 条)</span>
              </h2>
              <Button onClick={handleCopyAll} variant="outline" className="border-2 border-border hover:bg-secondary fb-transition">
                {showCopySuccess ? <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" /> : <Copy className="mr-2 h-4 w-4" />}
                {showCopySuccess ? "已复制" : "复制全部"}
              </Button>
            </div>

            {/* Copy Success Message */}
            {showCopySuccess && (
              <div className="bg-green-500/10 border border-green-500/30 text-green-500 px-4 py-3 rounded-lg text-center font-medium animate-fade-in">
                已复制到剪贴板！
              </div>
            )}

            {/* Results Cards */}
            <div className="space-y-3">
              {results.map((result, index) => (
                <Card key={index} className="p-4 bg-card border-border card-shadow hover:bg-secondary/30 fb-transition">
                  <pre className="font-mono text-sm whitespace-pre-wrap break-all text-foreground">
                    {result.formatted}
                  </pre>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <Card className="p-5 bg-card border-border card-shadow">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">使用说明</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 每行输入一条账号信息，格式为：账号@域名.xyz 密钥</li>
                <li>• 账号和密钥之间用空格分隔</li>
                <li>• 邮箱必须包含 @ 符号</li>
                <li>• 支持批量处理多条记录</li>
                <li>• 快捷键：Ctrl+Enter 快速格式化</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
};

export default DiscordFormatter;
