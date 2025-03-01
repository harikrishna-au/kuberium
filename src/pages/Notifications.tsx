
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BellRing, Calendar, ChevronRight, Clock, MailIcon, MessageSquare, Smartphone, Check, X, AlertTriangle, InfoIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

// Sample data - would be replaced with real data from Supabase in production
const notifications = [
  {
    id: 1,
    title: "Monthly budget for Food exceeded",
    description: "You've spent ₹8,500 on Food this month, exceeding your budget by ₹500.",
    date: new Date(2024, 3, 15),
    type: "alert",
    read: false
  },
  {
    id: 2,
    title: "New feature available",
    description: "Check out our new budgeting tools to help you save more effectively.",
    date: new Date(2024, 3, 10),
    type: "info",
    read: false
  },
  {
    id: 3,
    title: "Emergency Fund goal reached",
    description: "Congratulations! You've reached your Emergency Fund goal of ₹100,000.",
    date: new Date(2024, 3, 5),
    type: "success",
    read: true
  },
  {
    id: 4,
    title: "Bill payment reminder",
    description: "Your electricity bill of ₹3,000 is due in 3 days.",
    date: new Date(2024, 3, 2),
    type: "reminder",
    read: true
  },
  {
    id: 5,
    title: "Large expense detected",
    description: "We noticed an unusually large transaction of ₹25,000 for 'Electronics'.",
    date: new Date(2024, 2, 28),
    type: "alert",
    read: true
  }
];

const Notifications = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    budgetAlerts: true,
    goalUpdates: true,
    weeklyReports: false,
    billReminders: true,
    securityAlerts: true,
    marketUpdates: false
  });

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">Manage your alerts and notification preferences</p>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Notifications</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="settings">Notification Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>
                You have {notifications.filter(n => !n.read).length} unread notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={cn(
                      "flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors",
                      !notification.read && "bg-muted/20"
                    )}
                  >
                    <div className="mt-1">
                      {notification.type === "alert" && (
                        <div className="rounded-full bg-red-100 p-2 text-red-600">
                          <AlertTriangle className="h-4 w-4" />
                        </div>
                      )}
                      {notification.type === "info" && (
                        <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                          <InfoIcon className="h-4 w-4" />
                        </div>
                      )}
                      {notification.type === "success" && (
                        <div className="rounded-full bg-green-100 p-2 text-green-600">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                      {notification.type === "reminder" && (
                        <div className="rounded-full bg-amber-100 p-2 text-amber-600">
                          <Clock className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between">
                        <p className={cn("text-sm font-medium", !notification.read && "font-semibold")}>
                          {notification.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(notification.date, 'MMM d')}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {notification.description}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="mt-1">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread" className="space-y-4 mt-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Unread Notifications</CardTitle>
              <CardDescription>
                You have {notifications.filter(n => !n.read).length} unread notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {notifications.filter(n => !n.read).map((notification) => (
                  <div 
                    key={notification.id} 
                    className="flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors bg-muted/20"
                  >
                    <div className="mt-1">
                      {notification.type === "alert" && (
                        <div className="rounded-full bg-red-100 p-2 text-red-600">
                          <AlertTriangle className="h-4 w-4" />
                        </div>
                      )}
                      {notification.type === "info" && (
                        <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                          <InfoIcon className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-semibold">
                          {notification.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(notification.date, 'MMM d')}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {notification.description}
                      </p>
                    </div>
                    <div className="mt-1">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                  </div>
                ))}
                
                {notifications.filter(n => !n.read).length === 0 && (
                  <div className="p-8 text-center">
                    <BellRing className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <h3 className="mt-4 text-lg font-semibold">All caught up!</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      You've read all your notifications.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Channels</CardTitle>
              <CardDescription>
                Choose how you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <MailIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email Notifications</p>
                    <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                  </div>
                </div>
                <Switch 
                  checked={notificationSettings.email} 
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, email: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Smartphone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Push Notifications</p>
                    <p className="text-xs text-muted-foreground">Receive push notifications on your device</p>
                  </div>
                </div>
                <Switch 
                  checked={notificationSettings.push} 
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, push: checked})}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notification Types</CardTitle>
              <CardDescription>
                Select which notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="budget-alerts" className="flex flex-col gap-1">
                  <span>Budget Alerts</span>
                  <span className="font-normal text-muted-foreground text-xs">Get notified when you're close to your budget limit</span>
                </Label>
                <Switch 
                  id="budget-alerts" 
                  checked={notificationSettings.budgetAlerts} 
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, budgetAlerts: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <Label htmlFor="goal-updates" className="flex flex-col gap-1">
                  <span>Goal Updates</span>
                  <span className="font-normal text-muted-foreground text-xs">Get notified about your savings goal progress</span>
                </Label>
                <Switch 
                  id="goal-updates" 
                  checked={notificationSettings.goalUpdates} 
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, goalUpdates: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <Label htmlFor="weekly-reports" className="flex flex-col gap-1">
                  <span>Weekly Reports</span>
                  <span className="font-normal text-muted-foreground text-xs">Receive a weekly summary of your finances</span>
                </Label>
                <Switch 
                  id="weekly-reports" 
                  checked={notificationSettings.weeklyReports} 
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, weeklyReports: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <Label htmlFor="bill-reminders" className="flex flex-col gap-1">
                  <span>Bill Reminders</span>
                  <span className="font-normal text-muted-foreground text-xs">Get reminded when bills are due</span>
                </Label>
                <Switch 
                  id="bill-reminders" 
                  checked={notificationSettings.billReminders} 
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, billReminders: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <Label htmlFor="security-alerts" className="flex flex-col gap-1">
                  <span>Security Alerts</span>
                  <span className="font-normal text-muted-foreground text-xs">Get notified about suspicious activities</span>
                </Label>
                <Switch 
                  id="security-alerts" 
                  checked={notificationSettings.securityAlerts} 
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, securityAlerts: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <Label htmlFor="market-updates" className="flex flex-col gap-1">
                  <span>Market Updates</span>
                  <span className="font-normal text-muted-foreground text-xs">Receive updates about financial markets</span>
                </Label>
                <Switch 
                  id="market-updates" 
                  checked={notificationSettings.marketUpdates} 
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, marketUpdates: checked})}
                />
              </div>
            </CardContent>
          </Card>
          
          <Button className="w-full">Save Notification Preferences</Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;
