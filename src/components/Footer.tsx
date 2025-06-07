import { Badge } from "@/components/ui/badge";
import { Facebook, Twitter, Linkedin, Github, Mail, MapPin, Phone, Heart } from "lucide-react";
const Footer = () => {
  return <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
              Buscador de Herramientas IA
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Tu plataforma confiable para descubrir, evaluar y comparar las mejores herramientas 
              de inteligencia artificial para tu negocio. Facilitamos la transformación digital 
              con recomendaciones personalizadas.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Inicio</a></li>
              <li><a href="/tools" className="text-gray-300 hover:text-white transition-colors">Herramientas</a></li>
              <li><a href="/questionnaire" className="text-gray-300 hover:text-white transition-colors">Evaluación</a></li>
              <li><a href="/guides" className="text-gray-300 hover:text-white transition-colors">Guías</a></li>
              <li><a href="/auth" className="text-gray-300 hover:text-white transition-colors">Iniciar Sesión</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2">
              <li><a href="/guides" className="text-gray-300 hover:text-white transition-colors">Centro de Ayuda</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Documentación</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">API</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Casos de Éxito</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold mb-2">Mantente Actualizado</h4>
            <p className="text-gray-300 mb-4">
              Recibe las últimas noticias sobre herramientas IA y actualizaciones de nuestra plataforma.
            </p>
            <div className="flex gap-2">
              <input type="email" placeholder="tu@email.com" className="flex-1 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 px-[12px]" />
              <button className="py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg font-medium transition-all duration-200 px-[21px]">
                Suscribirse
              </button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center gap-2 text-gray-300">
              <Mail className="h-4 w-4" />
              <span>contacto@buscadorai.com</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-300">
              <Phone className="h-4 w-4" />
              <span>+34 900 123 456</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-300">
              <MapPin className="h-4 w-4" />
              <span>Madrid, España</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Buscador de Herramientas IA. Todos los derechos reservados.
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Términos de Servicio
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-400 text-sm flex items-center justify-center gap-1">
              Hecho con <Heart className="h-4 w-4 text-red-500" /> para impulsar la innovación con IA
            </p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;