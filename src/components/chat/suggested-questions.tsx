import { Button } from "@/components/ui/button";

const questions = [
  "What is your return policy?",
  "How can I track my order?",
  "I need help with a billing issue.",
];

type SuggestedQuestionsProps = {
  onQuestionSelect: (question: string) => void;
};

export default function SuggestedQuestions({ onQuestionSelect }: SuggestedQuestionsProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-muted-foreground">Or try one of these:</p>
      <div className="flex flex-col items-start gap-2">
        {questions.map((q) => (
          <Button
            key={q}
            variant="outline"
            size="sm"
            onClick={() => onQuestionSelect(q)}
            className="text-left h-auto"
          >
            {q}
          </Button>
        ))}
      </div>
    </div>
  );
}
