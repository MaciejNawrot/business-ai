"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  Settings,
  LineChart,
} from "lucide-react";

const routes = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Business Profiler",
    href: "/profiler",
    icon: LineChart,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 p-2">
      {routes.map((route) => {
        const Icon = route.icon;
        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              pathname === route.href
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{route.title}</span>
          </Link>
        );
      })}
    </nav>
  );
} 