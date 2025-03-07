import { NextResponse } from "next/server";
import { Langbase } from "langbase";

async function* getRunner(stream: AsyncIterable<Uint8Array>): AsyncIterable<string> {
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

// Convert ReadableStream to AsyncIterable
async function* streamToAsyncIterable(stream: ReadableStream<Uint8Array>): AsyncIterable<Uint8Array> {
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) yield value;
    }
  } finally {
    reader.releaseLock();
  }
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const langbase = new Langbase();
    const response = await langbase.pipe.run({
      stream: true,
      apiKey: process.env.NEXT_PUBLIC_LANGBASE_API_KEY!,
      messages: [{ role: "user", content: message }],
    });

    // Collect all streamed chunks into a single response string
    let fullResponse = "";
    for await (const chunk of getRunner(streamToAsyncIterable(response.stream))) {
      fullResponse += chunk;
    }

    console.log("Stream type:", typeof response.stream, response.stream);

    return NextResponse.json({ response: fullResponse });
  } catch (error) {
    console.error("Langbase API error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}