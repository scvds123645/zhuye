import { useState, useEffect, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Copy, Eraser, CheckCircle2, FileText, Minus, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageLayout from "@/components/PageLayout";

const TextDeduplicator = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [originalCount, setOriginalCount] = useState(0);
  const [uniqueCount, setUniqueCount] = useState(0);
  const [removedCount, setRemovedCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const deduplicateText = useCallback(() => {
    if (!inputText.trim()) {
      setOutputText("");
      setOriginalCount(0);
      setUniqueCount(0);
      setRemovedCount(0);
      return;
    }

    const lines = inputText.split("\n");
    const original = lines.filter((line) => line.trim());
    const uniqueLines = [...new Set(original)];

    setOriginalCount(original.length);
    setUniqueCount(uniqueLines.length);
    setRemovedCount(original.length - uniqueLines.length);
    setOutputText(uniqueLines.join("\n"));
  }, [inputText]);

  useEffect(() => {
    const timer = setTimeout(() => {
      deduplicateText();
    }, 300);
    return () => clearTimeout(timer);
  }, [deduplicateText]);

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
    setOriginalCount(0);
    setUniqueCount(0);
    setRemovedCount(0);
  };

  const stats = [
    { label: "原始行数", value: originalCount, icon: FileText, color: "text-muted-foreground" },
    { label: "去重后", value: uniqueCount, icon: CheckCircle2, color: "text-green-500" },
    { label: "已删除", value: removedCount, icon: Minus, color: "text-orange-500" },
  ];

  return (
    <PageLayout
      title="文本去重工具"
      description="输入多行文本，自动去除重复行"
      backTo="/tools"
      backLabel="返回工具列表"
    >
      {/* Statistics Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4 bg-card border-border card-shadow hover:bg-secondary/30 fb-transition">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
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
            placeholder="粘贴文本内容，每行一条数据..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[400px] font-mono text-sm bg-background border-border focus:border-primary fb-transition"
          />
        </Card>

        {/* Output Section */}
        <div className="space-y-4">
          <Card className="p-5 bg-card border-border card-shadow">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base font-semibold">去重结果</Label>
              {removedCount > 0 && (
                <span className="text-sm text-orange-500 px-3 py-1 rounded-full bg-orange-500/10">
                  已去除 {removedCount} 行
                </span>
              )}
            </div>
            <ScrollArea className="h-[400px] w-full rounded-lg border border-border bg-background">
              <div className="p-4">
                {outputText ? (
                  <pre className="font-mono text-sm whitespace-pre-wrap break-all text-foreground">{outputText}</pre>
                ) : (
                  <p className="text-muted-foreground text-sm">去重结果将显示在这里...</p>
                )}
              </div>
            </ScrollArea>
          </Card>

          <div className="flex gap-3">
            <Button onClick={handleCopy} className="flex-1 py-6 bg-primary hover:bg-primary/90 fb-transition" disabled={!outputText}>
              {copied ? <CheckCircle2 className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
              {copied ? "已复制" : "复制结果"}
            </Button>
            <Button onClick={handleClear} variant="outline" className="flex-1 py-6 border-2 border-border hover:bg-secondary fb-transition">
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
              <li>• 每行一条数据，工具会自动去除完全相同的重复行</li>
              <li>• 空行会被自动过滤</li>
              <li>• 保持原始数据的首次出现顺序</li>
              <li>• 实时处理，无需点击按钮</li>
            </ul>
          </div>
        </div>
      </Card>
    </PageLayout>
  );
};

export default TextDeduplicator;
