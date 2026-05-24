import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Experience = ({ data }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!data) return null;

  return (
    <section id="experience" className="py-16 px-4 sm:px-6 bg-gradient-to-b from-cream/50 via-white to-cream/50 relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-gold/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-terracotta/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block mb-3"
          >
            <span className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider">
              {data.subtitle}
            </span>
          </motion.div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            {data.title}
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "5rem" } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-primary via-secondary to-primary mx-auto rounded-full"
          ></motion.div>
        </motion.div>

        <div className="relative">
          <div className="space-y-12">
            {data.items.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative max-w-4xl mx-auto"
              >
                {/* Content card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-beige/30"
                >
                  <div className="flex flex-wrap justify-between items-start mb-6 gap-4">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{exp.icon}</div>
                      <div>
                        <h3 className="text-2xl font-bold text-charcoal mb-2 font-display">
                          {exp.title}
                        </h3>
                        <p className="text-lg text-terracotta font-semibold">{exp.subtitle}</p>
                      </div>
                    </div>
                    <span className="px-5 py-2.5 bg-primary/10 text-charcoal rounded-full text-sm font-bold uppercase tracking-wider border border-primary/30">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-charcoal/70 mb-6 leading-relaxed text-base">
                    {exp.description}
                  </p>

                  <div className="space-y-3">
                    {exp.responsibilities.map((resp, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.2 + 0.4 + idx * 0.1 }}
                        className="flex items-start gap-4"
                      >
                        <div className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-lg flex items-center justify-center text-primary font-bold text-sm">
                          ✓
                        </div>
                        <span className="text-charcoal/80 leading-relaxed text-base">{resp}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Add more CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-charcoal/60 text-base mb-4">
            Continuously growing and seeking new opportunities
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full font-semibold hover:from-primary-dark hover:to-primary transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Let's Work Together
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
