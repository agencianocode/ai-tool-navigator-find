
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('Starting content population...')

    // Poblar templates
    const templates = [
      {
        id: 'chatbot-customer-service',
        title: 'Chatbot de Atención al Cliente con IA',
        description: 'Template completo para implementar un chatbot inteligente que maneja consultas de clientes 24/7 usando ChatGPT y Dialogflow.',
        category: 'Atención al Cliente',
        industry: 'E-commerce',
        difficulty_level: 'intermediate',
        estimated_timeline: '4-6 semanas',
        implementation_time: '2-3 días',
        price: 49.99,
        tools_included: JSON.stringify(['ChatGPT API', 'Dialogflow', 'Zapier', 'WhatsApp Business']),
        preview_images: JSON.stringify(['/api/placeholder/800/600', '/api/placeholder/800/600']),
        demo_url: 'https://demo.chatbot-template.com',
        roi_metrics: JSON.stringify({
          cost_reduction: '40%',
          response_time_improvement: '80%',
          customer_satisfaction: '4.8/5',
          setup_cost: '$500'
        }),
        success_stories: JSON.stringify([
          'TechStore redujo 40% los costos de soporte',
          'FashionBrand mejoró satisfacción del cliente en 35%'
        ]),
        author_name: 'Carlos Mendoza',
        author_type: 'certified',
        support_level: 'premium',
        rating: 4.8,
        downloads_count: 245,
        reviews_count: 32,
        is_featured: true,
        template_data: JSON.stringify({
          phases: [
            {
              name: 'Configuración Inicial',
              tasks: ['Configurar APIs', 'Diseñar flujos', 'Integrar WhatsApp'],
              duration: '1 semana'
            },
            {
              name: 'Implementación',
              tasks: ['Crear chatbot', 'Entrenar IA', 'Configurar escalación'],
              duration: '2-3 semanas'
            },
            {
              name: 'Testing y Optimización',
              tasks: ['Pruebas integrales', 'Optimizar respuestas', 'Capacitar equipo'],
              duration: '1 semana'
            }
          ]
        })
      },
      {
        id: 'automated-email-marketing',
        title: 'Email Marketing Automatizado con IA',
        description: 'Sistema completo de email marketing que usa IA para personalizar contenido, segmentar audiencias y optimizar horarios de envío.',
        category: 'Marketing Digital',
        industry: 'SaaS',
        difficulty_level: 'beginner',
        estimated_timeline: '2-3 semanas',
        implementation_time: '1 día',
        price: 29.99,
        tools_included: JSON.stringify(['Mailchimp', 'ChatGPT', 'Zapier', 'Google Analytics']),
        roi_metrics: JSON.stringify({
          open_rate_improvement: '65%',
          conversion_increase: '120%',
          time_saved: '15 horas/semana',
          monthly_revenue_increase: '$5,000'
        }),
        success_stories: JSON.stringify([
          'StartupAI aumentó conversiones 120% en 30 días',
          'DigitalAgency ahorró 15 horas semanales'
        ]),
        author_name: 'Ana González',
        author_type: 'verified',
        support_level: 'community',
        rating: 4.6,
        downloads_count: 189,
        reviews_count: 28,
        template_data: JSON.stringify({
          phases: [
            {
              name: 'Setup y Configuración',
              tasks: ['Conectar Mailchimp', 'Configurar Zapier', 'Setup ChatGPT'],
              duration: '2-3 días'
            },
            {
              name: 'Automatización',
              tasks: ['Crear flujos de email', 'Segmentar audiencias', 'Personalizar contenido'],
              duration: '1 semana'
            }
          ]
        })
      }
    ]

    for (const template of templates) {
      const { error } = await supabaseClient
        .from('roadmap_templates')
        .upsert(template, { onConflict: 'id' })
      
      if (error) {
        console.error('Error inserting template:', error)
      } else {
        console.log('Template inserted successfully:', template.title)
      }
    }

    // Poblar blog posts
    const blogPosts = [
      {
        id: 'chatgpt-business-automation-2024',
        title: 'Cómo ChatGPT Está Revolucionando la Automatización Empresarial en 2024',
        slug: 'chatgpt-business-automation-2024',
        excerpt: 'Descubre las últimas aplicaciones de ChatGPT en automatización empresarial y cómo implementarlas en tu negocio.',
        content: `# Cómo ChatGPT Está Revolucionando la Automatización Empresarial en 2024

La inteligencia artificial ha llegado para transformar completamente la forma en que las empresas operan...`,
        author_name: 'Dr. Elena Ramírez',
        category: 'IA Generativa',
        tags: JSON.stringify(['ChatGPT', 'automatización', 'empresas', 'productividad']),
        featured_image: '/api/placeholder/800/400',
        read_time: 8,
        views_count: 2847,
        likes_count: 156,
        is_featured: true,
        published_at: '2024-01-15T10:00:00Z',
        status: 'published',
        seo_title: 'ChatGPT para Automatización Empresarial 2024 - Guía Completa',
        seo_description: 'Descubre cómo implementar ChatGPT en tu empresa para automatizar procesos y aumentar la productividad. Casos de éxito y guía práctica.'
      },
      {
        id: 'roi-ai-tools-small-business',
        title: 'ROI Real: Cómo las PyMEs Pueden Obtener Retorno de Inversión con Herramientas de IA',
        slug: 'roi-ai-tools-small-business',
        excerpt: 'Análisis detallado del retorno de inversión real que las pequeñas y medianas empresas pueden esperar al implementar herramientas de IA.',
        content: `# ROI Real: IA para PyMEs

Las pequeñas y medianas empresas a menudo se preguntan si la inversión en herramientas de IA vale la pena...`,
        author_name: 'Ana González',
        category: 'ROI y Métricas',
        tags: JSON.stringify(['ROI', 'PyMEs', 'casos de estudio', 'métricas']),
        featured_image: '/api/placeholder/800/400',
        read_time: 12,
        views_count: 3456,
        likes_count: 234,
        is_featured: true,
        published_at: '2024-01-08T09:00:00Z',
        status: 'published'
      }
    ]

    for (const post of blogPosts) {
      const { error } = await supabaseClient
        .from('blog_posts')
        .upsert(post, { onConflict: 'id' })
      
      if (error) {
        console.error('Error inserting blog post:', error)
      } else {
        console.log('Blog post inserted successfully:', post.title)
      }
    }

    // Poblar casos de estudio
    const caseStudies = [
      {
        id: 'techstore-chatbot-success',
        title: 'TechStore: 40% Reducción en Costos de Soporte con Chatbot IA',
        slug: 'techstore-chatbot-success',
        company_name: 'TechStore Pro',
        industry: 'E-commerce',
        challenge_description: 'TechStore Pro, una tienda online de electrónicos con 50,000 clientes mensuales, enfrentaba altos costos de soporte al cliente y tiempos de respuesta lentos.',
        solution_description: 'Implementaron un chatbot inteligente usando ChatGPT integrado con su sistema de inventario y CRM.',
        results_description: 'En 6 meses, TechStore redujo costos de soporte en 40%, mejoró el tiempo de respuesta de 4 horas a 30 segundos, y aumentó la satisfacción del cliente.',
        tools_used: JSON.stringify(['ChatGPT API', 'Zapier', 'Shopify', 'Zendesk', 'Google Analytics']),
        metrics: JSON.stringify({
          cost_reduction: '40%',
          response_time_improvement: '89%',
          customer_satisfaction: '4.6/5',
          roi_first_year: '320%',
          tickets_automated: '75%',
          team_size_reduction: '3 agentes'
        }),
        featured_image: '/api/placeholder/800/600',
        company_logo: '/api/placeholder/200/100',
        testimonial: 'El chatbot IA transformó completamente nuestra atención al cliente. No solo redujimos costos significativamente, sino que nuestros clientes están más satisfechos que nunca.',
        testimonial_author: 'María González',
        testimonial_position: 'Directora de Atención al Cliente',
        is_featured: true,
        views_count: 1847
      },
      {
        id: 'agenciacreativa-content-automation',
        title: 'Agencia Creativa: Triplicó Producción de Contenido con IA',
        slug: 'agenciacreativa-content-automation',
        company_name: 'Agencia Creativa Digital',
        industry: 'Marketing Digital',
        challenge_description: 'Agencia Creativa Digital gestionaba 15 clientes pero luchaba por mantener un flujo constante de contenido de calidad.',
        solution_description: 'Implementaron un sistema automatizado de generación de contenido usando ChatGPT para ideas, DALL-E para imágenes, y Canva API para diseños.',
        results_description: 'La agencia triplicó su producción de contenido, pasando de 50 a 150 posts semanales, mientras redujo el tiempo de creación por post.',
        tools_used: JSON.stringify(['ChatGPT', 'DALL-E', 'Canva API', 'Buffer', 'Make.com', 'Notion']),
        metrics: JSON.stringify({
          content_production_increase: '300%',
          time_per_post_reduction: '83%',
          new_clients_capacity: '8 clientes adicionales',
          revenue_increase: '€45,000/mes',
          team_efficiency: '+200%',
          client_satisfaction: '4.8/5'
        }),
        testimonial: 'La automatización con IA nos permitió escalar el negocio sin perder calidad. Nuestros clientes están impresionados con la consistencia y creatividad del contenido.',
        testimonial_author: 'Diego Martínez',
        testimonial_position: 'Director Creativo',
        is_featured: true,
        views_count: 2156
      }
    ]

    for (const caseStudy of caseStudies) {
      const { error } = await supabaseClient
        .from('case_studies')
        .upsert(caseStudy, { onConflict: 'id' })
      
      if (error) {
        console.error('Error inserting case study:', error)
      } else {
        console.log('Case study inserted successfully:', caseStudy.title)
      }
    }

    console.log('Content population completed successfully!')

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Content populated successfully',
        summary: {
          templates: templates.length,
          blog_posts: blogPosts.length,
          case_studies: caseStudies.length
        }
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error in populate-content function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Error populating content',
        details: 'Check function logs for more information'
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
