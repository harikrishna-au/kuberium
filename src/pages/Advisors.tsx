
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, MessageSquare, Phone, Search, Star, UserRound, Video } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Advisors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const advisors = [
    {
      id: 1,
      name: "Priya Sharma",
      avatar: "/placeholder.svg",
      role: "Certified Financial Planner",
      experience: "15+ years",
      specialties: ["Retirement Planning", "Tax Optimization", "Estate Planning"],
      rating: 4.9,
      reviews: 124,
      location: "Mumbai",
      availability: "Available today",
      price: "₹3,500 / session",
    },
    {
      id: 2,
      name: "Rahul Mehta",
      avatar: "/placeholder.svg",
      role: "Investment Advisor",
      experience: "12+ years",
      specialties: ["Stock Market", "Mutual Funds", "Portfolio Management"],
      rating: 4.7,
      reviews: 98,
      location: "Bangalore",
      availability: "Next available: Tomorrow",
      price: "₹3,000 / session",
    },
    {
      id: 3,
      name: "Ananya Desai",
      avatar: "/placeholder.svg",
      role: "Tax Consultant",
      experience: "8+ years",
      specialties: ["Income Tax", "GST", "Corporate Taxation"],
      rating: 4.8,
      reviews: 76,
      location: "Delhi",
      availability: "Next available: Thu, 18 Dec",
      price: "₹2,800 / session",
    },
    {
      id: 4,
      name: "Vikram Singh",
      avatar: "/placeholder.svg",
      role: "Wealth Manager",
      experience: "10+ years",
      specialties: ["HNI Wealth Management", "International Investments", "Risk Management"],
      rating: 4.6,
      reviews: 89,
      location: "Pune",
      availability: "Available today",
      price: "₹4,000 / session",
    },
    {
      id: 5,
      name: "Neha Kapoor",
      avatar: "/placeholder.svg",
      role: "Insurance Specialist",
      experience: "7+ years",
      specialties: ["Life Insurance", "Health Insurance", "Term Plans"],
      rating: 4.5,
      reviews: 61,
      location: "Chennai",
      availability: "Next available: Tomorrow",
      price: "₹2,500 / session",
    },
    {
      id: 6,
      name: "Arjun Reddy",
      avatar: "/placeholder.svg",
      role: "Retirement Planner",
      experience: "14+ years",
      specialties: ["Pension Plans", "Senior Citizen Planning", "Post-Retirement Income"],
      rating: 4.8,
      reviews: 112,
      location: "Hyderabad",
      availability: "Next available: Thu, 18 Dec",
      price: "₹3,200 / session",
    },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      advisor: "Priya Sharma",
      avatar: "/placeholder.svg",
      date: "Dec 15, 2023",
      time: "11:00 AM",
      duration: "45 min",
      type: "video",
      topic: "Retirement Planning Strategy"
    },
  ];

  const pastAppointments = [
    {
      id: 1,
      advisor: "Rahul Mehta",
      avatar: "/placeholder.svg",
      date: "Nov 28, 2023",
      time: "2:30 PM",
      duration: "60 min",
      type: "in-person",
      topic: "Portfolio Rebalancing",
      notes: "Discussed rebalancing equity-debt allocation given recent market volatility. Agreed to increase SIPs by 10% and add international equity exposure."
    },
    {
      id: 2,
      advisor: "Priya Sharma",
      avatar: "/placeholder.svg",
      date: "Oct 15, 2023",
      time: "10:00 AM",
      duration: "45 min",
      type: "video",
      topic: "Tax Saving Strategies",
      notes: "Reviewed current tax deductions and identified additional ₹45,000 in potential savings through ELSS and NPS contributions."
    },
  ];

  const filteredAdvisors = advisors.filter(advisor => 
    advisor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    advisor.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    advisor.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Human Financial Advisors</h1>
        <p className="text-muted-foreground">Expert guidance to complement our AI-powered recommendations</p>
      </div>

      <Tabs defaultValue="find">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="find">Find Advisor</TabsTrigger>
          <TabsTrigger value="appointments">My Appointments</TabsTrigger>
          <TabsTrigger value="recommended">Recommended For You</TabsTrigger>
        </TabsList>

        <TabsContent value="find" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search by name, specialization, or expertise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                Specialization
              </Button>
              <Button variant="outline">
                Availability
              </Button>
              <Button variant="outline">
                Price
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAdvisors.map((advisor) => (
              <Card key={advisor.id}>
                <CardHeader className="pb-2">
                  <div className="flex gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={advisor.avatar} alt={advisor.name} />
                      <AvatarFallback>{advisor.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{advisor.name}</CardTitle>
                      <CardDescription>{advisor.role}</CardDescription>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-medium">{advisor.rating}</span>
                        <span className="text-xs text-muted-foreground">({advisor.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {advisor.specialties.map((specialty, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{advisor.experience} experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{advisor.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{advisor.availability}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center pt-2">
                  <div className="font-medium">{advisor.price}</div>
                  <Button>Book Consultation</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {filteredAdvisors.length === 0 && (
            <div className="text-center py-12">
              <UserRound className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No advisors found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="appointments" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={appointment.avatar} alt={appointment.advisor} />
                            <AvatarFallback>{appointment.advisor.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{appointment.advisor}</h3>
                            <p className="text-sm text-muted-foreground">{appointment.topic}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <div className="flex items-center gap-1 text-sm">
                                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                <span>{appointment.date}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm">
                                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                <span>{appointment.time} ({appointment.duration})</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          {appointment.type === "video" ? (
                            <Button>
                              <Video className="h-4 w-4 mr-2" />
                              Join Video Call
                            </Button>
                          ) : (
                            <Button>
                              <MapPin className="h-4 w-4 mr-2" />
                              Get Directions
                            </Button>
                          )}
                          <Button variant="outline">Reschedule</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No upcoming appointments</h3>
                  <p className="text-muted-foreground mb-4">Schedule a consultation with a financial advisor</p>
                  <Button>Find an Advisor</Button>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Past Appointments</h2>
            <div className="space-y-4">
              {pastAppointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={appointment.avatar} alt={appointment.advisor} />
                          <AvatarFallback>{appointment.advisor.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{appointment.advisor}</h3>
                          <p className="text-sm text-muted-foreground">{appointment.topic}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{appointment.date}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{appointment.time} ({appointment.duration})</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {appointment.notes && (
                        <div className="bg-muted p-4 rounded-md">
                          <h4 className="font-medium text-sm mb-1">Session Notes</h4>
                          <p className="text-sm">{appointment.notes}</p>
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <Button variant="outline">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button variant="outline">
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </Button>
                        <Button>Book Follow-up</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recommended" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Advisor Recommendations</CardTitle>
              <CardDescription>Based on your financial profile and goals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-md bg-amber-50 border border-amber-200">
                <h3 className="font-medium mb-2">Why you need a financial advisor</h3>
                <p className="text-sm">Based on your complex financial situation with multiple income sources, upcoming property purchase, and retirement planning needs, we recommend consulting with a certified financial planner for personalized guidance.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder.svg" alt="Priya Sharma" />
                        <AvatarFallback>PS</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">Priya Sharma</CardTitle>
                        <CardDescription>Certified Financial Planner</CardDescription>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-sm font-medium">4.9</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-2 text-sm">
                      <span className="font-medium">Perfect match for:</span> Property investment & retirement planning
                    </div>
                    
                    <Button className="w-full">Book Consultation</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder.svg" alt="Vikram Singh" />
                        <AvatarFallback>VS</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">Vikram Singh</CardTitle>
                        <CardDescription>Wealth Manager</CardDescription>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-sm font-medium">4.6</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-2 text-sm">
                      <span className="font-medium">Perfect match for:</span> Investment optimization & tax strategy
                    </div>
                    
                    <Button className="w-full">Book Consultation</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Kuberium AI + Human Advisor Benefits</CardTitle>
              <CardDescription>The best of both worlds for complete financial planning</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-md border">
                  <h3 className="font-medium mb-2">AI-Powered Daily Assistance</h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex gap-2">
                      <Check className="h-4 w-4 text-green-600 shrink-0" />
                      <span>24/7 availability for financial queries and insights</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="h-4 w-4 text-green-600 shrink-0" />
                      <span>Automated transaction tracking and categorization</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="h-4 w-4 text-green-600 shrink-0" />
                      <span>Real-time budget monitoring and alerts</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="h-4 w-4 text-green-600 shrink-0" />
                      <span>Data-driven investment and savings recommendations</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 rounded-md border">
                  <h3 className="font-medium mb-2">Human Expert Guidance</h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex gap-2">
                      <Check className="h-4 w-4 text-green-600 shrink-0" />
                      <span>Personalized financial planning for complex situations</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="h-4 w-4 text-green-600 shrink-0" />
                      <span>Emotional support during market volatility and financial stress</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="h-4 w-4 text-green-600 shrink-0" />
                      <span>Nuanced investment advice based on experience</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="h-4 w-4 text-green-600 shrink-0" />
                      <span>Accountability and motivation to reach financial goals</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <Button className="w-full">
                Learn More About Our Hybrid Approach
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Advisors;
