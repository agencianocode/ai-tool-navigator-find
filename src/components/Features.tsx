
import { Brain, BookOpen, Database, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "Smart Matching Algorithm",
      description: "Our AI analyzes your project requirements, budget, and technical needs to suggest the most suitable tools for your specific use case.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: BookOpen,
      title: "Step-by-Step Implementation",
      description: "Get detailed guides and tutorials for each recommended tool, including setup instructions, best practices, and real-world examples.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Database,
      title: "Curated Tool Database",
      description: "Access our expertly curated database of 500+ AI tools, SaaS solutions, and platforms, updated weekly with the latest innovations.",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              It Works
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our intelligent system takes the guesswork out of choosing AI tools. 
            Here's how we help you find your perfect match.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-purple-100 hover:bg-white/90 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors duration-200">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Process Steps */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl p-8 sm:p-12 border border-purple-100">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-12">
            Your Discovery Journey in 3 Simple Steps
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-xl font-bold mb-4">
                1
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Tell Us Your Needs</h4>
              <p className="text-gray-600">Answer a few quick questions about your project, goals, and technical requirements.</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-xl font-bold mb-4">
                2
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Get Smart Recommendations</h4>
              <p className="text-gray-600">Our AI analyzes your responses and matches you with the perfect tools for your use case.</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-xl font-bold mb-4">
                3
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Start Building</h4>
              <p className="text-gray-600">Follow our step-by-step guides to implement your chosen tools and bring your ideas to life.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
