
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Bot, Send, User, Sparkles, ArrowRight,
  Brain, Target, CreditCard, PiggyBank, TrendingUp, 
  Coins, FileSpreadsheet, HandHeart, Users, UserCheck 
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type AssistantMessage = {
  role: "assistant" | "user";
  content: string;
  timestamp: Date;
};

const quickRecommendations = [
  {
    icon: <Target className="h-4 w-4" />,
    text: "Help me set financial goals",
    prompt: "I want to set some financial goals. Can you help me create a plan?"
  },
  {
    icon: <PiggyBank className="h-4 w-4" />,
    text: "Create a savings strategy",
    prompt: "I need help creating a savings strategy. What do you recommend?"
  },
  {
    icon: <TrendingUp className="h-4 w-4" />,
    text: "Investment advice",
    prompt: "Can you give me investment recommendations based on my risk profile?"
  },
  {
    icon: <CreditCard className="h-4 w-4" />,
    text: "Analyze my spending",
    prompt: "Can you analyze my spending patterns and suggest improvements?"
  },
  {
    icon: <FileSpreadsheet className="h-4 w-4" />,
    text: "Create a budget plan",
    prompt: "I need help creating a monthly budget. Can you assist?"
  },
  {
    icon: <Coins className="h-4 w-4" />,
    text: "Tax optimization",
    prompt: "How can I optimize my tax savings?"
  }
];

const DashboardAssistant = () => {
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      role: "assistant",
      content: "Hi there! I'm your Kuberium AI finance assistant. I can help you create budgets, set saving goals, optimize investments, and analyze your finances with AI-powered insights. What would you like help with today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (!inputValue.trim()) return;

    const userMessage: AssistantMessage = {
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Simplified payload matching the curl example
      const payload = {
        message: inputValue,
        chat_history: [] // Empty array as shown in the curl example
      };

      console.log('Sending payload:', JSON.stringify(payload, null, 2));

      const response = await fetch("https://180a-2409-40f0-410d-ed2e-b9ad-d122-9476-5e22.ngrok-free.app/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      
      const assistantMessage: AssistantMessage = {
        role: "assistant",
        content: data.response || "Sorry, I couldn't process your request.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to get response from the assistant");
      
      const errorMessage: AssistantMessage = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again later.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleRecommendationClick = (prompt: string) => {
    setInputValue(prompt);
    handleSendMessage();
  };

  return (
    <div className="flex flex-col h-full">
      <CardHeader className="bg-primary/5 p-4 flex flex-row items-center justify-between space-y-0 border-b">
        <CardTitle className="text-xl flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <span>Kuberium Assistant</span>
          <div className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
            <Sparkles className="h-3 w-3 mr-1" />
            <span>AI-Powered</span>
          </div>
        </CardTitle>
      </CardHeader>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start gap-3 rounded-lg p-4",
                message.role === "assistant" 
                  ? "bg-muted/50" 
                  : "bg-primary/5"
              )}
            >
              {message.role === "assistant" ? (
                <Bot className="h-6 w-6 mt-1" />
              ) : (
                <User className="h-6 w-6 mt-1" />
              )}
              <div className="flex-1">
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          
          {messages.length === 1 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">Quick Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {quickRecommendations.map((rec, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecommendationClick(rec.prompt)}
                    className="flex items-center justify-between p-3 text-sm rounded-lg border bg-card hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {rec.icon}
                      <span>{rec.text}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Bot className="h-5 w-5 animate-pulse" />
              <span className="animate-pulse">Thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t p-4 bg-background">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DashboardAssistant;
