# 📝 JSON Editor Guide

## Two Ways to Edit Your Portfolio

Your admin panel now supports **two editing modes**:

### 1. 📝 Form Editor (Recommended for Beginners)
- Easy-to-use forms
- No coding knowledge needed
- Visual interface with labels
- Add/Remove buttons
- Perfect for non-technical users

### 2. {} JSON Editor (For Advanced Users)
- Direct JSON editing
- Full control over data structure
- Faster for bulk changes
- Requires JSON knowledge
- Perfect for developers

## How to Switch Between Modes

1. Go to: `http://localhost:5173/admin`
2. Login with: `admin123`
3. Look for the **Edit Mode** section at the top
4. Click either:
   - **📝 Form Editor** - User-friendly forms
   - **{} JSON Editor** - Raw JSON editing

## Using JSON Editor

### Step 1: Select JSON Editor Mode
Click the **{} JSON Editor** button at the top

### Step 2: Choose a Section
Click on any tab (Hero, About, Experience, etc.)

### Step 3: Edit the JSON
- The JSON for that section will appear in the text area
- Edit the JSON directly
- Make sure it's valid JSON format

### Step 4: Save Changes
Click **💾 Save JSON Changes**

## JSON Format Examples

### Hero Section
```json
{
  "name": "Your Name",
  "title": "Your Job Title",
  "description": "Your description here",
  "buttons": {
    "primary": "Button 1 Text",
    "secondary": "Button 2 Text"
  }
}
```

### About Section
```json
{
  "title": "About Me",
  "description": "Your about text",
  "stats": [
    {
      "icon": "⏱️",
      "number": "5+",
      "label": "Years Experience"
    }
  ]
}
```

### Experience Section
```json
{
  "title": "Experience",
  "subtitle": "My Journey",
  "items": [
    {
      "title": "Job Title",
      "subtitle": "Company Name",
      "period": "2020-2023",
      "description": "Job description",
      "responsibilities": [
        "Responsibility 1",
        "Responsibility 2"
      ],
      "icon": "💼"
    }
  ]
}
```

### Skills Section
```json
{
  "title": "Skills & Expertise",
  "subtitle": "What I Bring",
  "categories": [
    {
      "title": "Category Name",
      "icon": "🏨",
      "skills": [
        {
          "name": "Skill Name",
          "level": 85
        }
      ]
    }
  ]
}
```

### Education Section
```json
{
  "title": "Education",
  "subtitle": "Academic Background",
  "items": [
    {
      "degree": "Degree Name",
      "institution": "School Name",
      "year": "2023",
      "icon": "🎓"
    }
  ],
  "continuousLearning": {
    "title": "Continuous Learning",
    "description": "Description text",
    "icon": "📚"
  }
}
```

### Contact Section
```json
{
  "title": "Get In Touch",
  "subtitle": "Let's Connect",
  "description": "Contact description",
  "email": "your@email.com",
  "phone": "123-456-7890",
  "address": "Your full address",
  "mapUrl": "Google Maps embed URL",
  "cta": {
    "title": "CTA Title",
    "description": "CTA description",
    "buttonText": "Button Text",
    "icon": "💌"
  }
}
```

## JSON Editing Tips

### ✅ Do's
- Use double quotes `"` for all strings
- Add commas `,` between items
- Match opening and closing brackets `{}` and `[]`
- Use proper indentation for readability
- Test your JSON in a validator first

### ❌ Don'ts
- Don't use single quotes `'`
- Don't forget commas between items
- Don't leave trailing commas
- Don't use comments (JSON doesn't support them)
- Don't forget to close brackets

## Validating Your JSON

### Online Validators
- [JSONLint](https://jsonlint.com)
- [JSON Formatter](https://jsonformatter.org)
- [JSON Validator](https://jsonformatter.curiousconcept.com)

### Common Errors

**Missing Comma**
```json
// ❌ Wrong
{
  "name": "John"
  "title": "Developer"
}

// ✅ Correct
{
  "name": "John",
  "title": "Developer"
}
```

**Trailing Comma**
```json
// ❌ Wrong
{
  "name": "John",
  "title": "Developer",
}

// ✅ Correct
{
  "name": "John",
  "title": "Developer"
}
```

**Single Quotes**
```json
// ❌ Wrong
{
  'name': 'John'
}

// ✅ Correct
{
  "name": "John"
}
```

**Missing Bracket**
```json
// ❌ Wrong
{
  "name": "John",
  "address": {
    "city": "New York"
}

// ✅ Correct
{
  "name": "John",
  "address": {
    "city": "New York"
  }
}
```

## When to Use Each Mode

### Use Form Editor When:
- ✅ You're not familiar with JSON
- ✅ You want a guided experience
- ✅ You're making small changes
- ✅ You want to avoid syntax errors
- ✅ You prefer visual editing

### Use JSON Editor When:
- ✅ You know JSON format
- ✅ You want to make bulk changes
- ✅ You're copying data from another source
- ✅ You need precise control
- ✅ You're comfortable with code

## Troubleshooting

### "Invalid JSON format" Error
1. Copy your JSON
2. Go to [JSONLint](https://jsonlint.com)
3. Paste and validate
4. Fix the errors shown
5. Copy the corrected JSON back

### Changes Not Saving
- Make sure JSON is valid
- Check browser console (F12) for errors
- Try switching to Form Editor mode
- Click "Reset All to Default" and try again

### Lost Your Changes
- JSON editor saves to the same localStorage
- Switch back to Form Editor to see your data
- Use "Reset All to Default" to restore original

## Best Practices

1. **Backup First**: Copy your JSON before making big changes
2. **Test Small**: Make small changes and test frequently
3. **Validate**: Always validate JSON before saving
4. **Use Form Editor**: When in doubt, use Form Editor mode
5. **Save Often**: Save after each successful change

## Keyboard Shortcuts

- **Ctrl/Cmd + A**: Select all text
- **Ctrl/Cmd + C**: Copy
- **Ctrl/Cmd + V**: Paste
- **Ctrl/Cmd + Z**: Undo
- **Tab**: Indent (in some browsers)

---

**Choose the mode that works best for you! Both save to the same data.** 🎉
