
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle, User, Brain, Target, Activity } from "lucide-react";

const WorkflowProgress = () => {
  const workflowSteps = [
    {
      id: 1,
      title: "Profile Loaded",
      description: "Profile Agent analyzed HR/ERP data and performance ratings",
      status: "completed",
      timestamp: "2 minutes ago",
      agent: "Profile Agent",
      icon: User
    },
    {
      id: 2,
      title: "Assessment Pending",
      description: "Assessment Agent is preparing adaptive quizzes",
      status: "in-progress",
      timestamp: "In progress",
      agent: "Assessment Agent",
      icon: Brain
    },
    {
      id: 3,
      title: "Assessment Completed",
      description: "Waiting for quiz completion",
      status: "pending",
      timestamp: "Pending",
      agent: "Assessment Agent",
      icon: Brain
    },
    {
      id: 4,
      title: "Recommendations Generated",
      description: "AI will generate personalized learning paths",
      status: "pending",
      timestamp: "Pending",
      agent: "Recommender Agent",
      icon: Target
    },
    {
      id: 5,
      title: "Learning In Progress",
      description: "Track learning progress and completion patterns",
      status: "pending",
      timestamp: "Pending",
      agent: "Tracker Agent",
      icon: Activity
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500 animate-spin" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const overallProgress = (workflowSteps.filter(step => step.status === "completed").length / workflowSteps.length) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-6 w-6 text-blue-600" />
          <span>Real-Time Multi-Agent Workflow Progress</span>
        </CardTitle>
        <CardDescription>
          AI agents are working together to analyze your profile and create personalized recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Overall Progress */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">Overall Progress</span>
              <span>{Math.round(overallProgress)}% Complete</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </div>

          {/* Workflow Steps */}
          <div className="space-y-4">
            {workflowSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={step.id} className="flex items-start space-x-4">
                  <div className="flex flex-col items-center">
                    <div className={`p-2 rounded-full ${
                      step.status === "completed" ? "bg-green-100" :
                      step.status === "in-progress" ? "bg-blue-100" : "bg-gray-100"
                    }`}>
                      <IconComponent className={`h-4 w-4 ${
                        step.status === "completed" ? "text-green-600" :
                        step.status === "in-progress" ? "text-blue-600" : "text-gray-400"
                      }`} />
                    </div>
                    {index < workflowSteps.length - 1 && (
                      <div className={`w-px h-8 mt-2 ${
                        step.status === "completed" ? "bg-green-300" : "bg-gray-200"
                      }`} />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(step.status)}
                        <h3 className="font-medium text-gray-900">{step.title}</h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {step.agent}
                        </Badge>
                        <Badge className={getStatusColor(step.status)}>
                          {step.status.replace("-", " ")}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{step.timestamp}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowProgress;
