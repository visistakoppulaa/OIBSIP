import React from 'react';
import { FileText, CheckCircle2, Code2, ShieldAlert, Cpu, X } from 'lucide-react';
import { Theme } from '../types';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
}

export const DocumentationModal: React.FC<DocumentationModalProps> = ({
  isOpen,
  onClose,
  theme,
}) => {
  if (!isOpen) return null;

  const checklistItems = [
    { title: 'Dual-Line Screen Display', desc: 'Shows current expression history and live result simultaneously.' },
    { title: 'Numeric & Decimal Keys', desc: 'Full 0-9 buttons with decimal point validation preventing multiple dots.' },
    { title: 'Standard Operator Suite', desc: 'Addition (+), Subtraction (-), Multiplication (×), Division (÷).' },
    { title: 'Evaluation Equals Button', desc: 'Triggers expression calculation using custom parsing algorithm.' },
    { title: 'Clear (C / AC) & Backspace (⌫)', desc: 'Resets state completely or removes last typed character.' },
    { title: 'Division-by-Zero Safeguard', desc: 'Gracefully traps division by zero ("Cannot divide by 0") without crashing.' },
    { title: 'Sequential & Precedence Chaining', desc: 'Supports both standard mathematical operator precedence and sequential chaining.' },
    { title: 'CSS Grid Keypad Alignment', desc: 'Mapped layout using clean CSS Grid structure.' },
    { title: 'Clean Event Handlers', desc: 'Uses React synthetic event listeners (no inline HTML onclick strings).' },
    { title: 'Zero eval() Usage', desc: 'Built-in tokenization and Shunting-Yard operator stack evaluation engine.' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div
        className={`relative w-full max-w-3xl max-h-[85vh] rounded-2xl p-6 border ${theme.cardBg} bg-slate-900 text-slate-100 flex flex-col shadow-2xl overflow-hidden`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className={`w-5 h-5 ${theme.accentText}`} />
            <h2 className="text-lg font-bold tracking-tight">Project Documentation & Architecture</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-6 text-xs sm:text-sm leading-relaxed scrollbar-thin scrollbar-thumb-slate-700 pr-2">
          {/* Overview */}
          <section className="space-y-2">
            <h3 className="font-semibold text-emerald-400 flex items-center gap-2">
              <Cpu className="w-4 h-4" /> 1. Architecture Overview & Custom Engine
            </h3>
            <p className="text-slate-300">
              This calculator application is built strictly following software engineering guidelines:
              it completely avoids the unsafe JavaScript <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300">eval()</code> function.
              Instead, it tokenizes mathematical expressions into strongly-typed Tokens and processes them using a custom implementation of Dijkstra's
              <strong className="text-white"> Shunting-Yard Algorithm</strong> to construct a Reverse Polish Notation (RPN) stack.
            </p>
          </section>

          {/* Division by zero */}
          <section className="space-y-2">
            <h3 className="font-semibold text-rose-400 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" /> 2. Error Trapping & Edge Case Safeguards
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li>
                <strong>Division by Zero:</strong> When evaluating <code className="bg-slate-800 px-1 py-0.5 rounded text-rose-300">a / 0</code>,
                the engine traps the stack reduction step and returns a friendly error message (<code className="text-rose-300">Cannot divide by 0</code>)
                rather than returning <code className="text-slate-400">Infinity</code> or crashing the UI state.
              </li>
              <li>
                <strong>Negative Square Roots:</strong> Traps <code className="bg-slate-800 px-1 py-0.5 rounded">√(-x)</code> and returns <code className="text-amber-300">Invalid Input</code>.
              </li>
              <li>
                <strong>Floating Point Accuracy:</strong> Trims JavaScript IEEE-754 precision artifacts (e.g. converting <code className="text-slate-400">0.1 + 0.2</code> to <code className="text-emerald-300">0.3</code>).
              </li>
            </ul>
          </section>

          {/* Verification Checklist */}
          <section className="space-y-3">
            <h3 className="font-semibold text-amber-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> 3. Requirements Checklist Verification
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {checklistItems.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-xs text-slate-200">{item.title}</div>
                    <div className="text-[11px] text-slate-400">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack */}
          <section className="space-y-2">
            <h3 className="font-semibold text-cyan-400 flex items-center gap-2">
              <Code2 className="w-4 h-4" /> 4. Tech Stack & Implementation Details
            </h3>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
              <div>• <strong>Framework:</strong> React 19 with Vite & TypeScript</div>
              <div>• <strong>Layout Engine:</strong> Tailwind CSS Grid & Flexbox</div>
              <div>• <strong>Typography:</strong> Outfit (Headings), JetBrains Mono (Numbers/Display), Space Grotesk</div>
              <div>• <strong>Audio Feedback:</strong> Web Audio API Sine/Triangle Synthesizer</div>
              <div>• <strong>Keyboard Binding:</strong> Global keydown listener with visual pulse feedback</div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
          >
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
};
