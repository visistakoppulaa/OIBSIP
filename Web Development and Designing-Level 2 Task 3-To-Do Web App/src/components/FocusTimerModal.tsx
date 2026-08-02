import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, X, Check, Timer } from 'lucide-react';
import { Task } from '../types';

interface FocusTimerModalProps {
  task: Task | null;
  onClose: () => void;
  onCompleteTask: (taskId: string) => void;
}

export const FocusTimerModal: React.FC<FocusTimerModalProps> = ({
  task,
  onClose,
  onCompleteTask,
}) => {
  if (!task) return null;

  const defaultMinutes = task.estimatedMinutes || 25;
  const [secondsLeft, setSecondsLeft] = useState(defaultMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(defaultMinutes * 60);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const progressPercent = Math.min(100, Math.max(0, (1 - secondsLeft / (defaultMinutes * 60)) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 dark:bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-stone-200/90 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative text-center text-stone-900 dark:text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 dark:text-slate-500 hover:text-stone-700 dark:hover:text-slate-200 rounded-full hover:bg-stone-100 dark:hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center justify-center p-3 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 rounded-2xl mb-4 shadow-xs">
          <Timer className="w-6 h-6" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 block mb-1">
          Focus Session
        </span>

        <h3 className="text-lg font-bold text-stone-900 dark:text-slate-100 font-display mb-1 line-clamp-2">
          {task.title}
        </h3>

        <p className="text-xs text-stone-500 dark:text-slate-400 mb-6">Target duration: {defaultMinutes} minutes</p>

        {/* Timer Display Circle / Ring */}
        <div className="relative w-48 h-48 mx-auto flex items-center justify-center mb-6">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="84"
              className="text-stone-100 dark:text-slate-800 stroke-current"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="96"
              cy="96"
              r="84"
              className="text-indigo-600 dark:text-indigo-400 stroke-current transition-all duration-500"
              strokeWidth="8"
              strokeDasharray={527}
              strokeDashoffset={527 - (527 * progressPercent) / 100}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold text-stone-900 dark:text-slate-100 tracking-tight font-display">
              {formattedTime}
            </span>
            <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 mt-1 uppercase tracking-wider">
              {isRunning ? 'Focusing...' : secondsLeft === 0 ? 'Time Up!' : 'Paused'}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-3 mb-6">
          <button
            onClick={toggleTimer}
            className="flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/30 active:scale-95 transition cursor-pointer font-bold"
          >
            {isRunning ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </button>
          <button
            onClick={resetTimer}
            className="flex items-center justify-center w-12 h-12 rounded-2xl bg-stone-100 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-600 dark:text-slate-300 hover:text-stone-900 dark:hover:text-white transition cursor-pointer"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={() => {
            onCompleteTask(task.id);
            onClose();
          }}
          className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition cursor-pointer shadow-md shadow-emerald-600/20"
        >
          <Check className="w-4 h-4 stroke-[2.5]" />
          <span>Mark Task Finished Now</span>
        </button>
      </div>
    </div>
  );
};
