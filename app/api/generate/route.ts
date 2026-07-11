import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { requirements } = await req.json();

    const prompt = `
Analyze these client requirements and return JSON only:

Requirements:
${requirements}

Return:
{
  "summary": "",
  "scope": [],
  "notIncluded": [],
  "missingInfo": [],
  "riskAlerts": "",
  "questions": []
}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(
      completion.choices[0].message.content || "{}"
    );

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate analysis" },
      { status: 500 }
    );
  }
}