import { useState, useEffect } from 'react';

const ExperienceForm = ({ data, onSave }) => {
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

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index] = {
      ...newItems[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      items: newItems
    }));
  };

  const handleResponsibilityChange = (itemIndex, respIndex, value) => {
    const newItems = [...formData.items];
    newItems[itemIndex].responsibilities[respIndex] = value;
    setFormData(prev => ({
      ...prev,
      items: newItems
    }));
  };

  const addResponsibility = (itemIndex) => {
    const newItems = [...formData.items];
    newItems[itemIndex].responsibilities.push('');
    setFormData(prev => ({
      ...prev,
      items: newItems
    }));
  };

  const removeResponsibility = (itemIndex, respIndex) => {
    const newItems = [...formData.items];
    newItems[itemIndex].responsibilities.splice(respIndex, 1);
    setFormData(prev => ({
      ...prev,
      items: newItems
    }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          title: '',
          subtitle: '',
          period: '',
          description: '',
          responsibilities: [''],
          icon: '💼'
        }
      ]
    }));
  };

  const removeExperience = (index) => {
    if (confirm('Are you sure you want to remove this experience?')) {
      const newItems = formData.items.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        items: newItems
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-charcoal mb-6">Experience Section</h2>

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
            placeholder="e.g., Experience"
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
            placeholder="e.g., My Journey"
          />
        </div>
      </div>

      {/* Experience Items */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-charcoal">Work Experience</h3>
          <button
            type="button"
            onClick={addExperience}
            className="px-4 py-2 bg-gold text-white rounded-lg font-semibold hover:bg-gold/80 transition-all"
          >
            + Add Experience
          </button>
        </div>

        {formData.items.map((item, index) => (
          <div key={index} className="p-6 bg-beige/20 rounded-xl space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-charcoal">Experience {index + 1}</h4>
              {formData.items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                value={item.icon}
                onChange={(e) => handleItemChange(index, 'icon', e.target.value)}
                className="px-3 py-2 border-2 border-beige rounded-lg focus:border-gold outline-none"
                placeholder="Icon (emoji)"
              />

              <input
                type="text"
                value={item.period}
                onChange={(e) => handleItemChange(index, 'period', e.target.value)}
                className="px-3 py-2 border-2 border-beige rounded-lg focus:border-gold outline-none"
                placeholder="Period (e.g., 2020-2023)"
              />
            </div>

            <input
              type="text"
              value={item.title}
              onChange={(e) => handleItemChange(index, 'title', e.target.value)}
              className="w-full px-3 py-2 border-2 border-beige rounded-lg focus:border-gold outline-none"
              placeholder="Job Title"
            />

            <input
              type="text"
              value={item.subtitle}
              onChange={(e) => handleItemChange(index, 'subtitle', e.target.value)}
              className="w-full px-3 py-2 border-2 border-beige rounded-lg focus:border-gold outline-none"
              placeholder="Company Name"
            />

            <textarea
              value={item.description}
              onChange={(e) => handleItemChange(index, 'description', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border-2 border-beige rounded-lg focus:border-gold outline-none resize-none"
              placeholder="Job Description"
            />

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-charcoal">Responsibilities</label>
                <button
                  type="button"
                  onClick={() => addResponsibility(index)}
                  className="px-3 py-1 bg-gold/20 text-charcoal rounded-lg text-sm hover:bg-gold/30"
                >
                  + Add
                </button>
              </div>
              {item.responsibilities.map((resp, respIndex) => (
                <div key={respIndex} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={resp}
                    onChange={(e) => handleResponsibilityChange(index, respIndex, e.target.value)}
                    className="flex-1 px-3 py-2 border-2 border-beige rounded-lg focus:border-gold outline-none text-sm"
                    placeholder="Responsibility"
                  />
                  {item.responsibilities.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeResponsibility(index, respIndex)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <button
        type="submit"
        className="w-full px-6 py-4 bg-gradient-to-r from-gold to-terracotta text-white rounded-xl font-semibold hover:from-gold/90 hover:to-terracotta/90 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
      >
        💾 Save Experience Section
      </button>
    </form>
  );
};

export default ExperienceForm;
