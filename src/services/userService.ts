
import { supabase } from "@/integrations/supabase/client";
import { UserSettings, UserProfile } from "@/utils/types";
import { toast } from "sonner";
import { getCurrentUser } from "./utils/serviceUtils";

// User settings functionality
export const fetchUserSettings = async (): Promise<UserSettings | null> => {
  const userData = await getCurrentUser();
  
  if (!userData) {
    return null;
  }
  
  // First check if settings exist for this user
  const { data, error } = await supabase
    .from("user_settings")
    .select("*")
    .eq("user_id", userData.id)
    .maybeSingle();
    
  if (error) {
    console.error("Error fetching user settings:", error);
    toast.error("Failed to load user settings");
    return null;
  }
  
  // If no settings exist, create default settings
  if (!data) {
    const defaultSettings = {
      theme: "light",
      currency: "INR",
      notificationEnabled: true
    };
    
    return await createUserSettings(defaultSettings);
  }
  
  return {
    id: data.id,
    theme: data.theme,
    currency: data.currency,
    notificationEnabled: data.notification_enabled
  };
};

export const createUserSettings = async (settings: Omit<UserSettings, "id">): Promise<UserSettings | null> => {
  const userData = await getCurrentUser();
  
  if (!userData) {
    return null;
  }
  
  const { data, error } = await supabase
    .from("user_settings")
    .insert({
      theme: settings.theme,
      currency: settings.currency,
      notification_enabled: settings.notificationEnabled,
      user_id: userData.id
    })
    .select()
    .single();
    
  if (error) {
    console.error("Error creating user settings:", error);
    toast.error("Failed to create user settings");
    return null;
  }
  
  toast.success("Settings created successfully!");
  
  return {
    id: data.id,
    theme: data.theme,
    currency: data.currency,
    notificationEnabled: data.notification_enabled
  };
};

export const updateUserSettings = async (settings: Partial<UserSettings>): Promise<UserSettings | null> => {
  const userData = await getCurrentUser();
  
  if (!userData) {
    return null;
  }
  
  // First, get the current settings
  const currentSettings = await fetchUserSettings();
  
  if (!currentSettings) {
    toast.error("Could not find current settings");
    return null;
  }
  
  const { data, error } = await supabase
    .from("user_settings")
    .update({
      theme: settings.theme || currentSettings.theme,
      currency: settings.currency || currentSettings.currency,
      notification_enabled: settings.notificationEnabled !== undefined 
        ? settings.notificationEnabled 
        : currentSettings.notificationEnabled
    })
    .eq("id", currentSettings.id)
    .select()
    .single();
    
  if (error) {
    console.error("Error updating user settings:", error);
    toast.error("Failed to update user settings");
    return null;
  }
  
  toast.success("Settings updated successfully!");
  
  return {
    id: data.id,
    theme: data.theme,
    currency: data.currency,
    notificationEnabled: data.notification_enabled
  };
};

// User profile functionality
export const fetchUserProfile = async (): Promise<UserProfile | null> => {
  const userData = await getCurrentUser();
  
  if (!userData) {
    return null;
  }
  
  // First check if profile exists for this user
  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("user_id", userData.id)
    .maybeSingle();
    
  if (error) {
    console.error("Error fetching user profile:", error);
    toast.error("Failed to load user profile");
    return null;
  }
  
  // Get user settings for currency and theme
  const settings = await fetchUserSettings();
  
  // If no profile exists, create a default one with data from auth
  if (!data) {
    return {
      id: userData.id,
      name: userData.user_metadata?.full_name || "User",
      email: userData.email || "",
      currency: settings?.currency || "INR",
      theme: settings?.theme || "light",
    };
  }
  
  return {
    id: data.id,
    name: data.name || userData.user_metadata?.full_name || "User",
    email: data.email || userData.email || "",
    phone: data.phone,
    avatar: data.avatar,
    currency: settings?.currency || "INR",
    theme: settings?.theme || "light",
  };
};

export const updateUserProfile = async (profile: Partial<UserProfile>): Promise<UserProfile | null> => {
  const userData = await getCurrentUser();
  
  if (!userData) {
    return null;
  }
  
  // Check if profile exists
  const { data: existingProfile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("user_id", userData.id)
    .maybeSingle();
  
  let result;
  
  if (!existingProfile) {
    // Create new profile
    const { data, error } = await supabase
      .from("user_profiles")
      .insert({
        user_id: userData.id,
        name: profile.name,
        email: profile.email || userData.email,
        phone: profile.phone,
        avatar: profile.avatar
      })
      .select()
      .single();
      
    if (error) {
      console.error("Error creating user profile:", error);
      toast.error("Failed to create user profile");
      return null;
    }
    
    result = data;
    toast.success("Profile created successfully!");
  } else {
    // Update existing profile
    const { data, error } = await supabase
      .from("user_profiles")
      .update({
        name: profile.name !== undefined ? profile.name : existingProfile.name,
        email: profile.email !== undefined ? profile.email : existingProfile.email,
        phone: profile.phone !== undefined ? profile.phone : existingProfile.phone,
        avatar: profile.avatar !== undefined ? profile.avatar : existingProfile.avatar
      })
      .eq("id", existingProfile.id)
      .select()
      .single();
      
    if (error) {
      console.error("Error updating user profile:", error);
      toast.error("Failed to update user profile");
      return null;
    }
    
    result = data;
    toast.success("Profile updated successfully!");
  }
  
  // Get user settings for currency and theme
  const settings = await fetchUserSettings();
  
  return {
    id: result.id,
    name: result.name,
    email: result.email,
    phone: result.phone,
    avatar: result.avatar,
    currency: settings?.currency || "INR",
    theme: settings?.theme || "light",
  };
};
