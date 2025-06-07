
import { CommunityHub } from "@/components/community/CommunityHub";
import { SEO } from "@/components/SEO";

const Community = () => {
  return (
    <>
      <SEO
        title="Comunidad - AI Tool Navigator"
        description="Únete a nuestra comunidad de profesionales. Foro de discusión, mentores expertos y eventos virtuales sobre IA y tecnología."
        url="https://ai-tool-navigator.com/community"
      />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <CommunityHub />
        </div>
      </div>
    </>
  );
};

export default Community;
