import { ApiTokensTable } from './components/api-tokens-table'
import { RecentActivities, type Activity } from '@/components/recent-activities'
import { AppSidebar } from '@/components/app-sidebar'
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

const apiTokenActivities: Activity[] = [
  {
    person: { name: 'John Doe', fallback: 'JD' },
    action: 'Created a new API token: "Primary Token"',
    timestamp: '1 day ago',
  },
  {
    person: { name: 'Jane Smith', fallback: 'JS' },
    action: 'Revoked API token: "Old Token"',
    timestamp: '2 days ago',
  },
]

export default function ApiTokensScreen() {
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
                  <BreadcrumbPage>API Tokens</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="grid flex-1 gap-4 p-4 pt-0 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ApiTokensTable />
          </div>
          <RecentActivities
            title="API Token Activities"
            description="Recent activities related to API tokens."
            activities={apiTokenActivities}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
