import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Eraser, ArrowLeft, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  const navigate = useNavigate();

  const extractCUser = (cookieString: string): string | null => {
    const match = cookieString.match(/c_user=([^;]+)/);
    return match ? match[1] : null;
  };

  const convertCookies = useCallback(() => {
    // 检查必填项
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
          // 格式1: c_user值--密码--原cookie字符串
          results.push(`${cUser}--${password}--${line}`);
        } else {
          // 格式2: c_user值---密码
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
    setInputCookies("");
    setPassword("");
    setOutputText("");
    setResultCount(0);
    setErrorCount(0);
    setShowError(false);
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
          <h1 className="text-3xl font-bold text-foreground">Cookie 格式转换工具</h1>
          <p className="text-muted-foreground">输入Cookie字符串和密码，选择输出格式进行转换</p>
        </div>

        {showError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              请输入 Cookie 和密码后再进行转换
            </AlertDescription>
          </Alert>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cookies" className="text-base font-semibold">
                输入 Cookie 字符串 <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="cookies"
                placeholder="粘贴cookie字符串，支持多行输入..."
                value={inputCookies}
                onChange={(e) => setInputCookies(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-base font-semibold">
                密码 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="password"
                type="text"
                placeholder="请输入密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="font-mono"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">输出格式</Label>
              <RadioGroup
                value={formatType}
                onValueChange={(value) => setFormatType(value as FormatType)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="format1" id="format1" />
                  <Label htmlFor="format1" className="text-sm font-normal cursor-pointer">
                    格式1：c_user值--密码--原cookie字符串
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="format2" id="format2" />
                  <Label htmlFor="format2" className="text-sm font-normal cursor-pointer">
                    格式2：c_user值---密码
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="output" className="text-base font-semibold">
                  转换结果
                </Label>
                <div className="flex gap-3 text-sm">
                  <span className="text-green-600 dark:text-green-400">
                    {resultCount} 条成功
                  </span>
                  {errorCount > 0 && (
                    <span className="text-destructive">
                      {errorCount} 条错误
                    </span>
                  )}
                </div>
              </div>
              <ScrollArea className="h-[400px] w-full rounded-md border bg-muted/30">
                <div className="p-4">
                  {outputText ? (
                    <pre className="font-mono text-sm whitespace-pre-wrap break-all">
                      {outputText.split("\n").map((line, index) => (
                        <div
                          key={index}
                          className={
                            line.startsWith("[错误]")
                              ? "text-destructive"
                              : "text-foreground"
                          }
                        >
                          {line}
                        </div>
                      ))}
                    </pre>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      {showError
                        ? "请先输入 Cookie 和密码"
                        : "转换结果将显示在这里..."}
                    </p>
                  )}
                </div>
              </ScrollArea>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleCopy}
                className="flex-1"
                disabled={!outputText || showError}
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
      </div>
    </div>
  );
};

export default CookieConverter;
