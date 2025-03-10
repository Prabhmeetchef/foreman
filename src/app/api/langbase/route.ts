import { NextResponse } from "next/server";
import { Langbase } from "langbase";
import { prisma } from "@/app/lib/prisma"; // ✅ add your prisma client import
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth"; // Adjust the path as necessary
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
    const { message, threadId } = await req.json();
    // Get user email from session
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    
    if (!userEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const langbase = new Langbase();
    const { stream, threadId: newThreadId } = await langbase.pipe.run({
      stream: true,
      apiKey: process.env.NEXT_PUBLIC_LANGBASE_API_KEY!,
      messages: [{ role: "user", content: message }],
      threadId: threadId,
    });

    // Collect all streamed chunks into a single response string
    let fullResponse = "";
    for await (const chunk of getRunner(streamToAsyncIterable(stream))) {
      fullResponse += chunk;
    }

    const finalThreadId = threadId || newThreadId;

    // ✅ Save message in Prisma DB
    const newMessages = [{ user: message }, { chat: fullResponse }];

    const existingThread = await prisma.conversation.findUnique({
      where: { threadId: finalThreadId },
    });

    if (existingThread) {
      await prisma.conversation.update({
        where: { threadId: finalThreadId },
        data: {
          messages: {
            push: newMessages,
          },
        },
      });
    } else {
      await prisma.conversation.create({
        data: {
          threadId: finalThreadId,
          messages: newMessages,
          userEmail: userEmail, // Add user email
        },
      });
    }

    return NextResponse.json({
      response: fullResponse,
      threadId: finalThreadId,
    });

  } catch (error) {
    console.error("Langbase API error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
