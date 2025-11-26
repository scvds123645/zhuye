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
    { label: "原始行数", value: originalCount, icon: FileText, color: "text-blue-600", bgColor: "bg-blue-100" },
    { label: "去重后", value: uniqueCount, icon: CheckCircle2, color: "text-green-600", bgColor: "bg-green-100" },
    { label: "已删除", value: removedCount, icon: Minus, color: "text-orange-600", bgColor: "bg-orange-100" },
  ];

  return (
    <PageLayout
      title="文本去重工具"
      description="输入多行文本，自动去除重复行"
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
        <div className="space-y-4">
            <Label htmlFor="input" className="text-base font-medium text-gray-800">
              输入文本
            </Label>
            <Textarea
              id="input"
              placeholder="粘贴文本内容，每行一条数据..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[400px] font-mono text-sm bg-gray-50 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
        </div>
        
        {/* --- 输出区域 --- */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium text-gray-800">去重结果</Label>
            {removedCount > 0 && (
              <span className="text-sm text-orange-600 px-3 py-1 rounded-full bg-orange-100">
                已去除 {removedCount} 行
              </span>
            )}
          </div>
          <ScrollArea className="h-[400px] w-full rounded-lg border bg-gray-50">
            <div className="p-4">
              {outputText ? (
                <pre className="font-mono text-sm whitespace-pre-wrap break-all text-gray-800">{outputText}</pre>
              ) : (
                <p className="text-gray-500 text-sm">去重结果将显示在这里...</p>
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
              <li>每行一条数据，工具会自动去除完全相同的重复行。</li>
              <li>空行会被自动过滤，不计入统计。</li>
              <li>结果将保持原始数据的首次出现顺序。</li>
              <li>内容实时处理，无需点击额外按钮。</li>
            </ul>
          </div>
        </div>
      </Card>
    </PageLayout>
  );
};

export default TextDeduplicator;
