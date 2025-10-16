import { DealsBoard } from "./components/deals-board";
import {
  RecentActivities,
  type Activity,
} from "@/components/recent-activities";
import { AppSidebar } from "@/components/app-sidebar";
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

const dealActivities: Activity[] = [
  {
    person: { name: "Olivia Martin", fallback: "OM" },
    action: 'Moved "Website Redesign" to Proposal',
    timestamp: "10 min ago",
  },
  {
    person: { name: "John Doe", fallback: "JD" },
    action: 'Won deal "New Marketing Campaign"',
    timestamp: "1 hour ago",
  },
  {
    person: { name: "Jane Smith", fallback: "JS" },
    action: 'Lost deal "E-commerce Platform"',
    timestamp: "4 hours ago",
  },
];

export default function DealsScreen() {
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
                  <BreadcrumbPage>Deals</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <DealsBoard />
          <RecentActivities
            title="Deal Activities"
            description="Recent activities related to deals."
            activities={dealActivities}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
