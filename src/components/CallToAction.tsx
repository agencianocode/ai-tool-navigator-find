
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-3xl p-8 sm:p-12 text-center overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3Ccircle%20cx%3D%2227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3Ccircle%20cx%3D%2247%22%20cy%3D%227%22%20r%3D%221%22/%3E%3Ccircle%20cx%3D%227%22%20cy%3D%2227%22%20r%3D%221%22/%3E%3Ccircle%20cx%3D%2227%22%20cy%3D%2227%22%20r%3D%221%22/%3E%3Ccircle%20cx%3D%2247%22%20cy%3D%2227%22%20r%3D%221%22/%3E%3Ccircle%20cx%3D%227%22%20cy%3D%2247%22%20r%3D%221%22/%3E%3Ccircle%20cx%3D%2227%22%20cy%3D%2247%22%20r%3D%221%22/%3E%3Ccircle%20cx%3D%2247%22%20cy%3D%2247%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6">
              <Sparkles className="w-4 h-4 text-white mr-2" />
              <span className="text-sm font-medium text-white">
                Ready to Transform Your Workflow?
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Start Your AI Tool Discovery
              <br />
              Journey Today
            </h2>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of creators, entrepreneurs, and businesses who've found their perfect AI tools. 
              Your next breakthrough is just a few questions away.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                className="bg-white text-purple-700 hover:bg-gray-50 px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl group font-semibold"
              >
                Begin Discovery Questionnaire
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-lg transition-all duration-200 backdrop-blur-sm"
              >
                Learn More About Our Process
              </Button>
            </div>
            
            <div className="mt-8 text-white/80 text-sm">
              ✨ Free to use • No credit card required • Instant results
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
