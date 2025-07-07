
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Users, 
  TrendingUp, 
  DollarSign, 
  FileText, 
  Calendar,
  Search,
  Filter,
  Download,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";

interface ProviderDashboardProps {
  onBack: () => void;
}

const ProviderDashboard = ({ onBack }: ProviderDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for demonstration
  const mockStats = {
    totalPatients: 156,
    highRiskPatients: 23,
    scheduledStudies: 18,
    billableEncounters: 89,
    monthlyRevenue: 12450
  };

  const mockPatients = [
    { id: 1, name: "John Smith", age: 45, riskLevel: "HIGH", essScore: 18, stopBangScore: 6, lastAssessment: "2024-01-15", status: "Scheduled" },
    { id: 2, name: "Mary Johnson", age: 38, riskLevel: "MODERATE", essScore: 12, stopBangScore: 4, lastAssessment: "2024-01-14", status: "Pending" },
    { id: 3, name: "Robert Brown", age: 52, riskLevel: "HIGH", essScore: 20, stopBangScore: 7, lastAssessment: "2024-01-13", status: "Completed" },
    { id: 4, name: "Lisa Davis", age: 29, riskLevel: "LOW", essScore: 8, stopBangScore: 2, lastAssessment: "2024-01-12", status: "Completed" },
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'HIGH': return 'bg-red-100 text-red-800';
      case 'MODERATE': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Scheduled': return <Calendar className="h-4 w-4 text-blue-600" />;
      default: return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button onClick={onBack} variant="ghost" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Provider Dashboard</h1>
                <p className="text-sm text-gray-600">Sleep Apnea Screening Management</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export Data</span>
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Users className="h-4 w-4 mr-2" />
                Add Patient
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Patients</p>
                      <p className="text-2xl font-bold text-gray-900">{mockStats.totalPatients}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">High Risk</p>
                      <p className="text-2xl font-bold text-red-600">{mockStats.highRiskPatients}</p>
                    </div>
                    <AlertCircle className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Scheduled Studies</p>
                      <p className="text-2xl font-bold text-blue-600">{mockStats.scheduledStudies}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Billable Encounters</p>
                      <p className="text-2xl font-bold text-green-600">{mockStats.billableEncounters}</p>
                    </div>
                    <FileText className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                      <p className="text-2xl font-bold text-green-600">${mockStats.monthlyRevenue.toLocaleString()}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Assessments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockPatients.slice(0, 3).map((patient) => (
                      <div key={patient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{patient.name}</p>
                          <p className="text-sm text-gray-600">{patient.lastAssessment}</p>
                        </div>
                        <Badge className={getRiskColor(patient.riskLevel)}>
                          {patient.riskLevel}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>CMS Billing Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">CPT 99490 - Chronic Care Management</span>
                      <Badge variant="outline">$45.00</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">CPT 99424 - Principal Care Management</span>
                      <Badge variant="outline">$65.00</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">CPT G0444 - Wellness Visit Add-on</span>
                      <Badge variant="outline">$35.00</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">CPT 99484 - Behavioral Health</span>
                      <Badge variant="outline">$55.00</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="patients" className="space-y-6">
            {/* Patient Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input placeholder="Search patients..." className="pl-10" />
                    </div>
                  </div>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Patient List */}
            <Card>
              <CardHeader>
                <CardTitle>Patient List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium">Patient</th>
                        <th className="text-left p-4 font-medium">Age</th>
                        <th className="text-left p-4 font-medium">Risk Level</th>
                        <th className="text-left p-4 font-medium">ESS Score</th>
                        <th className="text-left p-4 font-medium">STOP-BANG</th>
                        <th className="text-left p-4 font-medium">Last Assessment</th>
                        <th className="text-left p-4 font-medium">Status</th>
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockPatients.map((patient) => (
                        <tr key={patient.id} className="border-b hover:bg-gray-50">
                          <td className="p-4 font-medium">{patient.name}</td>
                          <td className="p-4">{patient.age}</td>
                          <td className="p-4">
                            <Badge className={getRiskColor(patient.riskLevel)}>
                              {patient.riskLevel}
                            </Badge>
                          </td>
                          <td className="p-4">{patient.essScore}/24</td>
                          <td className="p-4">{patient.stopBangScore}/8</td>
                          <td className="p-4">{patient.lastAssessment}</td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(patient.status)}
                              <span className="text-sm">{patient.status}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <Button variant="ghost" size="sm">View</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>CMS Billing Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">This Month</h3>
                    <p className="text-2xl font-bold text-green-600">${mockStats.monthlyRevenue.toLocaleString()}</p>
                    <p className="text-sm text-green-600">+15% from last month</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">Pending Claims</h3>
                    <p className="text-2xl font-bold text-blue-600">23</p>
                    <p className="text-sm text-blue-600">$2,850 value</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-semibold text-purple-800 mb-2">Avg. per Encounter</h3>
                    <p className="text-2xl font-bold text-purple-600">$140</p>
                    <p className="text-sm text-purple-600">CMS reimbursement</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics & Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 border rounded-lg">
                    <h3 className="font-semibold mb-4">Patient Outcomes</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>High Risk Identified:</span>
                        <span className="font-medium">23 patients</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sleep Studies Scheduled:</span>
                        <span className="font-medium">18 patients</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Follow-up Completion:</span>
                        <span className="font-medium">78%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 border rounded-lg">
                    <h3 className="font-semibold mb-4">Quality Metrics</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Screening Completion:</span>
                        <span className="font-medium">94%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Documentation Quality:</span>
                        <span className="font-medium">98%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CMS Compliance:</span>
                        <span className="font-medium">100%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProviderDashboard;
