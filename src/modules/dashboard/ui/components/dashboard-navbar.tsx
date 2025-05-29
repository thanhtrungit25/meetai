"use client";

import React, { useEffect, useState } from "react";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import DashboardCommand from "./dashboard-command";

export default function DashboardNavbar() {
  const { state, toggleSidebar, isMobile } = useSidebar();

  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down as EventListener);
    return () => document.removeEventListener("keydown", down as EventListener);
  }, []);

  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
      <nav className="px-4 py-3 flex items-center gap-x-2 border-b bg-background">
        <Button onClick={toggleSidebar} variant="outline" className="size-9">
          {state === "collapsed" || isMobile ? (
            <PanelLeftIcon className="size-4" />
          ) : (
            <PanelLeftCloseIcon className="size-4" />
          )}
        </Button>
        <Button
          className="w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
          variant="outline"
          size="sm"
          onClick={() => setCommandOpen((open) => !open)}
        >
          <SearchIcon />
          Search
          <kbd className="ml-auto px-1.5 h-5 bg-muted font-mono text-[10px] font-medium inline-flex gap-1 items-center pointer-events-none border text-muted-foreground">
            <span>&#8984;</span>K
          </kbd>
        </Button>
      </nav>
    </>
  );
}
