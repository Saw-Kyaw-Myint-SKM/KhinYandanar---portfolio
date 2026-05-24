import { useState, useEffect } from 'react';

const ContactForm = ({ data, onSave }) => {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCtaChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      cta: {
        ...prev.cta,
        [field]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-charcoal mb-6">Contact Section</h2>

      {/* Section Headers */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-charcoal mb-2">
            Section Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-4 py-3 border-2 border-beige rounded-xl focus:border-gold outline-none"
            placeholder="e.g., Get In Touch"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-charcoal mb-2">
            Subtitle
          </label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => handleChange('subtitle', e.target.value)}
            className="w-full px-4 py-3 border-2 border-beige rounded-xl focus:border-gold outline-none"
            placeholder="e.g., Let's Connect"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-charcoal mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 border-2 border-beige rounded-xl focus:border-gold outline-none resize-none"
          placeholder="Contact section description..."
        />
      </div>

      {/* Contact Information */}
      <div className="p-6 bg-beige/20 rounded-xl space-y-4">
        <h3 className="text-lg font-semibold text-charcoal">Contact Information</h3>

        <div>
          <label className="block text-sm font-semibold text-charcoal mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-4 py-3 border-2 border-beige rounded-xl focus:border-gold outline-none"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-charcoal mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full px-4 py-3 border-2 border-beige rounded-xl focus:border-gold outline-none"
            placeholder="123-456-7890"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-charcoal mb-2">
            Address
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className="w-full px-4 py-3 border-2 border-beige rounded-xl focus:border-gold outline-none"
            placeholder="Your full address"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-charcoal mb-2">
            Google Maps Embed URL
          </label>
          <input
            type="url"
            value={formData.mapUrl}
            onChange={(e) => handleChange('mapUrl', e.target.value)}
            className="w-full px-4 py-3 border-2 border-beige rounded-xl focus:border-gold outline-none"
            placeholder="https://www.google.com/maps/embed?pb=..."
          />
          <p className="text-xs text-charcoal/60 mt-1">
            Get this from Google Maps → Share → Embed a map
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="p-6 bg-gold/10 rounded-xl space-y-4">
        <h3 className="text-lg font-semibold text-charcoal">Call to Action Section</h3>

        <input
          type="text"
          value={formData.cta.icon}
          onChange={(e) => handleCtaChange('icon', e.target.value)}
          className="w-full px-3 py-2 border-2 border-beige rounded-lg focus:border-gold outline-none"
          placeholder="Icon (emoji)"
        />

        <input
          type="text"
          value={formData.cta.title}
          onChange={(e) => handleCtaChange('title', e.target.value)}
          className="w-full px-3 py-2 border-2 border-beige rounded-lg focus:border-gold outline-none"
          placeholder="CTA Title"
        />

        <textarea
          value={formData.cta.description}
          onChange={(e) => handleCtaChange('description', e.target.value)}
          rows={2}
          className="w-full px-3 py-2 border-2 border-beige rounded-lg focus:border-gold outline-none resize-none"
          placeholder="CTA Description"
        />

        <input
          type="text"
          value={formData.cta.buttonText}
          onChange={(e) => handleCtaChange('buttonText', e.target.value)}
          className="w-full px-3 py-2 border-2 border-beige rounded-lg focus:border-gold outline-none"
          placeholder="Button Text"
        />
      </div>

      {/* Save Button */}
      <button
        type="submit"
        className="w-full px-6 py-4 bg-gradient-to-r from-gold to-terracotta text-white rounded-xl font-semibold hover:from-gold/90 hover:to-terracotta/90 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
      >
        💾 Save Contact Section
      </button>
    </form>
  );
};

export default ContactForm;
