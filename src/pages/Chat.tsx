import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Plus } from "lucide-react";
import ChatInput from "@/components/ChatInput";
import ChatMessage from "@/components/ChatMessage";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
  streamingState?: "searching" | "finding" | "crawling" | "answering" | "complete";
  sources?: Array<{ title: string; url: string; crawlState?: string }>;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const hasProcessedInitialQuery = useRef(false);

  // Handle initial query from landing page
  useEffect(() => {
    const initialQuery = (location.state as any)?.initialQuery;
    if (initialQuery && !hasProcessedInitialQuery.current) {
      hasProcessedInitialQuery.current = true;
      handleSendMessage(initialQuery);
    }
  }, [location.state]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleNewChat = () => {
    setMessages([]);
  };

  const handleSendMessage = async (question: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
      isStreaming: true,
      streamingState: "searching",
      sources: [],
    };

    setMessages((prev) => [...prev, assistantMessage]);

    try {
      const response = await fetch("https://mock-askperplexity.piyushhhxyz.deno.net", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to get response");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6).trim();
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);

              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantMessage.id
                    ? {
                        ...msg,
                        streamingState: parsed.state || msg.streamingState,
                        content: parsed.content || msg.content,
                        sources: parsed.sources || msg.sources,
                        isStreaming: parsed.state !== "complete",
                      }
                    : msg
                )
              );
            } catch (e) {
              console.error("Failed to parse SSE data:", e);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error in streaming:", error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessage.id
            ? {
                ...msg,
                content: "Sorry, I encountered an error. Please try again.",
                isStreaming: false,
                streamingState: "complete",
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-perplexity-text hover:text-perplexity-teal transition-colors"
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold text-lg">Perplexity</span>
          </button>

          {messages.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleNewChat}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              New Chat
            </Button>
          )}
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
              <Sparkles className="w-16 h-16 text-perplexity-teal mb-4" />
              <h2 className="text-2xl font-semibold text-perplexity-text mb-2">
                What can I help you discover?
              </h2>
              <p className="text-perplexity-text-secondary">
                Ask anything and get instant answers with sources
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-background">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
