
import * as React from 'react';
import { motion } from 'motion/react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest animate-pulse">Initializing System...</p>
      </motion.div>
    </div>
  );
}
