"use client";

import * as React from "react";
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
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
      items: [],
    },
    {
      title: "Contacts",
      url: "#",
      icon: Users,
      items: [],
    },
    {
      title: "Companies",
      url: "#",
      icon: Building,
      items: [],
    },
    {
      title: "Deals",
      url: "#",
      icon: Handshake,
      items: [],
    },
    {
      title: "Tasks",
      url: "#",
      icon: CheckSquare,
      items: [],
    },
    {
      title: "Reports",
      url: "#",
      icon: BarChart,
      items: [],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Sales Team",
      url: "#",
      icon: TrendingUp,
    },
    {
      name: "Marketing Team",
      url: "#",
      icon: Megaphone,
    },
    {
      name: "Support Team",
      url: "#",
      icon: LifeBuoy,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
