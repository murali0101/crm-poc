import { RecentActivities, type Activity } from '@/components/recent-activities'
import { AppSidebar } from '@/components/app-sidebar'

import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

import { UsersTable } from './table'

const contactActivities: Activity[] = [
  {
    person: { name: 'Mary Johnson', fallback: 'MJ' },
    action: 'Created a new contact: "David Williams"',
    timestamp: '4 hours ago',
  },
  {
    person: { name: 'John Doe', fallback: 'JD' },
    action: 'Updated contact "Jane Smith"',
    timestamp: '1 day ago',
  },
  {
    person: { name: 'Admin', fallback: 'A' },
    action: 'Deactivated user "Peter Jones"',
    timestamp: '2 days ago',
  },
]

export default function ContactsScreen() {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Contacts" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="grid flex-1 gap-4 p-4 pt-0 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <UsersTable />
              </div>
              <RecentActivities
                title="Contact Activities"
                description="Recent activities related to contacts."
                activities={contactActivities}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
