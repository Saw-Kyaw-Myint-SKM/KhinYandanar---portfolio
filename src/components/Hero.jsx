import { motion } from 'framer-motion';
import placeholderImage from '../assets/placeholder-profile.jpg';

const Hero = ({ data }) => {
  if (!data) return null;

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 bg-gradient-to-b from-white to-cream/30">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center">
          {/* Profile Photo - Top on Mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-xs sm:max-w-sm lg:max-w-md mb-12 lg:mb-0 lg:hidden"
          >
            <div className="relative">
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                <img
                  src={placeholderImage}
                  alt={data.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Desktop: Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left space-y-6"
            >
              <div>
                <p className="text-primary font-semibold uppercase text-sm mb-4 tracking-wider">
                  {data.title}
                </p>
                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-charcoal leading-tight mb-4">
                  {data.name}
                </h1>
              </div>

              <p className="text-lg text-charcoal/70 leading-relaxed max-w-lg mx-auto lg:mx-0">
                {data.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="#experience"
                  className="px-8 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg font-medium hover:from-primary-dark hover:to-primary shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  {data.buttons.primary}
                </a>
                <a
                  href="#contact"
                  className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  {data.buttons.secondary}
                </a>
              </div>
            </motion.div>

            {/* Image - Desktop Only */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative w-full max-w-md mx-auto">
                <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                  <img
                    src={placeholderImage}
                    alt={data.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
