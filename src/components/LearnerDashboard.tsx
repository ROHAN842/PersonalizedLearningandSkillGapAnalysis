
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, CheckCircle, PlayCircle, AlertTriangle } from "lucide-react";

interface LearnerDashboardProps {
  currentUser: {
    name: string;
    role: string;
    department: string;
    skillGaps: string[];
  };
}

const LearnerDashboard = ({ currentUser }: LearnerDashboardProps) => {
  const learningPaths = [
    {
      id: 1,
      title: "Java Concurrency Mastery",
      estimatedTime: "12 hours",
      status: "In Progress",
      progress: 65,
      modules: ["Thread Safety", "Concurrent Collections", "Executor Framework"],
      priority: "High"
    },
    {
      id: 2,
      title: "Microservices Architecture",
      estimatedTime: "16 hours",
      status: "Not Started",
      progress: 0,
      modules: ["Service Discovery", "API Gateway", "Circuit Breaker Pattern"],
      priority: "High"
    },
    {
      id: 3,
      title: "Cloud Native Development",
      estimatedTime: "20 hours",
      status: "Not Started",
      progress: 0,
      modules: ["Container Orchestration", "Serverless", "DevOps Practices"],
      priority: "Medium"
    },
    {
      id: 4,
      title: "Advanced Spring Boot",
      estimatedTime: "8 hours",
      status: "Done",
      progress: 100,
      modules: ["Security", "Testing", "Monitoring"],
      priority: "Low"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Done":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "In Progress":
        return <PlayCircle className="h-5 w-5 text-blue-500" />;
      default:
        return <BookOpen className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome back, {currentUser.name}!</CardTitle>
          <CardDescription className="text-blue-100">
            {currentUser.role} | {currentUser.department} Department
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-100 mb-2">Current Skill Gaps Identified:</p>
              <div className="flex flex-wrap gap-2">
                {currentUser.skillGaps.map((gap) => (
                  <Badge key={gap} variant="secondary" className="bg-white/20 text-white border-white/30">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {gap}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">3</p>
              <p className="text-sm text-blue-100">Active Learning Paths</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Paths */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Your Personalized Learning Paths</h2>
          <Button variant="outline">
            <BookOpen className="h-4 w-4 mr-2" />
            View All Courses
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {learningPaths.map((path) => (
            <Card key={path.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(path.status)}
                    <CardTitle className="text-lg">{path.title}</CardTitle>
                  </div>
                  <Badge className={getPriorityColor(path.priority)}>
                    {path.priority}
                  </Badge>
                </div>
                <CardDescription className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {path.estimatedTime}
                  </span>
                  <Badge className={getStatusColor(path.status)}>
                    {path.status}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{path.progress}%</span>
                    </div>
                    <Progress value={path.progress} className="h-2" />
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Modules:</p>
                    <div className="flex flex-wrap gap-1">
                      {path.modules.map((module) => (
                        <Badge key={module} variant="outline" className="text-xs">
                          {module}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {path.status === "Not Started" && (
                      <Button className="flex-1" size="sm">
                        Start Learning
                      </Button>
                    )}
                    {path.status === "In Progress" && (
                      <Button className="flex-1" size="sm">
                        Continue Learning
                      </Button>
                    )}
                    {path.status === "Done" && (
                      <Button variant="outline" className="flex-1" size="sm">
                        Review & Certificate
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearnerDashboard;
