import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Eraser, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

const TextDeduplicator = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [originalCount, setOriginalCount] = useState(0);
  const [uniqueCount, setUniqueCount] = useState(0);
  const [removedCount, setRemovedCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

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
    setOriginalCount(0);
    setUniqueCount(0);
    setRemovedCount(0);
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
          <h1 className="text-3xl font-bold text-foreground">文本去重工具</h1>
          <p className="text-muted-foreground">输入多行文本，自动去除重复行</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 bg-card border-border">
            <div className="text-center space-y-1">
              <p className="text-sm text-muted-foreground">原始行数</p>
              <p className="text-2xl font-bold text-foreground">{originalCount}</p>
            </div>
          </Card>
          <Card className="p-4 bg-card border-border">
            <div className="text-center space-y-1">
              <p className="text-sm text-muted-foreground">去重后行数</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{uniqueCount}</p>
            </div>
          </Card>
          <Card className="p-4 bg-card border-border">
            <div className="text-center space-y-1">
              <p className="text-sm text-muted-foreground">删除重复</p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{removedCount}</p>
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="input" className="text-base font-semibold">
                输入文本
              </Label>
              <Textarea
                id="input"
                placeholder="粘贴文本内容，每行一条数据..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[500px] font-mono text-sm"
              />
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="output" className="text-base font-semibold">
                  去重结果
                </Label>
                {removedCount > 0 && (
                  <span className="text-sm text-muted-foreground">
                    已去除 {removedCount} 行重复
                  </span>
                )}
              </div>
              <ScrollArea className="h-[500px] w-full rounded-md border bg-muted/30">
                <div className="p-4">
                  {outputText ? (
                    <pre className="font-mono text-sm whitespace-pre-wrap break-all text-foreground">
                      {outputText}
                    </pre>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      去重结果将显示在这里...
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
            <li>• 每行一条数据，工具会自动去除完全相同的重复行</li>
            <li>• 空行会被自动过滤</li>
            <li>• 保持原始数据的首次出现顺序</li>
            <li>• 实时处理，无需点击按钮</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default TextDeduplicator;
