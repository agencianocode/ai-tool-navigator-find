
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Image, FileText } from "lucide-react";

interface MultimediaReviewProps {
  videoUrl?: string;
  images?: string[];
  attachments?: { name: string; url: string; type: string }[];
}

export const MultimediaReview = ({ videoUrl, images = [], attachments = [] }: MultimediaReviewProps) => {
  const [showVideo, setShowVideo] = useState(false);

  if (!videoUrl && images.length === 0 && attachments.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Video */}
      {videoUrl && (
        <Card>
          <CardContent className="p-4">
            {!showVideo ? (
              <div className="relative bg-gray-100 rounded-lg p-8 text-center">
                <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Button onClick={() => setShowVideo(true)} size="lg">
                    <Play className="mr-2 h-5 w-5" />
                    Reproducir Video Reseña
                  </Button>
                </div>
                <div className="text-gray-500">
                  <Play className="w-12 h-12 mx-auto mb-2" />
                  <p>Video reseña disponible</p>
                </div>
              </div>
            ) : (
              <div className="aspect-video">
                <iframe
                  src={videoUrl}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                  title="Video reseña"
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Images */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Captura ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg border"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                <Image className="w-6 h-6 text-white opacity-0 group-hover:opacity-100" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Attachments */}
      {attachments.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Archivos adjuntos:</h4>
          {attachments.map((attachment, index) => (
            <a
              key={index}
              href={attachment.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
            >
              <FileText className="w-4 h-4" />
              {attachment.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
