
import { AnalyticsDashboard } from "@/components/analytics/AnalyticsDashboard";
import { SEO } from "@/components/SEO";

const Analytics = () => {
  return (
    <>
      <SEO
        title="Analytics e Inteligencia - AI Tool Navigator"
        description="Dashboard avanzado con insights de mercado, tendencias de herramientas, análisis ROI y reportes de productividad del equipo."
        url="https://ai-tool-navigator.com/analytics"
      />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AnalyticsDashboard />
        </div>
      </div>
    </>
  );
};

export default Analytics;
