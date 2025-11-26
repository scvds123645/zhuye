import { useState, useEffect, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Copy, Eraser, AlertCircle, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import PageLayout from "@/components/PageLayout";

type FormatType = "format1" | "format2";

const CookieConverter = () => {
  const [inputCookies, setInputCookies] = useState("");
  const [password, setPassword] = useState("");
  const [formatType, setFormatType] = useState<FormatType>("format1");
  const [outputText, setOutputText] = useState("");
  const [resultCount, setResultCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [showError, setShowError] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const extractCUser = (cookieString: string): string | null => {
    const match = cookieString.match(/c_user=([^;]+)/);
    return match ? match[1] : null;
  };

  const convertCookies = useCallback(() => {
    if (!inputCookies.trim() || !password.trim()) {
      setShowError(true);
      setOutputText("");
      setResultCount(0);
      setErrorCount(0);
      return;
    }

    setShowError(false);
    const lines = inputCookies.split("\n").filter((line) => line.trim());
    const results: string[] = [];
    let errors = 0;

    lines.forEach((line) => {
      const cUser = extractCUser(line);
      if (!cUser) {
        results.push(`[错误] 未找到 c_user: ${line.substring(0, 50)}...`);
        errors++;
      } else {
        if (formatType === "format1") {
          results.push(`${cUser}--${password}--${line}`);
        } else {
          results.push(`${cUser}---${password}`);
        }
      }
    });

    setOutputText(results.join("\n"));
    setResultCount(results.length - errors);
    setErrorCount(errors);
  }, [inputCookies, password, formatType]);

  useEffect(() => {
    const timer = setTimeout(() => {
      convertCookies();
    }, 300);
    return () => clearTimeout(timer);
  }, [convertCookies]);

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
    setInputCookies("");
    setPassword("");
    setOutputText("");
    setResultCount(0);
    setErrorCount(0);
    setShowError(false);
  };

  return (
    <PageLayout
      title="Cookie 格式转换工具"
      description="输入Cookie字符串和密码，选择输出格式进行转换"
      backTo="/tools"
      backLabel="返回工具列表"
    >
      {showError && (
        <Alert variant="destructive" className="mb-6 border-destructive/50 bg-destructive/10">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>请输入 Cookie 和密码后再进行转换</AlertDescription>
        </Alert>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <Card className="p-5 bg-card border-border card-shadow">
            <Label htmlFor="cookies" className="text-base font-semibold mb-3 block">
              输入 Cookie 字符串 <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="cookies"
              placeholder="粘贴cookie字符串，支持多行输入..."
              value={inputCookies}
              onChange={(e) => setInputCookies(e.target.value)}
              className="min-h-[250px] font-mono text-sm bg-background border-border focus:border-primary fb-transition"
            />
          </Card>

          <Card className="p-5 bg-card border-border card-shadow">
            <Label htmlFor="password" className="text-base font-semibold mb-3 block">
              密码 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="password"
              type="text"
              placeholder="请输入密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="font-mono bg-background border-border focus:border-primary fb-transition"
            />
          </Card>

          <Card className="p-5 bg-card border-border card-shadow">
            <Label className="text-base font-semibold mb-3 block">输出格式</Label>
            <RadioGroup value={formatType} onValueChange={(value) => setFormatType(value as FormatType)}>
              {[
                { value: "format1", label: "格式1：c_user值--密码--原cookie字符串" },
                { value: "format2", label: "格式2：c_user值---密码" },
              ].map((format) => (
                <div key={format.value} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary fb-transition">
                  <RadioGroupItem value={format.value} id={format.value} />
                  <Label htmlFor={format.value} className="text-sm cursor-pointer">{format.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </Card>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <Card className="p-5 bg-card border-border card-shadow">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base font-semibold">转换结果</Label>
              <div className="flex gap-3 text-sm">
                <span className="text-green-500 px-2 py-0.5 rounded-full bg-green-500/10">{resultCount} 成功</span>
                {errorCount > 0 && <span className="text-destructive px-2 py-0.5 rounded-full bg-destructive/10">{errorCount} 错误</span>}
              </div>
            </div>
            <ScrollArea className="h-[350px] w-full rounded-lg border border-border bg-background">
              <div className="p-4">
                {outputText ? (
                  <pre className="font-mono text-sm whitespace-pre-wrap break-all">
                    {outputText.split("\n").map((line, index) => (
                      <div key={index} className={line.startsWith("[错误]") ? "text-destructive" : "text-foreground"}>
                        {line}
                      </div>
                    ))}
                  </pre>
                ) : (
                  <p className="text-muted-foreground text-sm">{showError ? "请先输入 Cookie 和密码" : "转换结果将显示在这里..."}</p>
                )}
              </div>
            </ScrollArea>
          </Card>

          <div className="flex gap-3">
            <Button onClick={handleCopy} className="flex-1 py-6 bg-primary hover:bg-primary/90 fb-transition" disabled={!outputText || showError}>
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
    </PageLayout>
  );
};

export default CookieConverter;
