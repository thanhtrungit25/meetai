'use client';

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {DashboardUserButton} from "./dashboard-user-button";
import { DashboardTrial } from "./dashboard-trial";

const firstSenction = [
  {
    icon: VideoIcon,
    label: "Meetings",
    href: "/meetings"
  },
  {
    icon: BotIcon,
    label: "Agents",
    href: "/agents"
  },
];

const secondSenction = [
  {
    icon: StarIcon,
    label: "Upgrade",
    href: "/upgrade"
  },
];

export default function DashboardSidebar(){
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link href="/" className="flex items-center gap-2 px-2 pt-2">
          <Image src="/logo.svg" alt="Meet.AI" width={36} height={36} />
          <p className="text-2xl font-semibold">Meet.AI</p>
        </Link>
      </SidebarHeader>

      <div className="px-4 py-2">
        <Separator className="opacity-10 text-[#5D6B68]" />
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSenction.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className={cn(
                      "h-10 hover:bg-linear-to-r/oklch from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50 border border-transparent hover:border-[#5D6B68]",
                      pathname === item.href && "bg-linear-to-r border-[#5D6B68]/10"
                    )}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-5" />
                      <span className="text-sm font-medium tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="px-4 py-2">
          <Separator className="opacity-10 text-[#5D6B68]" />
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSenction.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className={cn(
                      "h-10 hover:bg-linear-to-r/oklch from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50 border border-transparent hover:border-[#5D6B68]",
                      pathname === item.href && "bg-linear-to-r border-[#5D6B68]/10"
                    )}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-5" />
                      <span className="text-sm font-medium tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="text-white">
        <DashboardTrial />
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};