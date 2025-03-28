import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { TeacherStats } from "@/components/dashboard/teacher-stats"
import { StudentsList } from "@/components/dashboard/students-list"
import { AttendanceChart } from "@/components/dashboard/attendance-chart"

export default function TeacherDashboard() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Teacher Dashboard</h1>
          <p className="text-muted-foreground">Manage students and track attendance</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <TeacherStats />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Attendance Overview</CardTitle>
                  <CardDescription>Monthly attendance statistics</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <AttendanceChart />
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Students</CardTitle>
                  <CardDescription>Recently enrolled students</CardDescription>
                </CardHeader>
                <CardContent>
                  <StudentsList limit={5} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Students</CardTitle>
                <CardDescription>Manage all students in your courses</CardDescription>
              </CardHeader>
              <CardContent>
                <StudentsList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Take Attendance</CardTitle>
                <CardDescription>Record daily attendance for your courses</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Attendance form will be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Reports</CardTitle>
                <CardDescription>View and export attendance reports</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Reports will be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

