import React, { useState } from 'react';
import { TributeFigure } from '../types';
import { HelpCircle, CheckCircle2, XCircle, Trophy, RefreshCw, Award, Sparkles, Printer } from 'lucide-react';

interface QuizSectionProps {
  figure: TributeFigure;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ figure }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    figure.quiz.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const score = calculateScore();
  const total = figure.quiz.length;

  return (
    <section id="quiz" className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#0F1115] border-b border-[#23262D] text-[#E0E0E0]">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#16191F] border border-[#23262D] text-[#E2FF44] text-xs font-tech-mono uppercase tracking-widest font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-[#E2FF44]" />
            <span>Interactive_Knowledge_Challenge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans-body font-black text-white">
            Test Your Knowledge: {figure.shortName}
          </h2>
          <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-lg mx-auto font-sans-body">
            Answer these 5 questions based on the biography and timeline to unlock your Tribute Honor Certificate.
          </p>
        </div>

        {/* Questions Grid */}
        <div className="space-y-6">
          {figure.quiz.map((q, qIdx) => {
            const userAnswer = selectedAnswers[q.id];

            return (
              <div 
                key={q.id}
                className="p-6 bg-[#16191F] border border-[#23262D] space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-xs font-tech-mono text-[#E2FF44] uppercase font-bold">Question #{qIdx + 1}</span>
                  {showResults && (
                    userAnswer === q.correctIndex ? (
                      <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 font-mono">
                        <CheckCircle2 className="w-4 h-4" /> Correct
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-rose-400 flex items-center gap-1 font-mono">
                        <XCircle className="w-4 h-4" /> Incorrect
                      </span>
                    )
                  )}
                </div>

                <h3 className="text-base font-semibold text-white font-sans-body">{q.question}</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userAnswer === optIdx;
                    let btnStyle = 'bg-[#0F1115] text-[#A1A1AA] border-[#23262D] hover:border-[#E2FF44] hover:text-white';

                    if (showResults) {
                      if (optIdx === q.correctIndex) {
                        btnStyle = 'bg-emerald-950/80 text-emerald-200 border-emerald-500 font-bold';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-950/80 text-rose-200 border-rose-500 line-through';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-[#E2FF44] text-[#0F1115] border-[#E2FF44] font-bold';
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={showResults}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`p-3 border text-left text-xs font-mono transition ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {showResults && (
                  <p className="p-3 bg-[#0F1115] text-xs text-[#E0E0E0] font-tech-mono border border-[#23262D]">
                    💡 <strong className="text-[#E2FF44]">Explanation:</strong> {q.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit & Results Footer */}
        <div className="p-6 bg-[#16191F] border border-[#23262D] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
          <div>
            {!showResults ? (
              <span className="text-xs text-[#A1A1AA]">
                Answered: {Object.keys(selectedAnswers).length} of {total}
              </span>
            ) : (
              <span className="text-sm font-bold text-white font-sans-body">
                Final Score: <span className="text-[#E2FF44]">{score}</span> / {total} ({Math.round((score / total) * 100)}%)
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 uppercase text-xs">
            {!showResults ? (
              <button
                disabled={Object.keys(selectedAnswers).length < total}
                onClick={() => setShowResults(true)}
                className="px-6 py-2.5 bg-[#E2FF44] hover:bg-[#d0f030] disabled:opacity-50 text-[#0F1115] font-bold transition shadow-lg shadow-[#E2FF44]/10"
              >
                Submit Answers
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="px-4 py-2.5 bg-[#0F1115] hover:bg-[#121418] text-white border border-[#23262D] font-semibold flex items-center gap-2 transition"
              >
                <RefreshCw className="w-4 h-4 text-[#E2FF44]" /> Retake Quiz
              </button>
            )}
          </div>
        </div>

        {/* Honor Certificate */}
        {showResults && score >= 3 && (
          <div className="p-8 bg-[#16191F] border-2 border-[#E2FF44] text-center space-y-4 shadow-2xl animate-fade-in font-mono">
            <Award className="w-12 h-12 text-[#E2FF44] mx-auto" />
            <h3 className="text-2xl font-sans-body font-bold text-white uppercase">Tribute Honor Certificate</h3>
            <p className="text-xs text-[#E0E0E0] max-w-md mx-auto">
              This certifies that you have successfully completed the historical study of <strong className="text-[#E2FF44]">{figure.name}</strong> with a score of {score}/{total}.
            </p>
            <div className="pt-2 text-[10px] text-[#A1A1AA]">
              Certificate Ref: TRB-{figure.id.toUpperCase()}-2026
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
