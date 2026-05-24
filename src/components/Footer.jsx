import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-cream py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-display text-3xl font-bold mb-4">
              Khin Yandanar
            </h3>
            <p className="text-cream/70 text-sm leading-relaxed">
              Hospitality professional dedicated to creating exceptional experiences through attention to detail and genuine care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-gold">Quick Links</h4>
            <ul className="space-y-2">
              {['About', 'Experience', 'Skills', 'Education', 'Contact'].map((link, index) => (
                <li key={index}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-cream/70 hover:text-gold transition-colors duration-300 text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-gold">Contact</h4>
            <ul className="space-y-2 text-sm text-cream/70">
              <li>📧 khinyandanar@gmail.com</li>
              <li>📱 09442628185</li>
              <li>📍 Yangon, Myanmar</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cream/20 pt-8 text-center">
          <p className="text-cream/60 text-sm">
            © {new Date().getFullYear()} Khin Yandanar. All rights reserved.
          </p>
          <p className="text-cream/40 text-xs mt-2">
            Designed with passion for hospitality excellence
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
