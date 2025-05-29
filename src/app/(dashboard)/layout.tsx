import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/modules/dashboard/ui/components/dashboard-sidebar";
import DashboardNavbar from "@/modules/dashboard/ui/components/dashboard-navbar";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return <SidebarProvider>
    <DashboardSidebar />
    <main>
      <DashboardNavbar />
      {children}
    </main>
  </SidebarProvider>;
}
