import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Eraser, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

const EmailDomainFormatter = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [addAtSymbol, setAddAtSymbol] = useState(true);
  const [addQuotes, setAddQuotes] = useState(false);
  const [domainCount, setDomainCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const formatDomains = useCallback(() => {
    if (!inputText.trim()) {
      setOutputText("");
      setDomainCount(0);
      return;
    }

    // 按行或逗号分割，并去除空白项
    const domains = inputText
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter((item) => item);

    // 格式化处理
    const formatted = domains.map((domain) => {
      let result = domain;
      
      // 添加 @ 前缀
      if (addAtSymbol && !domain.startsWith("@")) {
        result = `@${result}`;
      }
      
      // 添加引号包裹
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
      toast({
        title: "没有内容可复制",
        variant: "destructive",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      toast({
        title: "已复制到剪贴板",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "复制失败",
        variant: "destructive",
      });
    }
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setDomainCount(0);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/tools')}
            className="mb-2 -ml-2"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            返回工具列表
          </Button>
          <h1 className="text-3xl font-bold text-foreground">域名转邮箱后缀格式化工具</h1>
          <p className="text-muted-foreground">输入域名列表，自动转换为邮箱后缀格式</p>
        </div>

        {/* Statistics */}
        <Card className="p-4 bg-card border-border">
          <div className="text-center space-y-1">
            <p className="text-sm text-muted-foreground">处理域名数量</p>
            <p className="text-2xl font-bold text-foreground">{domainCount}</p>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="input" className="text-base font-semibold">
                输入域名列表
              </Label>
              <Textarea
                id="input"
                placeholder="输入域名，支持逗号或换行分隔&#10;例如：&#10;gmail.com&#10;outlook.com, yahoo.com&#10;hotmail.com"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[400px] font-mono text-sm"
              />
            </div>

            {/* Format Options */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">格式选项</Label>
              <div className="flex flex-col gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="at-symbol"
                    checked={addAtSymbol}
                    onCheckedChange={(checked) => setAddAtSymbol(checked === true)}
                    className="border-primary data-[state=checked]:bg-primary"
                  />
                  <Label
                    htmlFor="at-symbol"
                    className="text-sm font-normal cursor-pointer"
                  >
                    添加 @ 前缀
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="quotes"
                    checked={addQuotes}
                    onCheckedChange={(checked) => setAddQuotes(checked === true)}
                    className="border-primary data-[state=checked]:bg-primary"
                  />
                  <Label
                    htmlFor="quotes"
                    className="text-sm font-normal cursor-pointer"
                  >
                    添加引号包裹 ""
                  </Label>
                </div>
              </div>
            </div>

            {/* Preview Example */}
            <Card className="p-3 bg-muted/50 border-border">
              <p className="text-xs text-muted-foreground mb-2">预览示例：</p>
              <p className="text-xs font-mono text-foreground">
                {addQuotes && '"'}
                {addAtSymbol && '@'}
                example.com
                {addQuotes && '"'}
                , {addQuotes && '"'}
                {addAtSymbol && '@'}
                domain.com
                {addQuotes && '"'}
              </p>
            </Card>
          </div>

          {/* Output Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="output" className="text-base font-semibold">
                  格式化结果
                </Label>
                {domainCount > 0 && (
                  <span className="text-sm text-muted-foreground">
                    {domainCount} 个域名
                  </span>
                )}
              </div>
              <ScrollArea className="h-[400px] w-full rounded-md border bg-muted/30">
                <div className="p-4">
                  {outputText ? (
                    <pre className="font-mono text-sm whitespace-pre-wrap break-all text-foreground">
                      {outputText}
                    </pre>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      格式化结果将显示在这里...
                    </p>
                  )}
                </div>
              </ScrollArea>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleCopy}
                className="flex-1"
                disabled={!outputText}
              >
                <Copy className="mr-2 h-4 w-4" />
                {copied ? "已复制" : "复制结果"}
              </Button>
              <Button
                onClick={handleClear}
                variant="secondary"
                className="flex-1"
              >
                <Eraser className="mr-2 h-4 w-4" />
                清空
              </Button>
            </div>
          </div>
        </div>

        {/* Usage Tips */}
        <Card className="p-4 bg-muted/50 border-border">
          <h3 className="font-semibold text-foreground mb-2">使用说明</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• 支持按行或逗号分隔输入域名</li>
            <li>• 可选择添加 @ 前缀，将域名转换为邮箱后缀格式</li>
            <li>• 可选择添加引号包裹，适用于各种配置文件</li>
            <li>• 实时预览，所见即所得</li>
            <li>• 输出结果以逗号+空格分隔</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default EmailDomainFormatter;
