
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Users, TrendingUp, Download, Filter, BarChart3, PieChart, UserCheck } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from "recharts";

const AdminConsole = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [skillGapFilter, setSkillGapFilter] = useState("all");

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@hexaware.com",
      department: "Technology",
      role: "Senior Software Engineer",
      skillGaps: ["Java Concurrency", "Microservices"],
      learningPaths: 3,
      completionRate: 65,
      lastActive: "2 hours ago"
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah.smith@hexaware.com",
      department: "Technology",
      role: "DevOps Engineer",
      skillGaps: ["Kubernetes", "Cloud Security"],
      learningPaths: 2,
      completionRate: 80,
      lastActive: "1 hour ago"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@hexaware.com",
      department: "Data Science",
      role: "Data Analyst",
      skillGaps: ["Machine Learning", "Python"],
      learningPaths: 4,
      completionRate: 45,
      lastActive: "30 minutes ago"
    },
    {
      id: 4,
      name: "Emily Chen",
      email: "emily.chen@hexaware.com",
      department: "Product",
      role: "Product Manager",
      skillGaps: ["Agile", "Data Analytics"],
      learningPaths: 2,
      completionRate: 90,
      lastActive: "15 minutes ago"
    }
  ];

  const departmentStats = [
    { department: "Technology", employees: 145, avgCompletion: 72, activeUsers: 98 },
    { department: "Data Science", employees: 67, avgCompletion: 68, activeUsers: 52 },
    { department: "Product", employees: 34, avgCompletion: 85, activeUsers: 28 },
    { department: "Sales", employees: 89, avgCompletion: 45, activeUsers: 34 },
    { department: "Marketing", employees: 45, avgCompletion: 62, activeUsers: 31 }
  ];

  const skillGapData = [
    { skill: "Cloud Technologies", count: 45, color: "#3b82f6" },
    { skill: "AI/ML", count: 38, color: "#10b981" },
    { skill: "Microservices", count: 32, color: "#f59e0b" },
    { skill: "DevOps", count: 28, color: "#ef4444" },
    { skill: "Data Analytics", count: 25, color: "#8b5cf6" }
  ];

  const agentMetrics = [
    { name: "Profile Agent", processed: 1247, avgTime: "150ms", errors: 3 },
    { name: "Assessment Agent", processed: 892, avgTime: "300ms", errors: 1 },
    { name: "Recommender Agent", processed: 675, avgTime: "120ms", errors: 0 },
    { name: "Tracker Agent", processed: 2134, avgTime: "80ms", errors: 7 }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || user.department === departmentFilter;
    const matchesSkillGap = skillGapFilter === "all" || user.skillGaps.some(gap => 
      gap.toLowerCase().includes(skillGapFilter.toLowerCase())
    );
    
    return matchesSearch && matchesDepartment && matchesSkillGap;
  });

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Learners</p>
                <p className="text-3xl font-bold text-gray-900">380</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active This Week</p>
                <p className="text-3xl font-bold text-gray-900">243</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Completion</p>
                <p className="text-3xl font-bold text-gray-900">68%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Skill Gaps</p>
                <p className="text-3xl font-bold text-gray-900">168</p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="analytics">Learning Analytics</TabsTrigger>
          <TabsTrigger value="agents">Agent Performance</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Search & Filters</CardTitle>
              <CardDescription>Find and manage learners across your organization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={skillGapFilter} onValueChange={setSkillGapFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Skill Gap" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Skills</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="cloud">Cloud</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="agile">Agile</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <Card key={user.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div>
                              <h3 className="font-medium text-gray-900">{user.name}</h3>
                              <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                          </div>
                          <div className="mt-2 flex items-center space-x-4 text-sm">
                            <span className="text-gray-600">{user.role}</span>
                            <Badge variant="outline">{user.department}</Badge>
                            <span className="text-gray-500">Last active: {user.lastActive}</span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex space-x-4 text-sm">
                            <div>
                              <p className="text-gray-600">Learning Paths</p>
                              <p className="font-medium">{user.learningPaths}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Completion</p>
                              <p className="font-medium">{user.completionRate}%</p>
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-xs text-gray-600 mb-1">Skill Gaps:</p>
                            <div className="flex flex-wrap gap-1">
                              {user.skillGaps.map((gap) => (
                                <Badge key={gap} variant="secondary" className="text-xs">
                                  {gap}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>Learning completion rates by department</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="avgCompletion" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Skill Gaps</CardTitle>
                <CardDescription>Most common skill gaps across organization</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Tooltip />
                    <pie
                      data={skillGapData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="count"
                    >
                      {skillGapData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </pie>
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {skillGapData.map((item) => (
                    <div key={item.skill} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm">{item.skill}</span>
                      </div>
                      <span className="text-sm font-medium">{item.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="agents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Agent Performance Metrics</CardTitle>
              <CardDescription>Real-time monitoring of AI agent framework</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agentMetrics.map((agent) => (
                  <Card key={agent.name} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-gray-900">{agent.name}</h3>
                          <p className="text-sm text-gray-600">Requests processed: {agent.processed}</p>
                        </div>
                        <div className="flex space-x-6 text-sm">
                          <div className="text-center">
                            <p className="text-gray-600">Avg Response</p>
                            <p className="font-medium">{agent.avgTime}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-600">Errors</p>
                            <p className={`font-medium ${agent.errors === 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {agent.errors}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Report Generation</CardTitle>
              <CardDescription>Generate comprehensive learning analytics reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="border border-gray-200">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Individual Progress Report</h3>
                    <p className="text-sm text-gray-600 mb-4">Detailed learning progress for individual employees</p>
                    <Button className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Department Analytics</h3>
                    <p className="text-sm text-gray-600 mb-4">Learning metrics by department and team</p>
                    <Button className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Skill Gap Analysis</h3>
                    <p className="text-sm text-gray-600 mb-4">Organization-wide skill gap assessment</p>
                    <Button className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminConsole;
