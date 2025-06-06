
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  X, 
  Zap, 
  Target, 
  BookOpen, 
  Settings, 
  LogIn,
  LayoutDashboard
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import UserMenu from "./UserMenu";
import { NotificationCenter } from "./NotificationCenter";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useAuth();

  const navigation = [
    { name: "Inicio", href: "/", icon: null },
    { name: "Herramientas", href: "/tools", icon: Zap },
    { name: "Guías", href: "/guides", icon: BookOpen },
  ];

  const authenticatedNavigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Hoja de Ruta", href: "/roadmap", icon: Target },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              ToolFinder AI
            </span>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              Beta
            </Badge>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Public Navigation */}
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}

            {/* Authenticated Navigation */}
            {user && authenticatedNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors flex items-center gap-2"
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="w-8 h-8 animate-pulse bg-gray-200 rounded-full" />
            ) : user ? (
              <div className="flex items-center gap-2">
                <NotificationCenter />
                <UserMenu />
              </div>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/auth?tab=signin">
                    <LogIn className="mr-2 h-4 w-4" />
                    Iniciar Sesión
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/auth?tab=signup">
                    Crear Cuenta
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {/* Public Navigation */}
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-700 hover:text-purple-600 block px-3 py-2 text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Authenticated Navigation */}
              {user && authenticatedNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-gray-700 hover:text-purple-600 block px-3 py-2 text-base font-medium flex items-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    {item.name}
                  </Link>
                );
              })}

              {/* Mobile Auth */}
              <div className="border-t border-gray-200 pt-4">
                {loading ? (
                  <div className="px-3 py-2">
                    <div className="w-24 h-4 animate-pulse bg-gray-200 rounded" />
                  </div>
                ) : user ? (
                  <div className="px-3 py-2">
                    <p className="text-sm text-gray-700">
                      {user.user_metadata?.full_name || user.email}
                    </p>
                    <div className="mt-2 space-y-1">
                      <Link
                        to="/profile"
                        className="block text-sm text-gray-600 hover:text-purple-600"
                        onClick={() => setIsOpen(false)}
                      >
                        Mi Perfil
                      </Link>
                      <Link
                        to="/settings"
                        className="block text-sm text-gray-600 hover:text-purple-600"
                        onClick={() => setIsOpen(false)}
                      >
                        Configuración
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="px-3 py-2 space-y-2">
                    <Button variant="ghost" asChild className="w-full justify-start">
                      <Link to="/auth?tab=signin" onClick={() => setIsOpen(false)}>
                        <LogIn className="mr-2 h-4 w-4" />
                        Iniciar Sesión
                      </Link>
                    </Button>
                    <Button asChild className="w-full">
                      <Link to="/auth?tab=signup" onClick={() => setIsOpen(false)}>
                        Crear Cuenta
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
