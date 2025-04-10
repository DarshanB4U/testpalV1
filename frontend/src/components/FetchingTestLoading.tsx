import { Loader2, Database } from "lucide-react";
import { motion } from "framer-motion";

export default function FetchingTestLoading({
  message = "Loading your test from the database...",
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-600 to-teal-750 text-white px-4">
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="mb-6"
      >
        <Database size={64} className="text-white drop-shadow-lg" />
      </motion.div>
      <h1 className="text-2xl font-bold mb-2 animate-pulse">{message}</h1>
      <p className="text-sm opacity-80 text-center max-w-md">
        Fetching your test and all associated questions. Please hold on while we
        connect to the system.
      </p>
    </div>
  );
}
