import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

export default function TestGenerationLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-br from-slate-900 to-slate-800 text-white px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <Loader className="animate-spin w-12 h-12 text-blue-400" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-2xl md:text-3xl font-bold"
      >
        Generating Your Test with AI...
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="mt-4 text-sm text-slate-300"
      >
        This might take a few seconds ⏳
      </motion.p>

      <motion.div
        className="mt-10 flex gap-2"
        animate={{
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        <span className="w-3 h-3 bg-blue-500 rounded-full" />
        <span className="w-3 h-3 bg-purple-500 rounded-full" />
        <span className="w-3 h-3 bg-pink-500 rounded-full" />
      </motion.div>
    </div>
  );
}
