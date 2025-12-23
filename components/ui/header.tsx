"use client";

import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import BovinaIcon from "../icons/bovina-icon";
import { Button } from "./button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

export function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show header when at top or scrolling up
      if (currentScrollY < 10 || currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 60) {
        // Hide header when scrolling down (after 60px)
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-amber-50 to-amber-50/95 backdrop-blur-sm transition-transform duration-300",
        "shadow-sm",
        !isVisible && "-translate-y-full"
      )}
      id="main-header"
    >
      <div className="container mx-auto px-4 h-14 sm:h-16 flex items-center">
        <nav className="flex w-full items-center justify-between">
          <Link className="flex items-center gap-2" href="/">
            <BovinaIcon className="pr-1" size={28} />
            <span className="text-xl sm:text-2xl font-bold text-red-600">
              Bora Churrasco
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-800 h-10 w-10"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-gradient-to-b from-amber-50 to-red-100 border-red-200">
                <SheetHeader>
                  <SheetTitle className="text-red-800">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  <Link
                    href="/recipes"
                    className="text-red-800 hover:text-red-600 font-medium text-lg py-2 border-b border-red-200"
                  >
                    Receitas
                  </Link>
                  <Link
                    href="/blog"
                    className="text-red-800 hover:text-red-600 font-medium text-lg py-2 border-b border-red-200"
                  >
                    Blog
                  </Link>
                  <Button
                    variant="default"
                    className="bg-red-600 hover:bg-red-700 mt-4 w-full"
                    asChild
                  >
                    <Link href="/participantes">Teste Online</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/recipes"
              className="text-red-800 hover:text-red-600 font-medium"
            >
              Receitas
            </Link>
            <Link
              href="/blog"
              className="text-red-800 hover:text-red-600 font-medium"
            >
              Blog
            </Link>
            <Button
              variant="default"
              className="bg-red-600 hover:bg-red-700"
              asChild
            >
              <Link href="/participantes">Teste Online</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}

// Export header height for other components to use
export const HEADER_HEIGHT = 56; // px - approximate height on mobile
