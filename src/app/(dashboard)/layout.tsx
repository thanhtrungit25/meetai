import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/modules/dashboard/ui/components/dashboard-sidebar";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return <SidebarProvider>
    <DashboardSidebar />
    <main>
      {children}
    </main>
  </SidebarProvider>;
}
