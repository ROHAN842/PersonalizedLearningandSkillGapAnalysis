
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Users, TrendingUp, Settings, Bell, User, LogOut } from "lucide-react";
import LearnerDashboard from "@/components/LearnerDashboard";
import AdminConsole from "@/components/AdminConsole";
import WorkflowProgress from "@/components/WorkflowProgress";
import AgentStatus from "@/components/AgentStatus";

const Index = () => {
  const [userRole, setUserRole] = useState<'learner' | 'admin'>('learner');
  const [currentUser, setCurrentUser] = useState({
    name: "John Doe",
    role: "Senior Software Engineer",
    department: "Technology",
    skillGaps: ["Java Concurrency", "Microservices Architecture", "Cloud Native Development"]
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-white rounded-lg shadow-sm p-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hexaware Learning Intelligence</h1>
            <p className="text-gray-600 mt-2">AI-Powered Personalized Learning & Skill-Gap Analysis</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium">{currentUser.name}</span>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Role Switcher */}
        <div className="mb-6">
          <Tabs value={userRole} onValueChange={(value) => setUserRole(value as 'learner' | 'admin')}>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="learner" className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>Learner View</span>
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Admin Console</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Main Content */}
        {userRole === 'learner' ? (
          <div className="space-y-6">
            <LearnerDashboard currentUser={currentUser} />
            <WorkflowProgress />
            <AgentStatus />
          </div>
        ) : (
          <AdminConsole />
        )}
      </div>
    </div>
  );
};

export default Index;
