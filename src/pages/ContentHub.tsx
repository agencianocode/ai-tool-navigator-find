
import { useState } from "react";
import { SEO } from "@/components/SEO";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnalyticsPageTracker } from "@/components/analytics/AnalyticsTracking";
import { EnhancedTemplateMarketplace } from "@/components/templates/EnhancedTemplateMarketplace";
import { BlogSection } from "@/components/blog/BlogSection";
import { CaseStudiesSection } from "@/components/case-studies/CaseStudiesSection";
import { 
  BookOpen, 
  FileText, 
  TrendingUp,
  ShoppingBag
} from "lucide-react";

const ContentHub = () => {
  const [activeTab, setActiveTab] = useState("templates");

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Centro de Contenido - Templates, Blog y Casos de Éxito"
        description="Descubre templates listos para usar, artículos sobre IA y casos de éxito reales. Todo el contenido que necesitas para implementar herramientas de IA en tu empresa."
      />
      <AnalyticsPageTracker pageName="content-hub" />
      
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-4">
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Blog
            </TabsTrigger>
            <TabsTrigger value="case-studies" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Casos de Éxito
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Guías
            </TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-8">
            <EnhancedTemplateMarketplace />
          </TabsContent>

          <TabsContent value="blog" className="space-y-8">
            <BlogSection />
          </TabsContent>

          <TabsContent value="case-studies" className="space-y-8">
            <CaseStudiesSection />
          </TabsContent>

          <TabsContent value="guides" className="space-y-8">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Guías y Tutoriales</h2>
              <p className="text-gray-600 mb-6">
                Próximamente: Guías paso a paso para implementar herramientas de IA
              </p>
              <div className="max-w-2xl mx-auto text-left space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">📚 Guía Completa: ChatGPT para Empresas</h3>
                  <p className="text-sm text-gray-600">Implementación paso a paso con casos reales</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">⚡ Masterclass: Automatización con Zapier</h3>
                  <p className="text-sm text-gray-600">De principiante a experto en automatización</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">🎯 ROI en Herramientas de IA</h3>
                  <p className="text-sm text-gray-600">Cómo medir y maximizar el retorno de inversión</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContentHub;
