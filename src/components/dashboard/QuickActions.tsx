
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Search, 
  BookOpen, 
  Settings,
  Zap,
  Heart
} from "lucide-react";
import { Link } from "react-router-dom";

const QuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Acciones Rápidas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Link to="/questionnaire" className="block">
          <Button className="w-full justify-start" variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Evaluación
          </Button>
        </Link>
        <Link to="/tools" className="block">
          <Button className="w-full justify-start" variant="outline">
            <Search className="mr-2 h-4 w-4" />
            Explorar Herramientas
          </Button>
        </Link>
        <Link to="/favorites" className="block">
          <Button className="w-full justify-start" variant="outline">
            <Heart className="mr-2 h-4 w-4" />
            Mis Favoritos
          </Button>
        </Link>
        <Link to="/guides" className="block">
          <Button className="w-full justify-start" variant="outline">
            <BookOpen className="mr-2 h-4 w-4" />
            Guías y Tutoriales
          </Button>
        </Link>
        <Link to="/settings" className="block">
          <Button className="w-full justify-start" variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Configuración
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
