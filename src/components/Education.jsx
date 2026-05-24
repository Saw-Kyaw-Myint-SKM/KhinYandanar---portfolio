import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Education = ({ data }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!data) return null;

  return (
    <section id="education" className="py-16 px-4 sm:px-6 bg-white relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gold/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-terracotta/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.items.map((edu, index) => {
            const colors = [
              "from-gold/20 to-terracotta/10",
              "from-terracotta/20 to-beige/10",
              "from-beige/30 to-gold/10"
            ];
            const color = colors[index % colors.length];
            
            return (
              <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div className={`relative bg-gradient-to-br ${color} backdrop-blur-sm rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-500 border border-white/50 h-full flex flex-col`}>
                {/* Icon with animation */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl mb-4 inline-block"
                >
                  {edu.icon}
                </motion.div>
                
                {/* Content */}
                <div className="flex-grow space-y-3">
                  <h3 className="text-lg font-bold text-charcoal leading-tight group-hover:text-gold transition-colors font-display">
                    {edu.degree}
                  </h3>
                  
                  <p className="text-charcoal/70 font-semibold text-sm">
                    {edu.institution}
                  </p>
                </div>
                
                {/* Year badge */}
                <div className="mt-5 pt-4 border-t border-charcoal/10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-charcoal font-bold text-sm">{edu.year}</span>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-gold/20 rounded-tr-3xl group-hover:border-gold/50 transition-colors"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-terracotta/20 rounded-bl-2xl group-hover:border-terracotta/50 transition-colors"></div>

                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/0 to-terracotta/0 group-hover:from-gold/10 group-hover:to-terracotta/10 rounded-3xl transition-all duration-500"></div>
              </div>
            </motion.div>
            );
          })}
        </div>

        {/* Continuous Learning Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <div className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-lg border border-beige">
            <div className="text-3xl mb-3">{data.continuousLearning.icon}</div>
            <h3 className="text-xl font-bold text-charcoal mb-2 font-display">
              {data.continuousLearning.title}
            </h3>
            <p className="text-charcoal/70 text-sm max-w-2xl mx-auto leading-relaxed">
              {data.continuousLearning.description}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
