
import { GoogleGenAI } from "@google/genai";
import { AGENT_INSTRUCTIONS } from "./newsletter-agents";

export class NewsletterOrchestrator {
  private ai: any;
  private model: string = "gemini-3.7-flash";

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }

  private async runAgent(instruction: string, input: any): Promise<any> {
    const prompt = `Input: ${JSON.stringify(input)}`;
    const result = await this.ai.models.generateContent({
      model: this.model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: instruction,
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(result.text || '{}');
  }

  async generateNewsletter(context: any): Promise<any> {
    const shared_memory: any = {};
    
    // 1. Audience Needs
    shared_memory.audience_needs = await this.runAgent(AGENT_INSTRUCTIONS.AUDIENCE_RESEARCHER, { 
      questions: context.questions || [], 
      searches: context.searches || [] 
    });

    // 2. Trends
    shared_memory.trends = await this.runAgent(AGENT_INSTRUCTIONS.TREND_RESEARCHER, { 
      popular_topics: context.popular_topics || [] 
    });

    // 3. Seasonal Context
    shared_memory.seasonal_context = await this.runAgent(AGENT_INSTRUCTIONS.SEASONAL_CONTEXT, { 
      date: new Date().toISOString(), 
      season: context.season 
    });

    // 4. Customer Voice
    shared_memory.customer_voice = await this.runAgent(AGENT_INSTRUCTIONS.CUSTOMER_VOICE, { 
      feedbacks: context.feedbacks || [] 
    });

    // 5. Topic Selector
    shared_memory.selected_topic = await this.runAgent(AGENT_INSTRUCTIONS.TOPIC_SELECTOR, {
      needs: shared_memory.audience_needs,
      trends: shared_memory.trends,
      context: shared_memory.seasonal_context,
      voice: shared_memory.customer_voice
    });

    // 6. Fact Researcher
    shared_memory.fact_research = await this.runAgent(AGENT_INSTRUCTIONS.FACT_RESEARCHER, {
      topic: shared_memory.selected_topic
    });

    // 7. Editorial Writer
    shared_memory.editorial_draft = await this.runAgent(AGENT_INSTRUCTIONS.EDITORIAL_WRITER, {
      topic: shared_memory.selected_topic,
      facts: shared_memory.fact_research
    });

    // 8. Claims & Safety
    shared_memory.claims_review = await this.runAgent(AGENT_INSTRUCTIONS.CLAIMS_SAFETY, {
      draft: shared_memory.editorial_draft
    });

    // 9. Personalization (Simplified for now)
    shared_memory.personalization = await this.runAgent(AGENT_INSTRUCTIONS.PERSONALIZATION, {
      draft: shared_memory.claims_review.revised_copy || shared_memory.editorial_draft.body_markdown
    });

    // 10. HTML Builder
    shared_memory.html_output = await this.runAgent(AGENT_INSTRUCTIONS.HTML_BUILDER, {
      content: shared_memory.personalization
    });

    // 11. Quality Gate
    shared_memory.quality_report = await this.runAgent(AGENT_INSTRUCTIONS.QUALITY_GATE, {
      html: shared_memory.html_output,
      claims: shared_memory.claims_review
    });

    return shared_memory;
  }
}
