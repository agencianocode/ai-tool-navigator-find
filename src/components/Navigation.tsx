
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import UserMenu from "./UserMenu";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  AI Tool Finder
                </h1>
              </a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="/" className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium">
                Home
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium">
                How it Works
              </a>
              <a href="#about" className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium">
                About
              </a>
            </div>
          </div>

          {/* CTA Button or User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <UserMenu />
            ) : (
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105" asChild>
                <a href="/auth">Iniciar Sesión</a>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-purple-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/90 backdrop-blur-md rounded-lg mt-2 border border-purple-100">
              <a href="/" className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium">
                Home
              </a>
              <a href="#how-it-works" className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium">
                How it Works
              </a>
              <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium">
                About
              </a>
              <div className="px-3 py-2">
                {user ? (
                  <UserMenu />
                ) : (
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all duration-200" asChild>
                    <a href="/auth">Iniciar Sesión</a>
                  </Button>
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
