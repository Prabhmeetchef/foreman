import { NextResponse } from "next/server";
import { Langbase } from "langbase";

async function* getRunner(stream: any): AsyncIterable<string> {
  const decoder = new TextDecoder();
  for await (const chunk of stream) {
    try {
      const text = decoder.decode(chunk);
      const json = JSON.parse(text);
      const content = json.choices?.[0]?.delta?.content;
      if (typeof content === "string") {
        yield content;
      }
    } catch (error) {
      console.error("Error parsing chunk:", error);
    }
  }
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const langbase = new Langbase();
    const { stream, threadId } = await langbase.pipe.run({
      stream: true,
      apiKey: process.env.NEXT_PUBLIC_LANGBASE_API_KEY!,
      messages: [{ role: "user", content: message }],
    });

    // Collect all chunks into a single string
    let fullResponse = "";
    for await (const chunk of getRunner(stream)) {
      fullResponse += chunk;
    }

    return NextResponse.json({ threadId, response: fullResponse });
  } catch (error) {
    console.error("Langbase API error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
