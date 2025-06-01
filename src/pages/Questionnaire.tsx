
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import QuestionnaireStep from "@/components/questionnaire/QuestionnaireStep";
import { QuestionnaireProvider } from "@/components/questionnaire/QuestionnaireContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Questionnaire = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Inicio
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Cuestionario de Descubrimiento de Herramientas IA
          </h1>
          <p className="text-gray-600">
            Ayúdanos a encontrar las herramientas de IA perfectas para tus necesidades respondiendo algunas preguntas.
          </p>
        </div>

        <QuestionnaireProvider>
          <QuestionnaireStep />
        </QuestionnaireProvider>
      </div>
    </div>
  );
};

export default Questionnaire;
