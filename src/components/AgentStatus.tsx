
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { User, Brain, Target, Activity, Zap, Clock, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const AgentStatus = () => {
  const agents = [
    {
      name: "Profile Agent",
      status: "Active",
      icon: User,
      queue: 12,
      latency: "150ms",
      errorRate: 0.2,
      description: "Analyzing HR/ERP data and performance ratings",
      lastProcessed: "2 minutes ago"
    },
    {
      name: "Assessment Agent",
      status: "Processing",
      icon: Brain,
      queue: 8,
      latency: "300ms",
      errorRate: 0.1,
      description: "Generating adaptive quizzes and assessments",
      lastProcessed: "30 seconds ago"
    },
    {
      name: "Recommender Agent",
      status: "Idle",
      icon: Target,
      queue: 0,
      latency: "120ms",
      errorRate: 0.0,
      description: "Ready to generate learning recommendations",
      lastProcessed: "5 minutes ago"
    },
    {
      name: "Tracker Agent",
      status: "Active",
      icon: Activity,
      queue: 25,
      latency: "80ms",
      errorRate: 0.3,
      description: "Monitoring learning progress and completion",
      lastProcessed: "10 seconds ago"
    }
  ];

  const performanceData = [
    { time: "00:00", requests: 45, latency: 120 },
    { time: "00:15", requests: 52, latency: 150 },
    { time: "00:30", requests: 48, latency: 130 },
    { time: "00:45", requests: 61, latency: 180 },
    { time: "01:00", requests: 55, latency: 160 },
    { time: "01:15", requests: 49, latency: 140 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Idle":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  const getErrorRateColor = (errorRate: number) => {
    if (errorRate === 0) return "text-green-600";
    if (errorRate < 0.5) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-yellow-500" />
            <span>Multi-Agent Framework Status</span>
          </CardTitle>
          <CardDescription>
            Real-time monitoring of AI agents managing the learning workflow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {agents.map((agent) => {
              const IconComponent = agent.icon;
              return (
                <Card key={agent.name} className="border border-gray-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <IconComponent className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-sm">{agent.name}</span>
                      </div>
                      <Badge className={getStatusColor(agent.status)}>
                        {agent.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-xs text-gray-600">{agent.description}</p>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-500">Queue:</span>
                          <span className="ml-1 font-medium">{agent.queue}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Latency:</span>
                          <span className="ml-1 font-medium">{agent.latency}</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-500">Error Rate:</span>
                          <span className={`font-medium ${getErrorRateColor(agent.errorRate)}`}>
                            {agent.errorRate}%
                          </span>
                        </div>
                        <Progress value={agent.errorRate * 20} className="h-1" />
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        Last: {agent.lastProcessed}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Request Volume</CardTitle>
            <CardDescription>Agent request handling over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="requests" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Average Latency</CardTitle>
            <CardDescription>Response time trend across all agents</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="latency" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentStatus;
