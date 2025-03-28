import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample data - in a real app, this would come from Firebase
const activities = [
  {
    id: "1",
    user: {
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@uot.edu",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    action: "added a new college",
    target: "University of Technology",
    time: "2 hours ago",
  },
  {
    id: "2",
    user: {
      name: "Dr. Michael Chen",
      email: "michael.chen@sce.edu",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    action: "updated college details for",
    target: "State College of Engineering",
    time: "5 hours ago",
  },
  {
    id: "3",
    user: {
      name: "Admin",
      email: "admin@system.edu",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    action: "assigned a new principal to",
    target: "Metropolitan Arts College",
    time: "1 day ago",
  },
  {
    id: "4",
    user: {
      name: "Dr. Lisa Rodriguez",
      email: "lisa.rodriguez@mti.edu",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    action: "logged in to the system",
    target: "",
    time: "1 day ago",
  },
  {
    id: "5",
    user: {
      name: "Admin",
      email: "admin@system.edu",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    action: "created a new account for",
    target: "Dr. James Martinez",
    time: "2 days ago",
  },
]

export function RecentActivities() {
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
            <AvatarFallback>
              {activity.user.name.charAt(0)}
              {activity.user.name.split(" ")[1]?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.user.name}</p>
            <p className="text-sm text-muted-foreground">
              {activity.action} {activity.target && <span className="font-medium">{activity.target}</span>}
            </p>
          </div>
          <div className="ml-auto text-sm text-muted-foreground">{activity.time}</div>
        </div>
      ))}
    </div>
  )
}

