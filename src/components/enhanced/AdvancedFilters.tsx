
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { difficultyLevels, learningCurves, communitySizes } from "@/data/expandedToolsDatabase";

interface AdvancedFiltersProps {
  filters: {
    difficultyRange: [number, number];
    learningCurve: string | null;
    communitySize: string | null;
    hasApi: boolean | null;
    hasFreeVersion: boolean | null;
    minRating: number;
    maxPricing: number;
    integrationOptions: string[];
  };
  onFiltersChange: (filters: any) => void;
  onClearFilters: () => void;
}

export const AdvancedFilters = ({ filters, onFiltersChange, onClearFilters }: AdvancedFiltersProps) => {
  const updateFilter = (key: string, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const commonIntegrations = [
    'API REST', 'Zapier', 'Slack', 'Google Analytics', 'Stripe', 
    'GitHub', 'Figma', 'WordPress', 'Shopify', 'Firebase'
  ];

  const toggleIntegration = (integration: string) => {
    const current = filters.integrationOptions || [];
    if (current.includes(integration)) {
      updateFilter('integrationOptions', current.filter(i => i !== integration));
    } else {
      updateFilter('integrationOptions', [...current, integration]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Filtros Avanzados</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Difficulty Range */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Nivel de Dificultad: {filters.difficultyRange[0]} - {filters.difficultyRange[1]}
          </Label>
          <Slider
            min={1}
            max={10}
            step={1}
            value={filters.difficultyRange}
            onValueChange={(value) => updateFilter('difficultyRange', value as [number, number])}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Muy Fácil</span>
            <span>Muy Difícil</span>
          </div>
        </div>

        {/* Learning Curve */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Curva de Aprendizaje</Label>
          <Select
            value={filters.learningCurve || "all"}
            onValueChange={(value) => updateFilter('learningCurve', value === "all" ? null : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Cualquiera" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Cualquiera</SelectItem>
              <SelectItem value="immediate">Inmediata</SelectItem>
              <SelectItem value="gentle">Suave</SelectItem>
              <SelectItem value="moderate">Moderada</SelectItem>
              <SelectItem value="steep">Pronunciada</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Community Size */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Tamaño de Comunidad</Label>
          <Select
            value={filters.communitySize || "all"}
            onValueChange={(value) => updateFilter('communitySize', value === "all" ? null : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Cualquiera" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Cualquiera</SelectItem>
              <SelectItem value="small">Pequeña</SelectItem>
              <SelectItem value="medium">Mediana</SelectItem>
              <SelectItem value="large">Grande</SelectItem>
              <SelectItem value="massive">Masiva</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Rating Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Calificación Mínima: {filters.minRating}/5
          </Label>
          <Slider
            min={1}
            max={5}
            step={0.1}
            value={[filters.minRating]}
            onValueChange={(value) => updateFilter('minRating', value[0])}
            className="w-full"
          />
        </div>

        {/* Boolean Filters */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="has-api" className="text-sm font-medium">
              Tiene API Disponible
            </Label>
            <Switch
              id="has-api"
              checked={filters.hasApi === true}
              onCheckedChange={(checked) => updateFilter('hasApi', checked ? true : null)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="has-free" className="text-sm font-medium">
              Versión Gratuita
            </Label>
            <Switch
              id="has-free"
              checked={filters.hasFreeVersion === true}
              onCheckedChange={(checked) => updateFilter('hasFreeVersion', checked ? true : null)}
            />
          </div>
        </div>

        {/* Integration Options */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Integraciones Requeridas</Label>
          <div className="flex flex-wrap gap-2">
            {commonIntegrations.map(integration => (
              <Badge
                key={integration}
                variant={filters.integrationOptions?.includes(integration) ? "default" : "outline"}
                className="cursor-pointer text-xs"
                onClick={() => toggleIntegration(integration)}
              >
                {integration}
              </Badge>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <Button
          variant="outline"
          onClick={onClearFilters}
          className="w-full"
        >
          Limpiar Todos los Filtros
        </Button>
      </CardContent>
    </Card>
  );
};
