
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Building, 
  TrendingUp, 
  Eye,
  Quote,
  CheckCircle,
  BarChart3,
  Target,
  Lightbulb,
  Award
} from "lucide-react";
import { caseStudies } from "@/data/realTemplates";
import { useAnalytics } from "@/components/analytics/AnalyticsTracking";

export const CaseStudiesSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  
  const { trackEvent } = useAnalytics();

  const industries = ["Todas", "E-commerce", "Marketing Digital", "Tecnología", "Servicios Financieros"];

  const filteredCaseStudies = caseStudies.filter(caseStudy => {
    const matchesSearch = caseStudy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseStudy.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseStudy.challenge_description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = !selectedIndustry || selectedIndustry === "Todas" || caseStudy.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  const featuredCaseStudies = filteredCaseStudies.filter(cs => cs.is_featured);
  const regularCaseStudies = filteredCaseStudies.filter(cs => !cs.is_featured);

  const handleCaseStudyClick = (caseStudy: any) => {
    trackEvent({
      event_type: 'content_interaction',
      event_name: 'case_study_clicked',
      event_data: { 
        case_study_id: caseStudy.id, 
        company_name: caseStudy.company_name,
        industry: caseStudy.industry 
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Casos de Éxito</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Descubre cómo empresas reales han transformado sus operaciones con herramientas de IA. 
          Métricas reales, desafíos superados y resultados medibles.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por empresa, industria o desafío..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <span className="text-sm font-medium text-gray-600">Industria:</span>
          {industries.map(industry => (
            <Button
              key={industry}
              variant={selectedIndustry === industry ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedIndustry(industry === "Todas" ? null : industry)}
            >
              {industry}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Case Studies */}
      {featuredCaseStudies.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-500" />
            Casos Destacados
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredCaseStudies.map((caseStudy) => (
              <Card key={caseStudy.id} className="hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-gradient-to-br from-green-100 to-blue-100">
                  {caseStudy.featured_image && (
                    <img 
                      src={caseStudy.featured_image} 
                      alt={caseStudy.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <Badge className="bg-green-500 text-white">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Caso Destacado
                    </Badge>
                    <Badge variant="outline" className="bg-white">
                      {caseStudy.industry}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex items-start gap-3">
                    {caseStudy.company_logo && (
                      <img 
                        src={caseStudy.company_logo} 
                        alt={caseStudy.company_name}
                        className="w-12 h-12 object-contain"
                      />
                    )}
                    <div className="flex-1">
                      <CardTitle className="text-xl line-clamp-2">
                        {caseStudy.title}
                      </CardTitle>
                      <p className="text-gray-600 font-medium flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {caseStudy.company_name}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(caseStudy.metrics).slice(0, 4).map(([key, value]) => (
                      <div key={key} className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="font-bold text-lg text-green-600">{value}</div>
                        <div className="text-xs text-gray-600 capitalize">
                          {key.replace(/_/g, ' ')}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Challenge & Solution Preview */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-red-500" />
                        Desafío
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {caseStudy.challenge_description}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold flex items-center gap-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-blue-500" />
                        Solución
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {caseStudy.solution_description}
                      </p>
                    </div>
                  </div>

                  {/* Tools Used */}
                  <div>
                    <h4 className="font-semibold mb-2">Herramientas Utilizadas:</h4>
                    <div className="flex flex-wrap gap-1">
                      {caseStudy.tools_used.slice(0, 3).map((tool, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tool}
                        </Badge>
                      ))}
                      {caseStudy.tools_used.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{caseStudy.tools_used.length - 3} más
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Testimonial */}
                  {caseStudy.testimonial && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <Quote className="w-5 h-5 text-blue-500 mb-2" />
                      <p className="text-sm italic text-gray-700 mb-2">
                        "{caseStudy.testimonial}"
                      </p>
                      <div className="text-xs text-gray-600">
                        — {caseStudy.testimonial_author}, {caseStudy.testimonial_position}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {caseStudy.views_count} vistas
                    </span>
                    <Button onClick={() => handleCaseStudyClick(caseStudy)}>
                      Ver Caso Completo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Regular Case Studies */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <BarChart3 className="w-6 h-6" />
          Todos los Casos de Éxito
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularCaseStudies.map((caseStudy) => (
            <Card key={caseStudy.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{caseStudy.industry}</Badge>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {caseStudy.views_count}
                  </span>
                </div>
                <CardTitle className="text-lg line-clamp-2">
                  {caseStudy.title}
                </CardTitle>
                <p className="text-gray-600 flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  {caseStudy.company_name}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Top 2 Metrics */}
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(caseStudy.metrics).slice(0, 2).map(([key, value]) => (
                    <div key={key} className="text-center p-2 bg-green-50 rounded">
                      <div className="font-bold text-green-600">{value}</div>
                      <div className="text-xs text-gray-600 capitalize">
                        {key.replace(/_/g, ' ')}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-gray-600 line-clamp-3">
                  {caseStudy.challenge_description}
                </p>

                {/* Tools */}
                <div className="flex flex-wrap gap-1">
                  {caseStudy.tools_used.slice(0, 2).map((tool, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tool}
                    </Badge>
                  ))}
                  {caseStudy.tools_used.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{caseStudy.tools_used.length - 2}
                    </Badge>
                  )}
                </div>

                <Button 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleCaseStudyClick(caseStudy)}
                >
                  Leer Caso de Estudio
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold">¿Tu empresa logró resultados similares?</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comparte tu caso de éxito con nuestra comunidad. Ayuda a otras empresas a 
            implementar soluciones similares y obtén visibilidad para tu negocio.
          </p>
          <Button size="lg">
            Enviar Mi Caso de Éxito
          </Button>
          <p className="text-xs text-gray-500">
            Casos seleccionados son destacados en nuestro blog y redes sociales
          </p>
        </CardContent>
      </Card>

      {/* Stats */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">{caseStudies.length}+</div>
              <div className="text-sm text-gray-600">Casos de Éxito</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {caseStudies.reduce((sum, cs) => sum + (cs.views_count || 0), 0).toLocaleString()}+
              </div>
              <div className="text-sm text-gray-600">Vistas Totales</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">$2.5M+</div>
              <div className="text-sm text-gray-600">Ahorros Documentados</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">15</div>
              <div className="text-sm text-gray-600">Industrias Cubiertas</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
