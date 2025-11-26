import { useState, useEffect, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Copy, Eraser, CheckCircle2, Hash, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageLayout from "@/components/PageLayout";
import { z } from "zod";

const inputSchema = z.object({
  text: z.string()
    .max(100000, { message: "输入文本不能超过100,000字符" })
});

const NumberExtractor = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [uniqueCount, setUniqueCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { toast } = useToast();

  const extractNumbers = useCallback(() => {
    // Validate input
    const validation = inputSchema.safeParse({ text: inputText });
    if (!validation.success) {
      setValidationError(validation.error.errors[0].message);
      setOutputText("");
      setTotalCount(0);
      setUniqueCount(0);
      return;
    }
    
    setValidationError(null);

    if (!inputText.trim()) {
      setOutputText("");
      setTotalCount(0);
      setUniqueCount(0);
      return;
    }

    // Extract all 14-digit numbers
    const regex = /\b\d{14}\b/g;
    const matches = inputText.match(regex) || [];
    
    // Remove duplicates while preserving order
    const uniqueNumbers = [...new Set(matches)];
    
    setTotalCount(matches.length);
    setUniqueCount(uniqueNumbers.length);
    setOutputText(uniqueNumbers.join("\n"));
  }, [inputText]);

  useEffect(() => {
    const timer = setTimeout(() => {
      extractNumbers();
    }, 300);
    return () => clearTimeout(timer);
  }, [extractNumbers]);

  const handleCopy = async () => {
    if (!outputText) {
      toast({ title: "没有内容可复制", variant: "destructive" });
      return;
    }
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      toast({ title: "已复制到剪贴板" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "复制失败", variant: "destructive" });
    }
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setTotalCount(0);
    setUniqueCount(0);
    setValidationError(null);
  };

  const stats = [
    { label: "找到数量", value: totalCount, color: "text-primary" },
    { label: "去重后", value: uniqueCount, color: "text-green-500" },
    { label: "已删除", value: totalCount - uniqueCount, color: "text-orange-500" },
  ];

  return (
    <PageLayout
      title="14位数字提取工具"
      description="自动提取文本中的14位连续数字，智能去重"
      backTo="/tools"
      backLabel="返回工具列表"
    >
      {/* Statistics Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4 bg-card border-border card-shadow hover:bg-secondary/30 fb-transition">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Hash className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="p-5 bg-card border-border card-shadow">
          <Label htmlFor="input" className="text-base font-semibold mb-3 block">
            输入文本
          </Label>
          <Textarea
            id="input"
            placeholder="粘贴包含14位数字的文本...&#10;&#10;示例：&#10;用户12345678901234注册成功&#10;订单号：98765432109876&#10;账号：11111111111111"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[400px] font-mono text-sm bg-background border-border focus:border-primary fb-transition"
          />
          {validationError && (
            <p className="text-sm text-destructive mt-2">{validationError}</p>
          )}
          <div className="mt-2 text-xs text-muted-foreground">
            已输入: {inputText.length.toLocaleString()} / 100,000 字符
          </div>
        </Card>

        {/* Output Section */}
        <div className="space-y-4">
          <Card className="p-5 bg-card border-border card-shadow">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base font-semibold">提取结果</Label>
              {uniqueCount > 0 && (
                <span className="text-sm text-primary px-3 py-1 rounded-full bg-primary/10">
                  {uniqueCount} 个号码
                </span>
              )}
            </div>
            <ScrollArea className="h-[400px] w-full rounded-lg border border-border bg-background">
              <div className="p-4">
                {outputText ? (
                  <pre className="font-mono text-sm whitespace-pre-wrap break-all text-foreground">
                    {outputText}
                  </pre>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    {validationError ? "请修正错误后重试" : "提取的号码将显示在这里..."}
                  </p>
                )}
              </div>
            </ScrollArea>
          </Card>

          <div className="flex gap-3">
            <Button 
              onClick={handleCopy} 
              className="flex-1 py-6 bg-primary hover:bg-primary/90 fb-transition" 
              disabled={!outputText}
            >
              {copied ? <CheckCircle2 className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
              {copied ? "已复制" : "复制结果"}
            </Button>
            <Button 
              onClick={handleClear} 
              variant="outline" 
              className="flex-1 py-6 border-2 border-border hover:bg-secondary fb-transition"
            >
              <Eraser className="mr-2 h-4 w-4" />
              清空
            </Button>
          </div>
        </div>
      </div>

      {/* Usage Tips */}
      <Card className="mt-6 p-5 bg-card border-border card-shadow">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">使用说明</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• 自动识别并提取文本中所有14位连续数字</li>
              <li>• 支持混合文本，智能分离数字和其他字符</li>
              <li>• 自动去除重复号码，保留首次出现的号码</li>
              <li>• 每行输出一个号码，方便批量处理</li>
              <li>• 最大支持100,000字符的文本输入</li>
            </ul>
          </div>
        </div>
      </Card>
    </PageLayout>
  );
};

export default NumberExtractor;
