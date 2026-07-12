import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { requirements } = await req.json();

    return NextResponse.json({
      summary: "Demo response",
      scope: ["Frontend UI"],
      notIncluded: [],
      missingInfo: [],
      riskAlerts: "",
      questions: [],
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate analysis" },
      { status: 500 }
    );
  }
}