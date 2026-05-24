import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const About = ({ data }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!data) return null;

  return (
    <section id="about" className="py-16 px-4 sm:px-6 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal mb-3">
            {data.title}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Content - Enhanced Design */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-white to-primary/5 rounded-2xl p-6 shadow-lg border border-primary/10 hover:shadow-xl transition-all duration-300">
              {/* Decorative Element */}
              <div className="absolute top-0 left-0 w-16 h-16 bg-primary/5 rounded-br-2xl"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-secondary/5 rounded-tl-2xl"></div>
              
              {/* Icon */}
              <div className="relative mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg">
                  <span className="text-2xl">👤</span>
                </div>
              </div>

              {/* Content */}
              <div className="relative space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-1 h-full bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                  <p className="text-charcoal/80 leading-relaxed text-base">
                    {data.description}
                  </p>
                </div>
              </div>

              {/* Bottom Accent */}
              <div className="mt-4 pt-4 border-t border-primary/10">
                <div className="flex items-center gap-2 text-primary">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-semibold">Verified Professional</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-2 gap-3"
          >
            {data.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-gradient-to-br from-white to-primary/5 rounded-xl p-4 shadow-md border border-primary/10 text-center hover:shadow-xl transition-all duration-300 cursor-default"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-1">
                  {stat.number}
                </div>
                <div className="text-xs text-charcoal/70 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
