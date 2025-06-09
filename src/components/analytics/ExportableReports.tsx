
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { Download, FileText, FileSpreadsheet, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DateRange } from "react-day-picker";

export const ExportableReports = () => {
  const { toast } = useToast();
  const [selectedReport, setSelectedReport] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isExporting, setIsExporting] = useState(false);

  const reportTypes = [
    { value: "user-analytics", label: "Análisis de Usuarios" },
    { value: "tool-performance", label: "Rendimiento de Herramientas" },
    { value: "engagement-metrics", label: "Métricas de Engagement" },
    { value: "conversion-rates", label: "Tasas de Conversión" },
    { value: "roi-analysis", label: "Análisis ROI" }
  ];

  const handleExport = async (format: 'pdf' | 'excel') => {
    if (!selectedReport) {
      toast({
        title: "Selecciona un reporte",
        description: "Por favor selecciona el tipo de reporte a exportar",
        variant: "destructive"
      });
      return;
    }

    setIsExporting(true);

    try {
      // Simular exportación
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Reporte exportado",
        description: `El reporte en formato ${format.toUpperCase()} se ha generado correctamente`,
      });

      // Aquí iría la lógica real de exportación
      console.log(`Exporting ${selectedReport} as ${format}`, { dateRange });

    } catch (error) {
      toast({
        title: "Error al exportar",
        description: "Hubo un problema al generar el reporte",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Reportes Exportables
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tipo de Reporte</label>
            <Select value={selectedReport} onValueChange={setSelectedReport}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un reporte" />
              </SelectTrigger>
              <SelectContent>
                {reportTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Rango de Fechas</label>
            <DatePickerWithRange 
              date={dateRange} 
              onDateChange={setDateRange}
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 border-dashed">
            <div className="text-center space-y-2">
              <FileText className="h-8 w-8 mx-auto text-red-600" />
              <h3 className="font-medium">Exportar PDF</h3>
              <p className="text-sm text-gray-600">Reporte completo con gráficos</p>
              <Button 
                onClick={() => handleExport('pdf')}
                disabled={isExporting}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                {isExporting ? "Generando..." : "Exportar PDF"}
              </Button>
            </div>
          </Card>

          <Card className="p-4 border-dashed">
            <div className="text-center space-y-2">
              <FileSpreadsheet className="h-8 w-8 mx-auto text-green-600" />
              <h3 className="font-medium">Exportar Excel</h3>
              <p className="text-sm text-gray-600">Datos en formato tabular</p>
              <Button 
                onClick={() => handleExport('excel')}
                disabled={isExporting}
                variant="outline"
                className="w-full border-green-600 text-green-600 hover:bg-green-50"
              >
                {isExporting ? "Generando..." : "Exportar Excel"}
              </Button>
            </div>
          </Card>

          <Card className="p-4 border-dashed">
            <div className="text-center space-y-2">
              <Calendar className="h-8 w-8 mx-auto text-blue-600" />
              <h3 className="font-medium">Programar Reporte</h3>
              <p className="text-sm text-gray-600">Envío automático por email</p>
              <Button 
                variant="outline"
                className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Configurar
              </Button>
            </div>
          </Card>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Información del Reporte</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Última actualización:</span>
              <div className="font-medium">Hace 5 minutos</div>
            </div>
            <div>
              <span className="text-gray-600">Registros totales:</span>
              <div className="font-medium">2,847</div>
            </div>
            <div>
              <span className="text-gray-600">Período:</span>
              <div className="font-medium">Últimos 30 días</div>
            </div>
            <div>
              <span className="text-gray-600">Formato:</span>
              <div className="font-medium">PDF/Excel</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
