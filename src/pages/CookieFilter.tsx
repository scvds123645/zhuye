import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Eraser, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const navigate = useNavigate();

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
    setResultCount(0);
  };

  const handleCheckboxChange = (field: "c_user" | "xs") => {
    setSelectedFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
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
          <h1 className="text-3xl font-bold text-foreground">Cookie 筛选工具</h1>
          <p className="text-muted-foreground">输入cookie字符串，选择要筛选的字段</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="input" className="text-base font-semibold">
                输入 Cookie 字符串
              </Label>
              <Textarea
                id="input"
                placeholder="粘贴cookie字符串，支持多行输入..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[400px] font-mono text-sm"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">筛选字段</Label>
              <div className="flex flex-col gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="c_user"
                    checked={selectedFields.c_user}
                    onCheckedChange={() => handleCheckboxChange("c_user")}
                    className="border-primary data-[state=checked]:bg-primary"
                  />
                  <Label
                    htmlFor="c_user"
                    className="text-sm font-normal cursor-pointer"
                  >
                    c_user
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="xs"
                    checked={selectedFields.xs}
                    onCheckedChange={() => handleCheckboxChange("xs")}
                    className="border-primary data-[state=checked]:bg-primary"
                  />
                  <Label
                    htmlFor="xs"
                    className="text-sm font-normal cursor-pointer"
                  >
                    xs
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="output" className="text-base font-semibold">
                  筛选结果
                </Label>
                <span className="text-sm text-muted-foreground">
                  {resultCount} 条结果
                </span>
              </div>
              <ScrollArea className="h-[400px] w-full rounded-md border bg-muted/30">
                <div className="p-4">
                  {outputText ? (
                    <pre className="font-mono text-sm whitespace-pre-wrap break-all text-foreground">
                      {outputText}
                    </pre>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      筛选结果将显示在这里...
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
      </div>
    </div>
  );
};

export default CookieFilter;
