
import { LoadingSpinner } from "./loading-spinner";

interface PageLoaderProps {
  message?: string;
}

export const PageLoader = ({ message = "Cargando..." }: PageLoaderProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center space-y-4">
        <LoadingSpinner size="lg" />
        <p className="text-lg text-gray-600">{message}</p>
      </div>
    </div>
  );
};
