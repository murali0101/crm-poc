'use client'

import * as React from 'react'
import {
  AudioWaveform,
  BarChart,
  Building,
  CheckSquare,
  Command,
  GalleryVerticalEnd,
  Handshake,
  LayoutDashboard,
  LifeBuoy,
  Megaphone,
  Settings,
  TrendingUp,
  Users,
} from 'lucide-react'

import { NavMain } from '@/components/nav-main'
import { NavProjects } from '@/components/nav-projects'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { NavUser } from '@/components/nav-user'
import { TeamSwitcher } from '@/components/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

// This is sample data.
const data = {
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: 'Contacts',
      url: '/contacts',
      icon: Users,
    },
    {
      title: 'Companies',
      url: '/companies',
      icon: Building,
    },
    {
      title: 'Deals',
      url: '/deals',
      icon: Handshake,
    },
    {
      title: 'Tasks',
      url: '/tasks',
      icon: CheckSquare,
    },
    {
      title: 'Reports',
      url: '/reports',
      icon: BarChart,
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: Settings,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Sales Team',
      url: '#',
      icon: TrendingUp,
    },
    {
      name: 'Marketing Team',
      url: '#',
      icon: Megaphone,
    },
    {
      name: 'Support Team',
      url: '#',
      icon: LifeBuoy,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [email] = useLocalStorage('email', '')
  const user = {
    name: email.split('@')[0],
    email: email,
    avatar: '/avatars/shadcn.jpg',
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
