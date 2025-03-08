import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import AdminDashboardHeader from "@/components/admin-dashboard-header"
import AdminDashboardStats from "@/components/admin-dashboard-stats"
import AdminDashboardCharts from "@/components/admin-dashboard-charts"
import AdminDashboardUsers from "@/components/admin-dashboard-users"

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-[#F5EDED] dark:bg-gray-900">
      <AdminDashboardHeader />

      <main className="container py-6">
        <h1 className="text-3xl font-bold text-[#6482AD] dark:text-white mb-6">Admin Dashboard</h1>

        <AdminDashboardStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <Card className="col-span-1 lg:col-span-2 border-[#6482AD]/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#6482AD] dark:text-white">Business Overview</CardTitle>
              <CardDescription>Monthly performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminDashboardCharts />
            </CardContent>
          </Card>

          <Card className="border-[#6482AD]/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#6482AD] dark:text-white">AI Insights</CardTitle>
              <CardDescription>Predictive analytics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Churn Prediction</h4>
                  <span className="text-sm text-red-500 font-medium">12% Risk</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: "12%" }}></div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">5 high-value customers at risk of churning</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Sentiment Analysis</h4>
                  <span className="text-sm text-green-500 font-medium">78% Positive</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "78%" }}></div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Customer sentiment improved by 5% this month</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Fraud Detection</h4>
                  <span className="text-sm text-amber-500 font-medium">3 Alerts</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "15%" }}></div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Unusual activity detected in 3 accounts</p>
              </div>

              <Button className="w-full bg-[#6482AD] hover:bg-[#7FA1C3] mt-2">View All Insights</Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <AdminDashboardUsers />
        </div>
      </main>
    </div>
  )
}

