
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calculator, Download, DollarSign, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface BudgetItem {
  category: string;
  tool: string;
  monthlyPrice: number;
  yearlyPrice: number;
  essential: boolean;
}

interface BudgetSummary {
  totalMonthly: number;
  totalYearly: number;
  savingsYearly: number;
  items: BudgetItem[];
}

export const BudgetGenerator = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [companySize, setCompanySize] = useState("");
  const [industry, setIndustry] = useState("");
  const [budget, setBudget] = useState<BudgetSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateBudget = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para generar presupuestos",
        variant: "destructive",
      });
      return;
    }

    if (!companySize || !industry) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('generate-budget', {
        body: {
          companySize,
          industry,
          userId: user.id
        }
      });

      if (error) throw error;

      setBudget(data);

      toast({
        title: "Presupuesto generado",
        description: "Tu presupuesto personalizado ha sido creado exitosamente",
      });

    } catch (error) {
      console.error('Error generating budget:', error);
      toast({
        title: "Error",
        description: "Error al generar el presupuesto. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadBudget = async () => {
    if (!budget) return;

    try {
      const { data, error } = await supabase.functions.invoke('export-budget-pdf', {
        body: {
          budget,
          companySize,
          industry
        }
      });

      if (error) throw error;

      // Crear y descargar el PDF
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `presupuesto-ia-tools-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Descarga iniciada",
        description: "Tu presupuesto se está descargando como PDF",
      });

    } catch (error) {
      console.error('Error downloading budget:', error);
      toast({
        title: "Error",
        description: "Error al descargar el presupuesto",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Generador de Presupuestos IA
        </h1>
        <p className="text-gray-600">
          Obtén un presupuesto personalizado basado en las mejores herramientas IA para tu negocio
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Información de tu empresa
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="companySize">Tamaño de empresa</Label>
            <select
              id="companySize"
              value={companySize}
              onChange={(e) => setCompanySize(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Selecciona el tamaño</option>
              <option value="1-5">1-5 empleados</option>
              <option value="6-20">6-20 empleados</option>
              <option value="21-50">21-50 empleados</option>
              <option value="51-200">51-200 empleados</option>
              <option value="200+">Más de 200 empleados</option>
            </select>
          </div>

          <div>
            <Label htmlFor="industry">Industria</Label>
            <select
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Selecciona tu industria</option>
              <option value="tecnologia">Tecnología</option>
              <option value="marketing">Marketing Digital</option>
              <option value="ecommerce">E-commerce</option>
              <option value="consultoria">Consultoría</option>
              <option value="educacion">Educación</option>
              <option value="salud">Salud</option>
              <option value="finanzas">Finanzas</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <Button onClick={generateBudget} disabled={isLoading} className="w-full">
            {isLoading ? "Generando..." : "Generar Presupuesto"}
          </Button>
        </CardContent>
      </Card>

      {budget && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Resumen del Presupuesto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    ${budget.totalMonthly}
                  </div>
                  <div className="text-sm text-gray-600">Costo mensual</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    ${budget.totalYearly}
                  </div>
                  <div className="text-sm text-gray-600">Costo anual</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    ${budget.savingsYearly}
                  </div>
                  <div className="text-sm text-gray-600">Ahorro anual</div>
                </div>
              </div>

              <Button onClick={downloadBudget} className="w-full mb-4">
                <Download className="w-4 h-4 mr-2" />
                Descargar Presupuesto PDF
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Herramientas Recomendadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {budget.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{item.tool}</h4>
                        {item.essential && (
                          <Badge variant="default" className="text-xs">
                            Esencial
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${item.monthlyPrice}/mes</div>
                      <div className="text-sm text-gray-600">${item.yearlyPrice}/año</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
