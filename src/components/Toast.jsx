import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function Toast({ message }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-2 rounded-lg border border-border bg-elevated px-4 py-2.5 text-sm text-text-primary shadow-lg shadow-black/30"
            role="status"
          >
            <Check size={15} className="text-present" />
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
