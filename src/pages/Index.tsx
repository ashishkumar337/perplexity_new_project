import { useState, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Search } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate("/chat", { state: { initialQuery: searchQuery } });
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 text-perplexity-text">
            <Sparkles className="w-5 h-5 text-perplexity-teal" />
            <span className="font-semibold text-lg">Perplexity</span>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/chat")}
            className="gap-2"
          >
            <Search className="w-4 h-4" />
            Try Search
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-3xl space-y-8 animate-fade-in">
          {/* Logo and Headline */}
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-perplexity-teal rounded-2xl flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-perplexity-text tracking-tight">
              Where knowledge begins
            </h1>
            <p className="text-xl text-perplexity-text-secondary max-w-2xl mx-auto">
              Ask anything and get instant, accurate answers with cited sources
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Ask anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="h-14 pl-5 pr-14 text-lg rounded-2xl border-2 focus-visible:ring-perplexity-teal"
            />
            <Button
              onClick={handleSearch}
              disabled={!searchQuery.trim()}
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl bg-perplexity-teal hover:bg-perplexity-teal/90"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>

          {/* Example Queries */}
          <div className="space-y-3">
            <p className="text-sm text-perplexity-text-secondary text-center">
              Try asking:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                "List of top 10 singers, give table",
                "What is quantum computing?",
                "Best restaurants in San Francisco",
                "How does machine learning work?",
              ].map((query) => (
                <button
                  key={query}
                  onClick={() => setSearchQuery(query)}
                  className="px-4 py-2 bg-perplexity-gray-light hover:bg-perplexity-teal-light text-perplexity-text text-sm rounded-full transition-colors"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4 text-center text-sm text-perplexity-text-secondary">
          <p>Powered by AI • Built with React + Vite</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
