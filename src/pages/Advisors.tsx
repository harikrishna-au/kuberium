import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Check, Clock, MessageSquare, Search, Star, Video } from "lucide-react";

const Advisors = () => {
  const advisors = [
    {
      id: 1,
      name: "Dr. Emily Carter",
      title: "Certified Financial Planner",
      specialty: "Retirement Planning",
      rating: 4.8,
      reviews: 125,
      availability: "Available Today",
      avatar: "https://images.unsplash.com/photo-1573496808659-04898242bc91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 2,
      name: "Mr. James Miller",
      title: "Investment Advisor",
      specialty: "Stock Market",
      rating: 4.5,
      reviews: 90,
      availability: "Busy",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd8a72fbc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: 3,
      name: "Ms. Sophia Rodriguez",
      title: "Tax Consultant",
      specialty: "Tax Optimization",
      rating: 4.9,
      reviews: 150,
      availability: "Available Tomorrow",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Financial Advisors</h1>
        <p className="text-muted-foreground">Connect with expert financial advisors to achieve your goals</p>
      </div>

      <Tabs defaultValue="browse">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="browse">Browse Advisors</TabsTrigger>
          <TabsTrigger value="my-advisors">My Advisors</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        <TabsContent value="browse" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {advisors.map((advisor) => (
              <Card key={advisor.id}>
                <CardHeader className="space-y-0.5">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={advisor.avatar} alt={advisor.name} />
                      <AvatarFallback>{advisor.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <CardTitle className="text-lg font-semibold">{advisor.name}</CardTitle>
                      <CardDescription>{advisor.title}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{advisor.rating} ({advisor.reviews} Reviews)</span>
                  </div>
                  <div className="mt-2">
                    <Badge>{advisor.specialty}</Badge>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <span>{advisor.availability}</span>
                  <Button>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="my-advisors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Current Advisors</CardTitle>
              <CardDescription>Advisors you are currently connected with</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <p className="text-muted-foreground">No advisors connected yet.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Planning Resources</CardTitle>
              <CardDescription>Guides and tools to help you make informed decisions</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <p className="text-muted-foreground">Explore resources to enhance your financial literacy.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Advisors;
