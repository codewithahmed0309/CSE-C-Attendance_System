import { AnimatePresence, motion } from 'framer-motion';
import { shortRoll } from '../utils/format.js';

export default function StudentAttendanceCard({ student, index, total }) {
  return (
    <div className="text-center">
      <p className="text-xs font-medium text-text-secondary">
        Student {index + 1} of {total}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={student.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.14 }}
          className="mt-3"
        >
          <p className="font-mono text-7xl font-bold tracking-tight text-text-primary sm:text-8xl">
            {shortRoll(student.fullRoll)}
          </p>
          <p className="mt-3 text-base font-medium text-text-secondary">{student.name}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
