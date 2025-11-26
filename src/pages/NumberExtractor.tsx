import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Search, Eraser, FileSearch, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NumberExtractor = () => {
  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // 动态启用/禁用按钮
  useEffect(() => {
    setIsButtonEnabled(inputText.trim().length >= 14);
  }, [inputText]);

  const handleExtract = () => {
    if (!inputText.trim()) {
      toast({
        title: "输入为空",
        description: "请输入包含14位数字的文本内容",
        variant: "destructive",
        duration: 2500,
      });
      return;
    }

    if (inputText.trim().length < 14) {
      toast({
        title: "内容太短",
        description: "输入内容至少需要14个字符",
        variant: "destructive",
        duration: 2500,
      });
      return;
    }

    // 使用正则提取14位数字
    const regex = /\b\d{14}\b/g;
    const matches = inputText.match(regex);

    if (!matches || matches.length === 0) {
      setResults([]);
      toast({
        title: "未找到结果",
        description: "文本中没有找到14位数字",
        variant: "destructive",
        duration: 2500,
      });
      return;
    }

    // 去重
    const uniqueNumbers = Array.from(new Set(matches));
    setResults(uniqueNumbers);
    
    toast({
      title: "提取成功",
      description: `找到 ${uniqueNumbers.length} 个唯一的14位数字`,
      duration: 2500,
    });
  };

  const handleClear = () => {
    setInputText("");
    setResults([]);
  };

  const handleCopyAll = async () => {
    if (results.length === 0) {
      toast({
        title: "没有内容可复制",
        variant: "destructive",
        duration: 2500,
      });
      return;
    }

    const allText = results.join("\n");

    try {
      await navigator.clipboard.writeText(allText);
      toast({
        title: "复制成功",
        description: "已复制所有数字到剪贴板",
        duration: 2500,
      });
    } catch (err) {
      toast({
        title: "复制失败",
        description: "无法复制到剪贴板",
        variant: "destructive",
        duration: 2500,
      });
    }
  };

  const handleCopySingle = async (number: string) => {
    try {
      await navigator.clipboard.writeText(number);
      toast({
        title: "复制成功",
        description: `已复制: ${number}`,
        duration: 2500,
      });
    } catch (err) {
      toast({
        title: "复制失败",
        variant: "destructive",
        duration: 2500,
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === "Enter") {
      e.preventDefault();
      if (isButtonEnabled) {
        handleExtract();
      }
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
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
          <h1 className="text-3xl font-bold text-foreground">
            14位数字提取工具
          </h1>
          <p className="text-muted-foreground">
            从文本中自动提取并去重14位数字
          </p>
        </div>

        {/* Input Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              输入文本内容
              <span className="text-muted-foreground ml-2">
                （至少14个字符）
              </span>
            </label>
            <Textarea
              placeholder="粘贴包含14位数字的文本内容...&#10;&#10;例如：订单号 12345678901234 已处理&#10;&#10;提示：可以按 Ctrl+Enter 快速提取"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-[200px] font-mono text-sm"
            />
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleExtract}
              disabled={!isButtonEnabled}
              className="flex-1"
              size="lg"
            >
              <Search className="mr-2 h-5 w-5" />
              提取数字
            </Button>
            <Button
              onClick={handleClear}
              variant="secondary"
              className="flex-1"
              size="lg"
            >
              <Eraser className="mr-2 h-5 w-5" />
              清空
            </Button>
          </div>
        </div>

        {/* Results Section */}
        {results.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                提取结果
                <span className="ml-2 text-base text-muted-foreground">
                  ({results.length} 个)
                </span>
              </h2>
              <Button onClick={handleCopyAll} variant="outline">
                <Copy className="mr-2 h-4 w-4" />
                复制全部
              </Button>
            </div>

            <div className="grid gap-3">
              {results.map((number, index) => (
                <Card
                  key={index}
                  className="p-4 bg-card border border-border flex items-center justify-between group hover:shadow-md transition-shadow"
                >
                  <span className="font-mono text-lg font-medium text-foreground">
                    {number}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopySingle(number)}
                    className="opacity-60 group-hover:opacity-100 transition-opacity"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          inputText.trim().length >= 14 && (
            <Card className="p-12 bg-muted/50 border-border flex flex-col items-center justify-center text-center space-y-4">
              <FileSearch className="h-16 w-16 text-muted-foreground/50" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  暂无结果
                </h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  文本中没有找到14位数字，请检查输入内容
                </p>
              </div>
            </Card>
          )
        )}

        {/* Instructions */}
        <Card className="p-6 bg-muted/50 border-border">
          <h3 className="font-semibold text-foreground mb-3">功能说明</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• 自动提取文本中所有14位连续数字</li>
            <li>• 自动去除重复的数字</li>
            <li>• 支持批量提取和独立复制</li>
            <li>• 快捷键：Ctrl+Enter 快速提取</li>
            <li>• 使用正则表达式精确匹配（前后必须是单词边界）</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default NumberExtractor;
