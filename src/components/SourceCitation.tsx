import { ExternalLink } from "lucide-react";

interface SourceCitationProps {
  source: {
    title: string;
    url: string;
  };
  index: number;
}

const SourceCitation = ({ source, index }: SourceCitationProps) => {
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-3 p-3 bg-perplexity-gray-light hover:bg-perplexity-teal-light rounded-lg transition-colors"
    >
      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-background rounded text-xs font-medium text-perplexity-text">
        {index}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-perplexity-text group-hover:text-perplexity-teal transition-colors truncate">
          {source.title}
        </p>
        <p className="text-xs text-perplexity-text-secondary truncate mt-0.5">
          {source.url}
        </p>
      </div>
      <ExternalLink className="flex-shrink-0 w-4 h-4 text-perplexity-text-secondary group-hover:text-perplexity-teal transition-colors" />
    </a>
  );
};

export default SourceCitation;
