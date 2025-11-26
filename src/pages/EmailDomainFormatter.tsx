import { useState, useEffect, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Copy, Eraser, CheckCircle2, AtSign, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageLayout from "@/components/PageLayout";

const EmailDomainFormatter = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [addAtSymbol, setAddAtSymbol] = useState(true);
  const [addQuotes, setAddQuotes] = useState(false);
  const [domainCount, setDomainCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const formatDomains = useCallback(() => {
    if (!inputText.trim()) {
      setOutputText("");
      setDomainCount(0);
      return;
    }

    const domains = inputText
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter((item) => item);

    const formatted = domains.map((domain) => {
      let result = domain;
      if (addAtSymbol && !domain.startsWith("@")) {
        result = `@${result}`;
      }
      if (addQuotes) {
        result = `"${result}"`;
      }
      return result;
    });

    setDomainCount(domains.length);
    setOutputText(formatted.join(", "));
  }, [inputText, addAtSymbol, addQuotes]);

  useEffect(() => {
    const timer = setTimeout(() => {
      formatDomains();
    }, 300);
    return () => clearTimeout(timer);
  }, [formatDomains]);

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
    setDomainCount(0);
  };

  return (
    <PageLayout
      title="域名转邮箱后缀工具"
      description="输入域名列表，自动转换为邮箱后缀格式"
      backTo="/tools"
      backLabel="返回工具列表"
    >
      {/* Statistics */}
      <Card className="p-4 bg-card/50 border-border/50 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <AtSign className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">处理域名数量</p>
            <p className="text-3xl font-bold text-foreground">{domainCount}</p>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <Card className="p-5 bg-card/50 border-border/50">
            <Label htmlFor="input" className="text-base font-semibold mb-3 block">
              输入域名列表
            </Label>
            <Textarea
              id="input"
              placeholder="输入域名，支持逗号或换行分隔&#10;例如：&#10;gmail.com&#10;outlook.com, yahoo.com"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[300px] font-mono text-sm bg-background/50 border-border/50 focus:border-primary/50"
            />
          </Card>

          <Card className="p-5 bg-card/50 border-border/50">
            <Label className="text-base font-semibold mb-3 block">格式选项</Label>
            <div className="space-y-3">
              {[
                { id: "at-symbol", label: "添加 @ 前缀", checked: addAtSymbol, onChange: setAddAtSymbol },
                { id: "quotes", label: '添加引号包裹 ""', checked: addQuotes, onChange: setAddQuotes },
              ].map((option) => (
                <div key={option.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                  <Checkbox
                    id={option.id}
                    checked={option.checked}
                    onCheckedChange={(checked) => option.onChange(checked === true)}
                    className="border-primary data-[state=checked]:bg-primary"
                  />
                  <Label htmlFor={option.id} className="text-sm cursor-pointer">{option.label}</Label>
                </div>
              ))}
            </div>

            {/* Preview */}
            <div className="mt-4 p-3 rounded-lg bg-secondary/30 border border-border/50">
              <p className="text-xs text-muted-foreground mb-1">预览示例：</p>
              <p className="text-sm font-mono text-primary">
                {addQuotes && '"'}{addAtSymbol && '@'}example.com{addQuotes && '"'}, {addQuotes && '"'}{addAtSymbol && '@'}domain.com{addQuotes && '"'}
              </p>
            </div>
          </Card>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <Card className="p-5 bg-card/50 border-border/50">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base font-semibold">格式化结果</Label>
              {domainCount > 0 && (
                <span className="text-sm text-muted-foreground px-3 py-1 rounded-full bg-secondary/50">
                  {domainCount} 个域名
                </span>
              )}
            </div>
            <ScrollArea className="h-[350px] w-full rounded-lg border border-border/50 bg-background/30">
              <div className="p-4">
                {outputText ? (
                  <pre className="font-mono text-sm whitespace-pre-wrap break-all text-foreground">{outputText}</pre>
                ) : (
                  <p className="text-muted-foreground text-sm">格式化结果将显示在这里...</p>
                )}
              </div>
            </ScrollArea>
          </Card>

          <div className="flex gap-3">
            <Button onClick={handleCopy} className="flex-1 py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90" disabled={!outputText}>
              {copied ? <CheckCircle2 className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
              {copied ? "已复制" : "复制结果"}
            </Button>
            <Button onClick={handleClear} variant="outline" className="flex-1 py-6 border-border/50 hover:border-primary/50">
              <Eraser className="mr-2 h-4 w-4" />
              清空
            </Button>
          </div>
        </div>
      </div>

      {/* Usage Tips */}
      <Card className="mt-6 p-5 bg-card/30 border-border/50">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">使用说明</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• 支持按行或逗号分隔输入域名</li>
              <li>• 可选择添加 @ 前缀，将域名转换为邮箱后缀格式</li>
              <li>• 可选择添加引号包裹，适用于各种配置文件</li>
              <li>• 输出结果以逗号+空格分隔</li>
            </ul>
          </div>
        </div>
      </Card>
    </PageLayout>
  );
};

export default EmailDomainFormatter;
