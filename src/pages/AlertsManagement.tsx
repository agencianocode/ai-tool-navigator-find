
import { AlertsManager } from "@/components/alerts/AlertsManager";
import { AlertsProcessor } from "@/components/alerts/AlertsProcessor";

const AlertsManagement = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <AlertsManager />
        <AlertsProcessor />
      </div>
    </div>
  );
};

export default AlertsManagement;
