import { useState, useEffect, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Copy, Eraser, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageLayout from "@/components/PageLayout";

const CookieFilter = () => {
  const [inputText, setInputText] = useState("");
  const [selectedFields, setSelectedFields] = useState({
    c_user: true,
    xs: true,
  });
  const [outputText, setOutputText] = useState("");
  const [resultCount, setResultCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const processCookies = useCallback(() => {
    if (!inputText.trim()) {
      setOutputText("");
      setResultCount(0);
      return;
    }

    const lines = inputText.split("\n").filter((line) => line.trim());
    const results: string[] = [];

    lines.forEach((line) => {
      const cookies = line.split(";").map((c) => c.trim());
      const filteredPairs: string[] = [];

      cookies.forEach((cookie) => {
        const [key, value] = cookie.split("=").map((s) => s.trim());
        if (key && value) {
          if (selectedFields.c_user && key === "c_user") {
            filteredPairs.push(`${key}=${value}`);
          }
          if (selectedFields.xs && key === "xs") {
            filteredPairs.push(`${key}=${value}`);
          }
        }
      });

      if (filteredPairs.length > 0) {
        results.push(filteredPairs.join("; "));
      }
    });

    setOutputText(results.join("\n"));
    setResultCount(results.length);
  }, [inputText, selectedFields]);

  useEffect(() => {
    const timer = setTimeout(() => {
      processCookies();
    }, 300);
    return () => clearTimeout(timer);
  }, [processCookies]);

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
    setResultCount(0);
  };

  return (
    <PageLayout
      title="Cookie 筛选工具"
      description="输入cookie字符串，选择要筛选的字段"
      backTo="/tools"
      backLabel="返回工具列表"
    >
      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <Card className="p-5 bg-card/50 border-border/50">
            <Label htmlFor="input" className="text-base font-semibold mb-3 block">
              输入 Cookie 字符串
            </Label>
            <Textarea
              id="input"
              placeholder="粘贴cookie字符串，支持多行输入..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[350px] font-mono text-sm bg-background/50 border-border/50 focus:border-primary/50"
            />
          </Card>

          <Card className="p-5 bg-card/50 border-border/50">
            <Label className="text-base font-semibold mb-3 block">筛选字段</Label>
            <div className="flex flex-col gap-3">
              {[
                { id: "c_user", label: "c_user" },
                { id: "xs", label: "xs" },
              ].map((field) => (
                <div key={field.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                  <Checkbox
                    id={field.id}
                    checked={selectedFields[field.id as keyof typeof selectedFields]}
                    onCheckedChange={() =>
                      setSelectedFields((prev) => ({
                        ...prev,
                        [field.id]: !prev[field.id as keyof typeof selectedFields],
                      }))
                    }
                    className="border-primary data-[state=checked]:bg-primary"
                  />
                  <Label htmlFor={field.id} className="text-sm font-mono cursor-pointer">
                    {field.label}
                  </Label>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <Card className="p-5 bg-card/50 border-border/50">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base font-semibold">筛选结果</Label>
              <span className="text-sm text-muted-foreground px-3 py-1 rounded-full bg-secondary/50">
                {resultCount} 条结果
              </span>
            </div>
            <ScrollArea className="h-[350px] w-full rounded-lg border border-border/50 bg-background/30">
              <div className="p-4">
                {outputText ? (
                  <pre className="font-mono text-sm whitespace-pre-wrap break-all text-foreground">
                    {outputText}
                  </pre>
                ) : (
                  <p className="text-muted-foreground text-sm">筛选结果将显示在这里...</p>
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
    </PageLayout>
  );
};

export default CookieFilter;
