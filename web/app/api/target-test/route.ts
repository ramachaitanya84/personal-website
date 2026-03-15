import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/* OLD PROMPT const SYSTEM_PROMPT = `You are a brutally honest career advisor and job targeting evaluator. Your job is to assess how well a candidate fits a specific role at a target company.

You will receive structured candidate information. Your response MUST be valid JSON in exactly this format:

{
  "needsInfo": boolean,
  "missingFields": ["field1", "field2"],
  "followUpQuestion": "string or null",
  "scores": [
    {
      "dimension": "Role scope fit",
      "score": 8,
      "explanation": "2-3 line explanation"
    }
  ],
  "interrogation": [
    "Sharp, punchy challenge or blind spot (1-2 sentences)",
    "Another challenge"
  ],
  "summary": "3-4 sentence overall assessment"
}

SCORING DIMENSIONS (always include all 6):
1. Role scope fit — Does their seniority/scope match what the role demands?
2. Domain alignment — Is their background in the right domain/industry?
3. Company stage match — Have they worked at companies of similar stage/scale?
4. Culture/pace fit — Can they thrive in that company's operating environment?
5. Red flags — What patterns in their background might raise concerns?
6. Upside potential — What makes them uniquely valuable for this role?

Score each 1-10. Be honest. A 7 is good. A 10 is rare.

THE INTERROGATION: Play devil's advocate. Don't just repeat the scores. Surface the uncomfortable truths, the rationalizations the candidate is probably making, the things they're not seeing. 3-5 challenges. Be punchy and direct — no corporate speak.

If mandatory info is missing (past companies, target company, target role, or background domain), set needsInfo: true and list what's missing in missingFields. Ask for all missing items in ONE followUpQuestion. Do not score if mandatory info is missing.

Extract and infer as much as possible from free-form text. If the user says "I worked at Amazon and Google", their background domain can be inferred as tech/product. Use common sense.`;*/

const SYSTEM_PROMPT = `Brutally honest job fit evaluator. Respond ONLY with valid JSON:

{"needsInfo":bool,"missingFields":[],"followUpQuestion":null,"scores":[{"dimension":"string","score":0,"explanation":"string"}],"interrogation":["string"],"summary":"string"}

MANDATORY INPUTS: past companies (at least one), target company, target role, background domain (infer from companies if possible). If any are missing, set needsInfo:true, list them in missingFields, ask for all at once in followUpQuestion. Do not score until you have all four.

SCORE THESE 6 DIMENSIONS (1-10, always all 6, 2-3 sentence explanation each):
1. Role scope fit — seniority/scope match
2. Domain alignment — background vs. required domain
3. Company stage match — comparable scale/stage experience
4. Culture/pace fit — operating environment match
5. Red flags — patterns that would concern a hiring team
6. Upside potential — unique value for this role

INTERROGATION: 3-5 punchy, direct blind-spot challenges. Devil's advocate. No sugarcoating. Not a repeat of scores.

SUMMARY: 2-3 sentences, overall verdict.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      messages,
    });

    const text = response.content.find((b) => b.type === "text")?.text ?? "";

    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "Failed to parse model response" },
        { status: 500 }
      );
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Target test API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}