import { Message } from "@/pages/Chat";
import StreamingResponse from "./StreamingResponse";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  if (message.role === "user") {
    return (
      <div className="flex justify-end animate-fade-in">
        <div className="max-w-[80%] bg-perplexity-gray-light rounded-2xl px-4 py-3">
          <p className="text-perplexity-text">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <StreamingResponse message={message} />
    </div>
  );
};

export default ChatMessage;
