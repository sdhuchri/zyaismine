import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const { mood, context } = await req.json();

  const prompt = `Write a birthday letter for Zya from Suryana (sryndhcrs).

Mood/tone requested: ${mood}
${context ? `Additional context: ${context}` : ""}

About Zya & Suryana:
- First message: 1 Feb 2026, "ih lucu bgtsi" — Sury to Zia
- Long-distance: Sury in Jakarta, Zia in Mataram NTB
- Only ~2 months of chatting but already very close
- She deflects compliments ("itu pake filter 😔"), types casual mix of Indo/English
- Valentine's Day: she said "dapet hikmah 😭", he asked if he could give her something
- Mar 3: he said "ak tdk baik baik saja karna tdk bisa mendengar suara km lagi" — she replied "mau suara monyet aja?"
- She likes Korean stuff, her "pacar" is Yoon Jaehyuk (idol joke), loves skincare
- Sury made this website as a surprise birthday gift — tonight she asked "bikin apaan" not knowing what it was
- Today is her birthday, March 30

Write a genuine, heartfelt letter. Not too long (150-200 words). Mix Indonesian and English naturally, like how Suryana actually texts. Don't be cringe or over-the-top. End with "— Sury".`;

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 400,
    temperature: 0.9,
  });

  return NextResponse.json({ letter: res.choices[0].message.content });
}
