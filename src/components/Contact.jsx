import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Contact = ({ data }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!data) return null;

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 bg-gradient-to-b from-cream/50 via-white to-cream/50 relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
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
            className="h-1 bg-gradient-to-r from-primary via-secondary to-primary mx-auto rounded-full mb-4"
          ></motion.div>
          <p className="text-base text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
            {data.description}
          </p>
        </motion.div>

        {/* Contact Card - Combined */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-10 max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-beige">
            <div className="space-y-3">
              {/* Email */}
              <div className="flex items-center gap-3 pb-3 border-b border-beige/50">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xs font-bold text-charcoal/60 uppercase tracking-wider mb-0.5">
                    Email
                  </h3>
                  <a
                    href={`mailto:${data.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-charcoal hover:text-primary transition-colors"
                  >
                    {data.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 pb-3 border-b border-beige/50">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xs font-bold text-charcoal/60 uppercase tracking-wider mb-0.5">
                    Phone
                  </h3>
                  <a
                    href={`tel:${data.phone}`}
                    className="text-base font-semibold text-charcoal hover:text-primary transition-colors"
                  >
                    {data.phone}
                  </a>
                </div>
              </div>

              {/* Location with Map */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xs font-bold text-charcoal/60 uppercase tracking-wider mb-0.5">
                      Address
                    </h3>
                    <p className="text-base font-semibold text-charcoal">
                      {data.address}
                    </p>
                  </div>
                </div>
                
                {/* Google Maps Iframe */}
                <div className="mt-3 rounded-xl overflow-hidden border-2 border-beige">
                  <iframe
                    src={data.mapUrl}
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location Map"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="bg-white rounded-2xl p-8 md:p-10 text-center shadow-lg border border-beige"
        >
          <div className="text-3xl mb-4">{data.cta.icon}</div>
          <h3 className="text-2xl font-bold text-charcoal mb-3 font-display">
            {data.cta.title}
          </h3>
          <p className="text-charcoal/70 text-sm mb-6 max-w-2xl mx-auto">
            {data.cta.description}
          </p>
          
          <a
            href={`mailto:${data.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full font-semibold text-base hover:from-primary-dark hover:to-primary transition-all shadow-md hover:shadow-lg transform hover:scale-105"
          >
            {data.cta.buttonText}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
