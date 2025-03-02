
import { supabase } from "@/integrations/supabase/client";
import { User, UserSettings, UserProfile } from "@/utils/types";
import { toast } from "sonner";

export const getCurrentUser = async (): Promise<User | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return null;
  }
  
  const { data: userSettings } = await supabase
    .from("user_settings")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();
    
  return {
    id: user.id,
    email: user.email || '',
    name: user.user_metadata?.full_name || 'User',
    avatar: user.user_metadata?.avatar_url
  };
};

export const getUserSettings = async (): Promise<UserSettings | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return null;
  }
  
  // Check if user settings exist
  const { data, error } = await supabase
    .from("user_settings")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();
    
  if (error) {
    console.error("Error fetching user settings:", error);
    toast.error("Failed to load user settings");
    return null;
  }
  
  // If no settings exist, create default settings
  if (!data) {
    const defaultSettings = {
      user_id: user.id,
      theme: 'light',
      currency: 'USD',
      notification_enabled: true
    };
    
    const { data: newSettings, error: createError } = await supabase
      .from("user_settings")
      .insert(defaultSettings)
      .select()
      .single();
      
    if (createError) {
      console.error("Error creating user settings:", createError);
      toast.error("Failed to create user settings");
      return null;
    }
    
    return {
      id: newSettings.id,
      theme: newSettings.theme,
      currency: newSettings.currency,
      notificationEnabled: newSettings.notification_enabled
    };
  }
  
  return {
    id: data.id,
    theme: data.theme,
    currency: data.currency,
    notificationEnabled: data.notification_enabled
  };
};

export const updateUserSettings = async (settings: Omit<UserSettings, "id">): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return false;
  }
  
  const { error } = await supabase
    .from("user_settings")
    .update({
      theme: settings.theme,
      currency: settings.currency,
      notification_enabled: settings.notificationEnabled
    })
    .eq("user_id", user.id);
    
  if (error) {
    console.error("Error updating user settings:", error);
    toast.error("Failed to update user settings");
    return false;
  }
  
  toast.success("Settings updated successfully!");
  return true;
};

export const getUserProfile = async (): Promise<UserProfile | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return null;
  }
  
  // Get user settings for currency and theme
  const { data: userSettings } = await supabase
    .from("user_settings")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();
  
  return {
    id: user.id,
    name: user.user_metadata?.full_name || 'User',
    email: user.email || '',
    phone: user.phone || user.user_metadata?.phone || '',
    avatar: user.user_metadata?.avatar_url || '',
    currency: userSettings?.currency || 'USD',
    theme: userSettings?.theme || 'light'
  };
};

export const updateUserProfile = async (profile: Omit<UserProfile, "id" | "currency" | "theme">): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return false;
  }
  
  const { error } = await supabase.auth.updateUser({
    email: profile.email !== user.email ? profile.email : undefined,
    phone: profile.phone,
    data: {
      full_name: profile.name
    }
  });
  
  if (error) {
    console.error("Error updating user profile:", error);
    toast.error("Failed to update profile");
    return false;
  }
  
  toast.success("Profile updated successfully!");
  return true;
};
