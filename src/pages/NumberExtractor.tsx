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
    { label: "找到数量", value: totalCount, icon: Hash, color: "text-blue-600", bgColor: "bg-blue-100" },
    { label: "去重后", value: uniqueCount, icon: CheckCircle2, color: "text-green-600", bgColor: "bg-green-100" },
    { label: "已删除", value: totalCount - uniqueCount, icon: Eraser, color: "text-orange-600", bgColor: "bg-orange-100" },
  ];

  return (
    <PageLayout
      title="14位数字提取工具"
      description="自动提取文本中的14位连续数字，智能去重"
      backTo="/tools"
      backLabel="返回工具列表"
    >
      {/* --- 统计信息卡片 --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4 border rounded-xl transition-all hover:border-gray-300">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* --- 输入区域 --- */}
        <div className="space-y-3">
          <Label htmlFor="input" className="text-base font-medium text-gray-800">
            输入文本
          </Label>
          <Textarea
            id="input"
            placeholder="粘贴包含14位数字的文本...&#10;&#10;示例：&#10;用户12345678901234注册成功&#10;订单号：98765432109876&#10;账号：11111111111111"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[400px] font-mono text-sm bg-gray-50 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          />
          {validationError && (
            <p className="text-sm text-red-600 mt-1">{validationError}</p>
          )}
          <div className="text-xs text-gray-500 text-right">
            {inputText.length.toLocaleString()} / 100,000
          </div>
        </div>

        {/* --- 输出区域 --- */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium text-gray-800">提取结果</Label>
            {uniqueCount > 0 && (
              <span className="text-sm font-medium text-blue-700 px-3 py-1 rounded-full bg-blue-100">
                {uniqueCount} 个号码
              </span>
            )}
          </div>
          <ScrollArea className="h-[400px] w-full rounded-lg border bg-gray-50">
            <div className="p-4">
              {outputText ? (
                <pre className="font-mono text-sm whitespace-pre-wrap break-all text-gray-800">
                  {outputText}
                </pre>
              ) : (
                <p className="text-gray-500 text-sm">
                  {validationError ? "请修正输入错误" : "提取的号码将显示在这里..."}
                </p>
              )}
            </div>
          </ScrollArea>
          
          <div className="flex gap-3">
            {/* --- Google 风格的主要按钮（填充） --- */}
            <Button 
                onClick={handleCopy} 
                className="flex-1 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-3 transition-colors disabled:bg-gray-300" 
                disabled={!outputText}>
              {copied ? <CheckCircle2 className="mr-2 h-5 w-5" /> : <Copy className="mr-2 h-5 w-5" />}
              {copied ? "已复制" : "复制结果"}
            </Button>
            
            {/* --- Google 风格的次要按钮（轮廓） --- */}
            <Button 
                onClick={handleClear} 
                variant="outline" 
                className="flex-1 text-blue-600 border-gray-300 hover:bg-blue-50 font-medium rounded-lg text-base px-5 py-3 transition-colors">
              <Eraser className="mr-2 h-5 w-5" />
              清空
            </Button>
          </div>
        </div>
      </div>
      
      {/* --- 使用说明 --- */}
      <Card className="mt-6 p-5 border rounded-xl">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">使用说明</h3>
            <ul className="space-y-1 text-sm text-gray-600 list-disc list-inside">
              <li>自动识别并提取文本中所有14位连续数字。</li>
              <li>支持混合文本，智能分离数字和其他字符。</li>
              <li>自动去除重复号码，保留首次出现的号码。</li>
              <li>每行输出一个号码，方便批量处理。</li>
              <li>最大支持100,000字符的文本输入。</li>
            </ul>
          </div>
        </div>
      </Card>
    </PageLayout>
  );
};

export default NumberExtractor;

