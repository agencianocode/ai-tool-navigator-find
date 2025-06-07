
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export const SEO = ({
  title = "AI Tool Navigator - Encuentra las Mejores Herramientas de IA",
  description = "Descubre y compara las mejores herramientas de inteligencia artificial para tu proyecto. Generador de hojas de ruta personalizado, reviews y análisis detallados.",
  image = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  url = "https://ai-tool-navigator.com",
  type = "website",
  keywords = ["inteligencia artificial", "herramientas IA", "tecnología", "automatización", "productividad"],
  author = "AI Tool Navigator",
  publishedTime,
  modifiedTime
}: SEOProps) => {
  const fullTitle = title.includes("AI Tool Navigator") ? title : `${title} | AI Tool Navigator`;

  return (
    <Helmet>
      {/* Título y descripción básicos */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="author" content={author} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="AI Tool Navigator" />
      <meta property="og:locale" content="es_ES" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@aitoolnavigator" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Article specific */}
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === "article" && author && (
        <meta property="article:author" content={author} />
      )}
      
      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === "article" ? "Article" : "WebSite",
          "name": fullTitle,
          "description": description,
          "url": url,
          "image": image,
          "author": {
            "@type": "Organization",
            "name": author
          },
          ...(type === "website" && {
            "potentialAction": {
              "@type": "SearchAction",
              "target": `${url}/tools?search={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          }),
          ...(publishedTime && { "datePublished": publishedTime }),
          ...(modifiedTime && { "dateModified": modifiedTime })
        })}
      </script>
    </Helmet>
  );
};
