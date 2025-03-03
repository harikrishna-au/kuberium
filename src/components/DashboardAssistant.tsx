
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Bot, Send, User, Sparkles, X, MinimizeIcon, MaximizeIcon, MessageSquareDot, PiggyBank, Target, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type AssistantMessage = {
  role: "assistant" | "user";
  content: string;
  timestamp: Date;
};

const DashboardAssistant = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      role: "assistant",
      content: "Hi there! I'm your AI finance assistant. I can help you create budgets, set saving goals, and analyze your finances. What would you like help with today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [animationState, setAnimationState] = useState("initial");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample suggestions for the user
  const suggestions = [
    "Create a budget for this month",
    "Help me save for a vacation",
    "Analyze my spending habits",
    "Plan for retirement",
    "Reduce my expenses"
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const toggleExpanded = () => {
    setAnimationState("animating");
    setTimeout(() => {
      setIsExpanded(!isExpanded);
      if (isMinimized) setIsMinimized(false);
      
      // Reset animation state after transition completes
      setTimeout(() => {
        setAnimationState("completed");
      }, 300);
    }, 50);
  };

  const toggleMinimized = () => {
    setAnimationState("animating");
    setTimeout(() => {
      setIsMinimized(!isMinimized);
      if (!isMinimized) {
        // If we're minimizing, also make sure it's not expanded
        setIsExpanded(false);
      }
      
      // Reset animation state after transition completes
      setTimeout(() => {
        setAnimationState("completed");
      }, 300);
    }, 50);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: AssistantMessage = {
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      generateResponse(inputValue);
      setIsLoading(false);
    }, 1500);
  };

  const generateResponse = (userInput: string) => {
    const lowerInput = userInput.toLowerCase();
    let response = "";

    if (lowerInput.includes("budget")) {
      response = "I can help you create a budget! Based on your income and current expenses, I recommend allocating 50% for essentials, 30% for discretionary spending, and 20% for savings. Would you like me to set up a budget plan for you?";
    } else if (lowerInput.includes("save") || lowerInput.includes("saving") || lowerInput.includes("goal")) {
      response = "Great! Setting saving goals is a smart financial move. Based on your current finances, you could save about ₹15,000 per month. For a vacation that costs ₹180,000, you could reach your goal in 12 months. Should I create this saving goal for you?";
    } else if (lowerInput.includes("spend") || lowerInput.includes("expense") || lowerInput.includes("analyze")) {
      response = "Looking at your spending patterns, I notice that you spend most on dining out (25%) and entertainment (15%). You could save approximately ₹8,000 monthly by reducing these expenses by just 20%. Would you like some specific recommendations?";
    } else if (lowerInput.includes("retire") || lowerInput.includes("investment")) {
      response = "For retirement planning, I recommend starting with a goal of saving 15% of your income. Based on your current age and income, you should aim for a retirement corpus of approximately ₹2.5 crores. Would you like me to suggest an investment strategy?";
    } else {
      response = "I can help you manage your finances better! I can create budgets, set saving goals, analyze spending patterns, or plan for long-term financial goals. What specific area would you like assistance with?";
    }

    const assistantMessage: AssistantMessage = {
      role: "assistant",
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    const userMessage: AssistantMessage = {
      role: "user",
      content: suggestion,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      generateResponse(suggestion);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (isMinimized) {
    return (
      <div 
        className="fixed bottom-6 right-6 z-50"
        onClick={toggleMinimized}
      >
        <Button 
          className="bg-primary text-white p-3 rounded-full hover:bg-primary/90 shadow-lg flex items-center justify-center animate-pulse"
        >
          <Bot className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <Card 
      className={cn(
        "transition-all duration-300 ease-in-out overflow-hidden bg-card border shadow-md",
        isExpanded 
          ? "fixed inset-0 md:inset-8 z-50 animate-fade-in" 
          : "w-full animate-enter",
        animationState === "animating" && "scale-95 opacity-80"
      )}
    >
      <CardHeader className="bg-primary/5 p-4 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-xl flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <span>FinAI Assistant</span>
          <div className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
            <Sparkles className="h-3 w-3 mr-1" />
            <span>Smart</span>
          </div>
        </CardTitle>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={toggleExpanded} className="h-8 w-8 transition-transform hover:rotate-180 duration-300">
            {isExpanded ? <MinimizeIcon className="h-4 w-4" /> : <MaximizeIcon className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleMinimized} className="h-8 w-8 transition-transform hover:scale-110 duration-300">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent 
        className={cn(
          "p-4 overflow-y-auto transition-all duration-300 ease-in-out",
          isExpanded ? 'h-[calc(100vh-13rem)] md:h-[calc(100vh-17rem)]' : 'max-h-[250px]'
        )}
      >
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex gap-2 transition-all duration-300 animate-enter",
                message.role === "assistant" ? "flex-row" : "flex-row-reverse"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-white transition-all duration-300",
                  message.role === "assistant" ? "bg-primary" : "bg-secondary"
                )}
              >
                {message.role === "assistant" ? (
                  <Bot className="h-4 w-4" />
                ) : (
                  <User className="h-4 w-4" />
                )}
              </div>
              <div
                className={cn(
                  "rounded-lg py-2 px-3 max-w-[90%] shadow-sm transition-all duration-300",
                  message.role === "assistant"
                    ? "bg-muted text-foreground"
                    : "bg-primary text-primary-foreground"
                )}
              >
                <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                <div className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {isLoading && (
          <div className="flex items-center justify-center mt-4 animate-pulse">
            <div className="flex gap-2 items-center bg-primary/10 px-4 py-2 rounded-md">
              <div className="h-2 w-2 bg-primary rounded-full animate-ping"></div>
              <span className="text-sm">FinAI is thinking...</span>
            </div>
          </div>
        )}
      </CardContent>
      
      {!isLoading && messages[messages.length - 1]?.role === "assistant" && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2 animate-slideUp">
            {suggestions.map((suggestion, index) => (
              <Button 
                key={index}
                variant="outline" 
                size="sm" 
                className="text-xs transition-all duration-300 hover:bg-primary hover:text-white"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.length > (isExpanded ? 30 : 20) ? suggestion.substring(0, isExpanded ? 30 : 20) + "..." : suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      <CardFooter className="p-4 pt-2 border-t">
        <div className="flex w-full items-center space-x-2">
          <Input
            placeholder="Ask about your finances..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
            className="flex-1 transition-all duration-300 focus:ring-2 focus:ring-primary"
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
      
      {isExpanded && (
        <div className="p-4 bg-primary/5 border-t animate-fadeIn">
          <h4 className="font-medium text-sm mb-2">What I can help you with:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="flex items-center gap-2 bg-background p-2 rounded-md shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
              <CreditCard className="h-5 w-5 text-primary" />
              <span className="text-sm">Budget Planning</span>
            </div>
            <div className="flex items-center gap-2 bg-background p-2 rounded-md shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
              <PiggyBank className="h-5 w-5 text-primary" />
              <span className="text-sm">Saving Strategies</span>
            </div>
            <div className="flex items-center gap-2 bg-background p-2 rounded-md shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
              <Target className="h-5 w-5 text-primary" />
              <span className="text-sm">Financial Goals</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default DashboardAssistant;
