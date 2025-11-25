import { GoogleGenAI } from "@google/genai";
import { AgentMetrics, KPITargets } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCoachingPlan = async (
  agent: AgentMetrics,
  metricName: string,
  actualValue: number,
  targetValue: number,
  context: string = ""
): Promise<string> => {
  try {
    const prompt = `
      You are an expert BPO Team Leader and Coach.
      Target Audience: Agent named ${agent.name}.
      
      Context:
      The agent is currently underperforming in ${metricName}.
      - Actual Score: ${actualValue}
      - Target Score: ${targetValue}
      - Additional Context: ${context}
      
      Task:
      Generate a structured coaching log entry using the GROW model or similar effective feedback framework.
      The output MUST be in HTML format (without markdown code blocks) suitable for embedding in a div.
      
      Structure required:
      <h3>1. Observation (The "What")</h3>
      <p>Objective statement about the gap.</p>
      
      <h3>2. Impact (The "Why")</h3>
      <p>Why this metric matters to the business/customer.</p>
      
      <h3>3. Root Cause Analysis (The "How")</h3>
      <p>Potential reasons (suggest 2-3 likely behavioral or knowledge gaps).</p>
      
      <h3>4. Action Plan (The "Next Steps")</h3>
      <ul>
        <li>Specific action item 1</li>
        <li>Specific action item 2</li>
      </ul>
      
      <h3>5. Commitment</h3>
      <p>A suggested commitment statement for the agent to sign off on.</p>
      
      Tone: Professional, supportive, yet firm on standards.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "<p>Error generating coaching plan.</p>";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "<p>Failed to connect to AI service. Please check your API key.</p>";
  }
};
