
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type AssistantMessage = {
  role: "user" | "assistant";
  content: string;
};

export const getAIResponse = async (
  message: string,
  history: AssistantMessage[]
): Promise<string> => {
  try {
    // Call the Supabase Edge Function that will handle the API call
    const { data, error } = await supabase.functions.invoke("ai-financial-assistant", {
      body: {
        message,
        history
      }
    });

    if (error) {
      console.error("Error calling AI assistant:", error);
      toast.error("Failed to get response from Kuberium AI assistant");
      throw error;
    }

    return data.response || "I'm sorry, I couldn't process your request. Please try again later.";
  } catch (error) {
    console.error("Error in AI assistant service:", error);
    toast.error("Error communicating with Kuberium AI assistant");
    throw error;
  }
};
