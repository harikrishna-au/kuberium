
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const EDEN_AI_API_KEY = Deno.env.get("EDEN_AI_API_KEY");

// Set up CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!EDEN_AI_API_KEY) {
      throw new Error("EDEN_AI_API_KEY is not set in environment variables");
    }

    // Parse request body
    const { message, history } = await req.json();

    // Format conversation history for the AI
    const formattedHistory = history.map((msg: any) => ({
      role: msg.role,
      message: msg.content
    }));

    // Add the most recent user message
    const conversationContext = [
      ...formattedHistory,
    ];

    // Build a prompt with financial context
    const systemPrompt = "You are a helpful financial assistant. Provide advice and analysis on personal finances, budgeting, saving, investing, and financial planning. Use concise, clear language and be supportive.";

    // Make request to Eden AI
    const response = await fetch("https://api.edenai.run/v2/text/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${EDEN_AI_API_KEY}`
      },
      body: JSON.stringify({
        providers: ["openai"],
        text: message,
        chat_history: conversationContext,
        temperature: 0.7,
        max_tokens: 150,
        system_prompt: systemPrompt
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Eden AI API error:", errorText);
      throw new Error(`Eden AI API returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const aiResponse = data.openai?.generated_text || "I couldn't generate a response at this moment.";

    return new Response(
      JSON.stringify({ 
        response: aiResponse 
      }),
      { 
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        } 
      }
    );
  } catch (error) {
    console.error("Error in AI assistant function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || "Internal Server Error" 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        } 
      }
    );
  }
});
