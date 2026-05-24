import { useState, useEffect } from 'react';

const SkillsForm = ({ data, onSave }) => {
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

  const handleCategoryChange = (catIndex, field, value) => {
    const newCategories = [...formData.categories];
    newCategories[catIndex] = {
      ...newCategories[catIndex],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      categories: newCategories
    }));
  };

  const handleSkillChange = (catIndex, skillIndex, field, value) => {
    const newCategories = [...formData.categories];
    newCategories[catIndex].skills[skillIndex] = {
      ...newCategories[catIndex].skills[skillIndex],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      categories: newCategories
    }));
  };

  const addSkill = (catIndex) => {
    const newCategories = [...formData.categories];
    newCategories[catIndex].skills.push({ name: '', level: 50 });
    setFormData(prev => ({
      ...prev,
      categories: newCategories
    }));
  };

  const removeSkill = (catIndex, skillIndex) => {
    const newCategories = [...formData.categories];
    newCategories[catIndex].skills.splice(skillIndex, 1);
    setFormData(prev => ({
      ...prev,
      categories: newCategories
    }));
  };

  const addCategory = () => {
    setFormData(prev => ({
      ...prev,
      categories: [
        ...prev.categories,
        {
          title: '',
          icon: '💼',
          skills: [{ name: '', level: 50 }]
        }
      ]
    }));
  };

  const removeCategory = (catIndex) => {
    if (confirm('Are you sure you want to remove this category?')) {
      const newCategories = formData.categories.filter((_, i) => i !== catIndex);
      setFormData(prev => ({
        ...prev,
        categories: newCategories
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-charcoal mb-6">Skills Section</h2>

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
            placeholder="e.g., Skills & Expertise"
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
            placeholder="e.g., What I Bring"
          />
        </div>
      </div>

      {/* Skill Categories */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-charcoal">Skill Categories</h3>
          <button
            type="button"
            onClick={addCategory}
            className="px-4 py-2 bg-gold text-white rounded-lg font-semibold hover:bg-gold/80 transition-all"
          >
            + Add Category
          </button>
        </div>

        {formData.categories.map((category, catIndex) => (
          <div key={catIndex} className="p-6 bg-beige/20 rounded-xl space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-charcoal">Category {catIndex + 1}</h4>
              {formData.categories.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCategory(catIndex)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
                >
                  Remove Category
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                value={category.icon}
                onChange={(e) => handleCategoryChange(catIndex, 'icon', e.target.value)}
                className="px-3 py-2 border-2 border-beige rounded-lg focus:border-gold outline-none"
                placeholder="Icon (emoji)"
              />

              <input
                type="text"
                value={category.title}
                onChange={(e) => handleCategoryChange(catIndex, 'title', e.target.value)}
                className="px-3 py-2 border-2 border-beige rounded-lg focus:border-gold outline-none"
                placeholder="Category Name"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-charcoal">Skills</label>
                <button
                  type="button"
                  onClick={() => addSkill(catIndex)}
                  className="px-3 py-1 bg-gold/20 text-charcoal rounded-lg text-sm hover:bg-gold/30"
                >
                  + Add Skill
                </button>
              </div>

              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => handleSkillChange(catIndex, skillIndex, 'name', e.target.value)}
                    className="flex-1 px-3 py-2 border-2 border-beige rounded-lg focus:border-gold outline-none text-sm"
                    placeholder="Skill Name"
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={skill.level}
                    onChange={(e) => handleSkillChange(catIndex, skillIndex, 'level', parseInt(e.target.value))}
                    className="w-20 px-3 py-2 border-2 border-beige rounded-lg focus:border-gold outline-none text-sm text-center"
                    placeholder="Level"
                  />
                  <span className="px-3 py-2 bg-gold/10 rounded-lg text-sm font-semibold text-charcoal">
                    {skill.level}%
                  </span>
                  {category.skills.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSkill(catIndex, skillIndex)}
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
        💾 Save Skills Section
      </button>
    </form>
  );
};

export default SkillsForm;
