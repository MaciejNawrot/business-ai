"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { MobileNavigation } from "./MobileNavigation";
import { ThemeToggle } from "./ThemeToggle";

export function TopBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-[86px] items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-4">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <SheetTitle className="p-4">Quattro</SheetTitle>
            <MobileNavigation />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </div>
  );
} 