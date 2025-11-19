import { useState, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything..."
        disabled={disabled}
        className="min-h-[56px] pr-12 resize-none rounded-2xl border-2 focus-visible:ring-perplexity-teal"
        rows={1}
      />
      <Button
        onClick={handleSend}
        disabled={!input.trim() || disabled}
        size="icon"
        className="absolute bottom-2 right-2 h-10 w-10 rounded-xl bg-perplexity-teal hover:bg-perplexity-teal/90 disabled:opacity-40"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default ChatInput;
