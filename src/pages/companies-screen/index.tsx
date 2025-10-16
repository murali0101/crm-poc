import { CompaniesTable } from "./components/companies-table";
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

const companyActivities: Activity[] = [
  {
    person: { name: "John Doe", fallback: "JD" },
    action: 'Created a new company: "Innovate Inc."',
    timestamp: "1 day ago",
  },
  {
    person: { name: "Jane Smith", fallback: "JS" },
    action: 'Updated "Synergy Corp." to "Customer"',
    timestamp: "2 days ago",
  },
  {
    person: { name: "Peter Jones", fallback: "PJ" },
    action: 'Archived company: "Quantum Solutions"',
    timestamp: "3 days ago",
  },
];

export default function CompaniesScreen() {
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
                  <BreadcrumbPage>Companies</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="grid flex-1 gap-4 p-4 pt-0 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CompaniesTable />
          </div>
          <RecentActivities
            title="Company Activities"
            description="Recent activities related to companies."
            activities={companyActivities}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
