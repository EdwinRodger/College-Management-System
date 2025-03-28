import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { SuperAdminStats } from "@/components/dashboard/superadmin-stats"
import { CollegesList } from "@/components/dashboard/colleges-list"
import { RecentActivities } from "@/components/dashboard/recent-activities"

export default function SuperAdminDashboard() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Super Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage colleges and principals across the system</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="colleges">Colleges</TabsTrigger>
            <TabsTrigger value="principals">Principals</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <SuperAdminStats />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Recent Colleges</CardTitle>
                  <CardDescription>Recently added colleges in the system</CardDescription>
                </CardHeader>
                <CardContent>
                  <CollegesList limit={5} />
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Latest activities in the system</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentActivities />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="colleges" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Colleges</CardTitle>
                <CardDescription>Manage all colleges in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <CollegesList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="principals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Principals</CardTitle>
                <CardDescription>Manage all principals in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Principals list will be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Analytics</CardTitle>
                <CardDescription>Overview of system usage and statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Analytics will be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

