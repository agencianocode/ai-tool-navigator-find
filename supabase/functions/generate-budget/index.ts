
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "../_shared/cors.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user) throw new Error("User not authenticated");

    const requestData = await req.json();
    const { 
      projectName, 
      projectType, 
      estimatedUsers, 
      features, 
      selectedTools 
    } = requestData;

    console.log('Budget generation request:', { projectName, projectType, estimatedUsers, features, selectedTools });

    // Get budget templates
    const { data: templates, error: templatesError } = await supabaseClient
      .from("budget_templates")
      .select("*");

    if (templatesError) throw templatesError;

    let budgetItems = [];
    let totalCost = 0;
    let monthlyRecurring = 0;

    // Calculate costs based on selected tools and project requirements
    if (selectedTools && selectedTools.length > 0) {
      for (const toolName of selectedTools) {
        const template = templates.find(t => 
          t.name.toLowerCase().includes(toolName.toLowerCase()) ||
          toolName.toLowerCase().includes(t.name.toLowerCase())
        );
        
        if (template) {
          const userCost = template.cost_per_user * (estimatedUsers || 1);
          const featureCost = template.cost_per_feature * (features?.length || 1);
          const itemTotal = template.base_cost + userCost + featureCost;
          
          budgetItems.push({
            name: template.name,
            category: template.category,
            baseCost: template.base_cost,
            userCost: userCost,
            featureCost: featureCost,
            total: itemTotal,
            description: template.description
          });
          
          totalCost += itemTotal;
          monthlyRecurring += itemTotal;
        }
      }
    }

    // Add some default items based on project type
    const defaultItems = [];
    
    if (projectType === 'web-app' || projectType === 'mobile-app') {
      defaultItems.push('Supabase Database', 'Vercel Hosting');
    }
    
    if (features?.includes('payments')) {
      defaultItems.push('Stripe Payment Processing');
    }
    
    if (features?.includes('ai')) {
      defaultItems.push('ChatGPT API');
    }

    for (const itemName of defaultItems) {
      const template = templates.find(t => t.name === itemName);
      if (template && !budgetItems.find(item => item.name === template.name)) {
        const userCost = template.cost_per_user * (estimatedUsers || 1);
        const featureCost = template.cost_per_feature * (features?.length || 1);
        const itemTotal = template.base_cost + userCost + featureCost;
        
        budgetItems.push({
          name: template.name,
          category: template.category,
          baseCost: template.base_cost,
          userCost: userCost,
          featureCost: featureCost,
          total: itemTotal,
          description: template.description
        });
        
        totalCost += itemTotal;
        monthlyRecurring += itemTotal;
      }
    }

    // Save the generated budget
    const { data: savedBudget, error: saveError } = await supabaseClient
      .from("generated_budgets")
      .insert({
        user_id: user.id,
        project_name: projectName,
        total_cost: totalCost,
        monthly_cost: monthlyRecurring,
        budget_items: budgetItems,
        project_details: {
          projectType,
          estimatedUsers,
          features,
          selectedTools
        }
      })
      .select()
      .single();

    if (saveError) throw saveError;

    return new Response(JSON.stringify({
      success: true,
      budget: {
        id: savedBudget.id,
        projectName,
        totalCost,
        monthlyRecurring,
        budgetItems,
        projectDetails: {
          projectType,
          estimatedUsers,
          features,
          selectedTools
        }
      }
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('Error generating budget:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
