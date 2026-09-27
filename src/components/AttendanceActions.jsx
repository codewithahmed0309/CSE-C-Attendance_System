import { Check, ChevronLeft, X } from 'lucide-react';

export default function AttendanceActions({ onPresent, onAbsent, onPrevious, canGoPrevious }) {
  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      <div className="grid w-full grid-cols-2 gap-3 sm:w-auto sm:auto-cols-max sm:grid-flow-col">
        <button
          onClick={onPresent}
          className="flex items-center justify-center gap-2 rounded-xl bg-present px-8 py-4 text-sm font-semibold text-white transition-transform hover:brightness-110 active:scale-[0.98]"
        >
          <Check size={17} />
          Present
        </button>
        <button
          onClick={onAbsent}
          className="flex items-center justify-center gap-2 rounded-xl bg-absent px-8 py-4 text-sm font-semibold text-white transition-transform hover:brightness-110 active:scale-[0.98]"
        >
          <X size={17} />
          Absent
        </button>
      </div>

      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className="flex items-center gap-1 text-xs font-medium text-text-secondary transition-colors enabled:hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronLeft size={14} />
        Previous
      </button>
    </div>
  );
}
