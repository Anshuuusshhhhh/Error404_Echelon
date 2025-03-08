import { Card, CardContent } from "@/components/ui/card"
import { ArrowDown, ArrowUp, DollarSign, Users, BarChart, Activity } from "lucide-react"

export default function AdminDashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="border-[#6482AD]/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Leads</p>
              <h3 className="text-2xl font-bold text-[#6482AD] dark:text-white mt-1">1,284</h3>
            </div>
            <div className="w-12 h-12 bg-[#6482AD]/10 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-[#6482AD]" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <div className="flex items-center text-green-500">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">12%</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#6482AD]/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Engagement Rate</p>
              <h3 className="text-2xl font-bold text-[#6482AD] dark:text-white mt-1">68.7%</h3>
            </div>
            <div className="w-12 h-12 bg-[#6482AD]/10 rounded-full flex items-center justify-center">
              <Activity className="h-6 w-6 text-[#6482AD]" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <div className="flex items-center text-green-500">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">7.2%</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#6482AD]/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Conversion Rate</p>
              <h3 className="text-2xl font-bold text-[#6482AD] dark:text-white mt-1">24.3%</h3>
            </div>
            <div className="w-12 h-12 bg-[#6482AD]/10 rounded-full flex items-center justify-center">
              <BarChart className="h-6 w-6 text-[#6482AD]" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <div className="flex items-center text-red-500">
              <ArrowDown className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">3.1%</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#6482AD]/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Revenue</p>
              <h3 className="text-2xl font-bold text-[#6482AD] dark:text-white mt-1">$86,429</h3>
            </div>
            <div className="w-12 h-12 bg-[#6482AD]/10 rounded-full flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-[#6482AD]" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <div className="flex items-center text-green-500">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">18.2%</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">from last month</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

