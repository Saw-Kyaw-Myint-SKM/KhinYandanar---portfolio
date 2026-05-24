import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Skills = ({ data }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!data) return null;

  return (
    <section id="skills" className="py-16 px-4 sm:px-6 bg-white relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gold/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-terracotta/20 rounded-full blur-3xl"></div>
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {data.categories.map((category, catIndex) => {
            const gradients = [
              "from-gold/20 to-terracotta/20",
              "from-terracotta/20 to-beige/20",
              "from-beige/20 to-gold/20"
            ];
            const gradient = gradients[catIndex % gradients.length];
            
            return (
              <motion.div
              key={catIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              className="group"
            >
              <div className={`relative bg-gradient-to-br ${gradient} backdrop-blur-sm rounded-2xl p-5 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-500 h-full`}>
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl mb-4 inline-block"
                >
                  {category.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-lg font-bold text-charcoal mb-4 font-display">
                  {category.title}
                </h3>

                {/* Skills */}
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold text-charcoal/90">
                          {skill.name}
                        </span>
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="relative h-2 bg-white/80 rounded-full overflow-hidden shadow-inner">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1.5, delay: catIndex * 0.1 + skillIndex * 0.1, ease: "easeOut" }}
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-secondary to-primary rounded-full shadow-lg"
                        >
                          <motion.div
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          ></motion.div>
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Decorative corner */}
                <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-gold/20 rounded-tr-3xl group-hover:border-gold/50 transition-colors"></div>
              </div>
            </motion.div>
          );
        })}
        </div>

        {/* Key Strengths - Modern Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <h3 className="text-2xl font-bold text-center text-charcoal mb-8 font-display">
            Core Strengths
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "✨", label: "Excellence", color: "from-gold/20 to-gold/5" },
              { icon: "🤝", label: "Teamwork", color: "from-terracotta/20 to-terracotta/5" },
              { icon: "💼", label: "Professional", color: "from-beige/30 to-beige/10" },
              { icon: "🎯", label: "Detail-Oriented", color: "from-gold/20 to-terracotta/10" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className={`relative bg-gradient-to-br ${item.color} backdrop-blur-sm rounded-2xl p-5 text-center border border-white/50 shadow-lg hover:shadow-xl transition-all cursor-default group`}
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl mb-3"
                >
                  {item.icon}
                </motion.div>
                <div className="text-sm font-bold text-charcoal uppercase tracking-wide">
                  {item.label}
                </div>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/0 to-gold/0 group-hover:from-gold/10 group-hover:to-terracotta/10 rounded-2xl transition-all duration-300"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
