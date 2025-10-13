import { motion } from "framer-motion";

const WikimediaBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Orbiting Circles */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <div className="relative w-96 h-96">
          <motion.div
            className="absolute w-4 h-4 bg-green-700 rounded-full top-0 left-1/2 -translate-x-1/2"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute w-4 h-4 bg-blue-800 rounded-full top-1/2 right-0 -translate-y-1/2"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
          />
          <motion.div
            className="absolute w-4 h-4 bg-red-600 rounded-full bottom-0 left-1/2 -translate-x-1/2"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
          />
        </div>
      </motion.div>

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default WikimediaBackground;
