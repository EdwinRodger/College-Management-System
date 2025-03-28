import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { PrincipalStats } from "@/components/dashboard/principal-stats"
import { TeachersList } from "@/components/dashboard/teachers-list"
import { CoursesList } from "@/components/dashboard/courses-list"

export default function PrincipalDashboard() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Principal Dashboard</h1>
          <p className="text-muted-foreground">Manage teachers, courses, subjects, and semesters</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="semesters">Semesters</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <PrincipalStats />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Teachers</CardTitle>
                  <CardDescription>Teachers in your college</CardDescription>
                </CardHeader>
                <CardContent>
                  <TeachersList limit={5} />
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Courses</CardTitle>
                  <CardDescription>Courses offered by your college</CardDescription>
                </CardHeader>
                <CardContent>
                  <CoursesList limit={5} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="teachers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Teachers</CardTitle>
                <CardDescription>Manage all teachers in your college</CardDescription>
              </CardHeader>
              <CardContent>
                <TeachersList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Courses</CardTitle>
                <CardDescription>Manage all courses in your college</CardDescription>
              </CardHeader>
              <CardContent>
                <CoursesList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subjects" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Subjects</CardTitle>
                <CardDescription>Manage all subjects in your college</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Subjects list will be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="semesters" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Semesters</CardTitle>
                <CardDescription>Manage all semesters in your college</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Semesters list will be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

