import { Message } from "@/pages/Chat";
import { Sparkles, Loader2 } from "lucide-react";
import SourceCitation from "./SourceCitation";

interface StreamingResponseProps {
  message: Message;
}

const StreamingResponse = ({ message }: StreamingResponseProps) => {
  const getStateText = () => {
    switch (message.streamingState) {
      case "searching":
        return "Searching the web...";
      case "finding":
        return "Finding relevant sources...";
      case "crawling":
        return "Reading sources...";
      case "answering":
        return "Generating answer...";
      default:
        return "";
    }
  };

  const isActivelyStreaming = message.isStreaming && message.streamingState !== "complete";

  return (
    <div className="space-y-4">
      {/* State Indicator */}
      {isActivelyStreaming && (
        <div className="flex items-center gap-2 text-perplexity-teal animate-pulse">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm font-medium">{getStateText()}</span>
        </div>
      )}

      {/* Sources Being Crawled */}
      {message.sources && message.sources.length > 0 && message.streamingState === "crawling" && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-perplexity-text-secondary">
            Reading sources:
          </p>
          <div className="flex flex-wrap gap-2">
            {message.sources.map((source, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-3 py-1.5 bg-perplexity-teal-light rounded-lg text-sm animate-fade-in"
              >
                <div className="w-2 h-2 bg-perplexity-teal rounded-full animate-pulse" />
                <span className="text-perplexity-text">{source.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Answer Content */}
      {message.content && (
        <div className="prose prose-sm max-w-none">
          <div className="text-perplexity-text whitespace-pre-wrap leading-relaxed">
            {message.content}
            {isActivelyStreaming && message.streamingState === "answering" && (
              <span className="inline-block w-2 h-4 ml-1 bg-perplexity-teal animate-pulse" />
            )}
          </div>
        </div>
      )}

      {/* Final Sources */}
      {message.sources && message.sources.length > 0 && !message.isStreaming && (
        <div className="space-y-3 pt-4">
          <p className="text-sm font-medium text-perplexity-text-secondary flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Sources
          </p>
          <div className="grid grid-cols-1 gap-2">
            {message.sources.map((source, idx) => (
              <SourceCitation key={idx} source={source} index={idx + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StreamingResponse;
