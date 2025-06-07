
interface EnhancedToolsHeaderProps {
  isLoading: boolean;
}

export const EnhancedToolsHeader = ({ isLoading }: EnhancedToolsHeaderProps) => {
  if (isLoading) {
    return (
      <div className="text-center mb-8">
        <div className="h-8 bg-gray-200 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded-lg w-96 mx-auto animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="text-center mb-8 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-high-contrast mb-4">
        Herramientas IA Avanzadas
      </h1>
      <p className="text-medium-contrast text-lg max-w-2xl mx-auto">
        Descubre las mejores herramientas de inteligencia artificial para potenciar tu trabajo
      </p>
    </div>
  );
};
