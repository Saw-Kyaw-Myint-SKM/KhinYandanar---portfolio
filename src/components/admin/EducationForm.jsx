import { useState, useEffect } from 'react';

const EducationForm = ({ data, onSave }) => {
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

  const handleContinuousLearningChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      continuousLearning: {
        ...prev.continuousLearning,
        [field]: value
      }
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          degree: '',
          institution: '',
          year: '',
          icon: '🎓'
        }
      ]
    }));
  };

  const removeEducation = (index) => {
    if (confirm('Are you sure you want to remove this education?')) {
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
      <h2 className="text-2xl font-bold text-charcoal mb-6">Education Section</h2>

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
            placeholder="e.g., Education"
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
            placeholder="e.g., Academic Background"
          />
        </div>
      </div>

      {/* Education Items */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-charcoal">Education History</h3>
          <button
            type="button"
            onClick={addEducation}
            className="px-4 py-2 bg-gold text-white rounded-lg font-semibold hover:bg-gold/80 transition-all"
          >
            + Add Education
          </button>
        </div>

        {formData.items.map((item, index) => (
          <div key={index} className="p-6 bg-beige/20 rounded-xl space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-charcoal">Education {index + 1}</h4>
              {formData.items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
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
                value={item.year}
                onChange={(e) => handleItemChange(index, 'year', e.target.value)}
                className="px-3 py-2 border-2 border-beige rounded-lg focus:border-gold outline-none"
                placeholder="Year (e.g., 2023)"
              />
            </div>

            <input
              type="text"
              value={item.degree}
              onChange={(e) => handleItemChange(index, 'degree', e.target.value)}
              className="w-full px-3 py-2 border-2 border-beige rounded-lg focus:border-gold outline-none"
              placeholder="Degree Name"
            />

            <input
              type="text"
              value={item.institution}
              onChange={(e) => handleItemChange(index, 'institution', e.target.value)}
              className="w-full px-3 py-2 border-2 border-beige rounded-lg focus:border-gold outline-none"
              placeholder="Institution Name"
            />
          </div>
        ))}
      </div>

      {/* Continuous Learning */}
      <div className="p-6 bg-gold/10 rounded-xl space-y-4">
        <h3 className="text-lg font-semibold text-charcoal">Continuous Learning Section</h3>

        <input
          type="text"
          value={formData.continuousLearning.icon}
          onChange={(e) => handleContinuousLearningChange('icon', e.target.value)}
          className="w-full px-3 py-2 border-2 border-beige rounded-lg focus:border-gold outline-none"
          placeholder="Icon (emoji)"
        />

        <input
          type="text"
          value={formData.continuousLearning.title}
          onChange={(e) => handleContinuousLearningChange('title', e.target.value)}
          className="w-full px-3 py-2 border-2 border-beige rounded-lg focus:border-gold outline-none"
          placeholder="Title"
        />

        <textarea
          value={formData.continuousLearning.description}
          onChange={(e) => handleContinuousLearningChange('description', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border-2 border-beige rounded-lg focus:border-gold outline-none resize-none"
          placeholder="Description"
        />
      </div>

      {/* Save Button */}
      <button
        type="submit"
        className="w-full px-6 py-4 bg-gradient-to-r from-gold to-terracotta text-white rounded-xl font-semibold hover:from-gold/90 hover:to-terracotta/90 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
      >
        💾 Save Education Section
      </button>
    </form>
  );
};

export default EducationForm;
