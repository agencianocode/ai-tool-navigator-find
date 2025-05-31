
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Target, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-purple-600 mr-2" />
            <span className="text-sm font-medium text-purple-700">
              Discover Your Perfect AI Tools
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Find the{" "}
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Perfect AI Tools
            </span>
            <br />
            for Your Next Project
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            Stop wasting time searching through endless AI tools. Our intelligent matching system 
            analyzes your needs and recommends the exact solutions to power your projects and business.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl group"
            >
              Start Discovery Journey
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-4 rounded-lg transition-all duration-200 hover:border-purple-300"
            >
              See How It Works
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-100 hover:bg-white/80 transition-all duration-300 animate-fade-in">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl mb-4 mx-auto">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">AI Tools Curated</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-100 hover:bg-white/80 transition-all duration-300 animate-fade-in">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl mb-4 mx-auto">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">98%</h3>
              <p className="text-gray-600">Match Accuracy</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-100 hover:bg-white/80 transition-all duration-300 animate-fade-in">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl mb-4 mx-auto">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">10K+</h3>
              <p className="text-gray-600">Happy Users</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
