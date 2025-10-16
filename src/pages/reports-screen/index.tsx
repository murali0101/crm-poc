import { AppSidebar } from "@/components/app-sidebar";
import {
  RecentActivities,
  type Activity,
} from "@/components/recent-activities";
import { ReportWidget } from "./components/report-widget";
import { Bar, BarChart, XAxis } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
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

const reportActivities: Activity[] = [
  {
    person: { name: "Admin", fallback: "A" },
    action: 'Generated "Sales Performance" report',
    timestamp: "1 hour ago",
  },
  {
    person: { name: "John Doe", fallback: "JD" },
    action: 'Viewed "Lead Conversion Rate" report',
    timestamp: "3 hours ago",
  },
  {
    person: { name: "Jane Smith", fallback: "JS" },
    action: 'Exported "Q3 Revenue" report',
    timestamp: "1 day ago",
  },
];

export default function ReportsScreen() {
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
                  <BreadcrumbPage>Reports</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ReportWidget title="Sales Performance">
              <ChartContainer
                config={{}}
                className="aspect-auto h-[150px] w-full"
              >
                <BarChart
                  data={[
                    { month: "Jan", sales: 120 },
                    { month: "Feb", sales: 150 },
                  ]}
                >
                  <XAxis dataKey="month" />
                  <Bar dataKey="sales" fill="hsl(var(--primary))" />
                </BarChart>
              </ChartContainer>
            </ReportWidget>
            <ReportWidget title="Lead Conversion Rate">
              <div className="text-4xl font-bold">25%</div>
              <p className="text-xs text-muted-foreground">
                +5% from last month
              </p>
            </ReportWidget>
            <RecentActivities
              title="Report Activities"
              description="Recent activities related to reports."
              activities={reportActivities}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <ReportWidget title="Q3 Revenue">
              <div className="text-4xl font-bold">$150,231</div>
            </ReportWidget>
            <ReportWidget title="Deal Win/Loss Ratio">
              <div className="text-4xl font-bold">3:1</div>
            </ReportWidget>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
