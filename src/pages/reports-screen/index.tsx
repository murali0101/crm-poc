import { AppSidebar } from '@/components/app-sidebar'
import { RecentActivities, type Activity } from '@/components/recent-activities'
import { ReportWidget } from './components/report-widget'
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { ChartContainer } from '@/components/ui/chart'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'

const reportActivities: Activity[] = [
  {
    person: { name: 'Admin', fallback: 'A' },
    action: 'Generated "Sales Performance" report',
    timestamp: '1 hour ago',
  },
  {
    person: { name: 'John Doe', fallback: 'JD' },
    action: 'Viewed "Lead Conversion Rate" report',
    timestamp: '3 hours ago',
  },
  {
    person: { name: 'Jane Smith', fallback: 'JS' },
    action: 'Exported "Q3 Revenue" report',
    timestamp: '1 day ago',
  },
  {
    person: { name: 'Olivia Martin', fallback: 'OM' },
    action: 'Shared "Deals by Stage" report with the team',
    timestamp: '2 days ago',
  },
]

const dealsByStageData = [
  { name: 'Lead', value: 400 },
  { name: 'Qualified', value: 300 },
  { name: 'Proposal', value: 200 },
  { name: 'Won', value: 100 },
  { name: 'Lost', value: 50 },
]

const dealValueByStageData = [
  { name: 'Lead', value: 55000 },
  { name: 'Qualified', value: 25000 },
  { name: 'Proposal', value: 50000 },
  { name: 'Won', value: 5000 },
  { name: 'Lost', value: 30000 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF']

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
            <ReportWidget title="Deals by Stage">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={dealsByStageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dealsByStageData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
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
            <ReportWidget title="Deal Value by Stage">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dealValueByStageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </ReportWidget>
            <ReportWidget title="Deal Win/Loss Ratio">
              <div className="text-4xl font-bold">3:1</div>
            </ReportWidget>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
