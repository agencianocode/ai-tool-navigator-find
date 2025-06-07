
import { ContentHub } from "@/components/content/ContentHub";
import { SEO } from "@/components/SEO";

const ContentHubPage = () => {
  return (
    <>
      <SEO
        title="Centro de Contenido - AI Tool Navigator"
        description="Tutoriales paso a paso, casos de uso reales con métricas, comparaciones en video y webinars con expertos en IA y tecnología."
        url="https://ai-tool-navigator.com/content"
      />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ContentHub />
        </div>
      </div>
    </>
  );
};

export default ContentHubPage;
