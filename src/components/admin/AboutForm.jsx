import { useState, useEffect } from 'react';

const AboutForm = ({ data, onSave }) => {
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

  const handleStatChange = (index, field, value) => {
    const newStats = [...formData.stats];
    newStats[index] = {
      ...newStats[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      stats: newStats
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-charcoal mb-6">About Section</h2>

      {/* Title */}
      <div>
        <label className="block text-sm font-semibold text-charcoal mb-2">
          Section Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          className="w-full px-4 py-3 border-2 border-beige rounded-xl focus:border-gold outline-none"
          placeholder="e.g., About Me"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-charcoal mb-2">
          About Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={5}
          className="w-full px-4 py-3 border-2 border-beige rounded-xl focus:border-gold outline-none resize-none"
          placeholder="Write about yourself..."
        />
      </div>

      {/* Stats */}
      <div>
        <h3 className="text-lg font-semibold text-charcoal mb-4">Statistics Cards</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {formData.stats.map((stat, index) => (
            <div key={index} className="p-4 bg-beige/20 rounded-xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{stat.icon}</span>
                <span className="font-semibold text-charcoal">Stat {index + 1}</span>
              </div>
              
              <input
                type="text"
                value={stat.icon}
                onChange={(e) => handleStatChange(index, 'icon', e.target.value)}
                className="w-full px-3 py-2 border-2 border-beige rounded-lg focus:border-gold outline-none text-sm"
                placeholder="Icon (emoji)"
              />
              
              <input
                type="text"
                value={stat.number}
                onChange={(e) => handleStatChange(index, 'number', e.target.value)}
                className="w-full px-3 py-2 border-2 border-beige rounded-lg focus:border-gold outline-none text-sm"
                placeholder="Number (e.g., 5+, 100%)"
              />
              
              <input
                type="text"
                value={stat.label}
                onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                className="w-full px-3 py-2 border-2 border-beige rounded-lg focus:border-gold outline-none text-sm"
                placeholder="Label (e.g., Years Experience)"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button
        type="submit"
        className="w-full px-6 py-4 bg-gradient-to-r from-gold to-terracotta text-white rounded-xl font-semibold hover:from-gold/90 hover:to-terracotta/90 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
      >
        💾 Save About Section
      </button>
    </form>
  );
};

export default AboutForm;
