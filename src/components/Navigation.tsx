
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { useAuth } from "@/contexts/AuthContext";
import UserMenu from "./UserMenu";

const Navigation = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navigationItems = [
    { href: "/", label: "Inicio" },
    { href: "/tools", label: "Herramientas" },
  ];

  const authenticatedItems = [
    { href: "/dashboard", label: "Mi Dashboard" },
  ];

  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="font-bold text-2xl text-primary">
          AI Tool Navigator
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          {navigationItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(item.href) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          
          {user && authenticatedItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(item.href) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          
          <ModeToggle />
          
          {user ? (
            <UserMenu />
          ) : (
            <Link to="/auth">
              <Button size="sm">Iniciar Sesión</Button>
            </Link>
          )}
        </div>

        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                Navega por AI Tool Navigator
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.href) ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {user && authenticatedItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.href) ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              <ModeToggle />
              
              {user ? (
                <UserMenu />
              ) : (
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button size="sm">Iniciar Sesión</Button>
                </Link>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navigation;
