import { useState, useEffect } from 'react';

const HeroForm = ({ data, onSave }) => {
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

  const handleButtonChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      buttons: {
        ...prev.buttons,
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
      <h2 className="text-2xl font-bold text-charcoal mb-6">Hero Section</h2>

      {/* Name */}
      <div>
        <label className="block text-sm font-semibold text-charcoal mb-2">
          Your Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="w-full px-4 py-3 border-2 border-beige rounded-xl focus:border-gold outline-none"
          placeholder="e.g., John Doe"
        />
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-semibold text-charcoal mb-2">
          Job Title / Professional Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          className="w-full px-4 py-3 border-2 border-beige rounded-xl focus:border-gold outline-none"
          placeholder="e.g., Hospitality Professional"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-charcoal mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border-2 border-beige rounded-xl focus:border-gold outline-none resize-none"
          placeholder="Write a brief description about yourself..."
        />
      </div>

      {/* Buttons */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-charcoal mb-2">
            Primary Button Text
          </label>
          <input
            type="text"
            value={formData.buttons.primary}
            onChange={(e) => handleButtonChange('primary', e.target.value)}
            className="w-full px-4 py-3 border-2 border-beige rounded-xl focus:border-gold outline-none"
            placeholder="e.g., View Experience"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-charcoal mb-2">
            Secondary Button Text
          </label>
          <input
            type="text"
            value={formData.buttons.secondary}
            onChange={(e) => handleButtonChange('secondary', e.target.value)}
            className="w-full px-4 py-3 border-2 border-beige rounded-xl focus:border-gold outline-none"
            placeholder="e.g., Contact Me"
          />
        </div>
      </div>

      {/* Save Button */}
      <button
        type="submit"
        className="w-full px-6 py-4 bg-gradient-to-r from-gold to-terracotta text-white rounded-xl font-semibold hover:from-gold/90 hover:to-terracotta/90 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
      >
        💾 Save Hero Section
      </button>
    </form>
  );
};

export default HeroForm;
