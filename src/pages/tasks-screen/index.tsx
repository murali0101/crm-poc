import { AppSidebar } from "@/components/app-sidebar";
import {
  RecentActivities,
  type Activity,
} from "@/components/recent-activities";
import { TasksList } from "./components/tasks-list";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const taskActivities: Activity[] = [
  {
    person: { name: "You", fallback: "Y" },
    action: 'Completed task: "Send invoice to Apex Industries"',
    timestamp: "1 hour ago",
  },
  {
    person: { name: "John Doe", fallback: "JD" },
    action: 'Assigned a new task to you: "Follow up with Innovate Inc."',
    timestamp: "3 hours ago",
  },
  {
    person: { name: "You", fallback: "Y" },
    action:
      'Changed status of "Prepare proposal for Synergy Corp." to In Progress',
    timestamp: "1 day ago",
  },
];

export default function TasksScreen() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Tasks</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="grid flex-1 gap-4 p-4 pt-0 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TasksList />
          </div>
          <RecentActivities
            title="Task Activities"
            description="Recent activities related to your tasks."
            activities={taskActivities}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
