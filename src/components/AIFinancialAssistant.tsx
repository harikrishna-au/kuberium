
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Bot, Send, User, X, MinusCircle, Brain } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { getAIResponse, AssistantMessage } from "@/services/aiAssistantService";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const AIFinancialAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your Kuberium AI assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Format messages for the API
      const historyForApi: AssistantMessage[] = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // Get response from AI
      const aiResponseText = await getAIResponse(inputValue, historyForApi);
      
      // Add AI response to messages
      const aiMessage: Message = {
        role: "assistant",
        content: aiResponseText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      toast({
        title: "Error",
        description: "Failed to get response from the AI assistant",
        variant: "destructive",
      });
      
      // Add error message
      const errorMessage: Message = {
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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg transition-all duration-300 hover:scale-105"
            aria-label="Open financial assistant"
          >
            <Brain className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-80 sm:w-96 p-0 h-[70vh] max-h-[500px] flex flex-col shadow-xl border-0 animate-in fade-in-50 zoom-in-95"
          align="end"
        >
          <Card className="border-0 flex-1 flex flex-col h-full">
            <CardHeader className="py-3 px-4 border-b flex flex-row items-center justify-between bg-primary/5">
              <CardTitle className="text-lg flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Kuberium Assistant
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <MinusCircle className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-2 ${
                    message.role === "assistant" ? "flex-row" : "flex-row-reverse"
                  } animate-in slide-in-from-bottom-3`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                      message.role === "assistant" ? "bg-primary" : "bg-secondary"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <Brain className="h-4 w-4" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg py-2 px-3 max-w-[75%] shadow-sm ${
                      message.role === "assistant"
                        ? "bg-muted text-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                    <div className="text-xs opacity-70 mt-1">{formatTime(message.timestamp)}</div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </CardContent>
            <CardFooter className="p-3 border-t">
              <div className="flex w-full items-center space-x-2">
                <Input
                  placeholder="Ask about your finances..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  disabled={isLoading}
                  className="flex-1 focus:ring-2 focus:ring-primary transition-all duration-300"
                />
                <Button 
                  type="submit" 
                  size="icon"
                  disabled={isLoading || !inputValue.trim()}
                  onClick={handleSendMessage}
                  className="transition-all duration-300 hover:scale-105"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AIFinancialAssistant;
