# Portfolio Admin Panel Guide

## Overview
Your portfolio now has a built-in admin panel that allows you to edit all content directly from the UI without touching any code!

## How to Access

1. **Look for the Settings Icon**: At the bottom-right corner of your portfolio, you'll see a gear icon (⚙️)
2. **Click the Icon**: This opens the admin panel
3. **Login**: Enter the password (default: `admin123`)
4. **Edit Content**: Use the tabs to edit different sections

## Features

### 🔐 Password Protection
- Default password: `admin123`
- Change it in `src/components/AdminPanel.jsx` (line 15)

### 📝 Edit Sections
The admin panel has tabs for each section:
- **Hero**: Name, title, description, button text
- **About**: Title and description
- **Experience**: Job titles, descriptions, responsibilities
- **Skills**: Skill categories, names, and levels
- **Education**: Degrees, institutions, years
- **Contact**: Email, phone, address, map URL

### 💾 Save Changes
1. Edit the JSON in the text area
2. Click "💾 Save Changes"
3. Page will reload automatically with your changes
4. Changes are saved to browser localStorage

### 🔄 Reset to Default
- Click "🔄 Reset to Default" to restore original content
- This clears all custom changes

## JSON Structure

### Hero Section
```json
{
  "name": "Your Name",
  "title": "Your Title",
  "description": "Your description",
  "buttons": {
    "primary": "Button 1 Text",
    "secondary": "Button 2 Text"
  }
}
```

### Skills Section
```json
{
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

### Experience Section
```json
{
  "items": [
    {
      "title": "Job Title",
      "subtitle": "Company",
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

## Tips

1. **Valid JSON**: Make sure your JSON is valid (proper quotes, commas, brackets)
2. **Icons**: Use emoji icons (copy from emojipedia.org)
3. **Skill Levels**: Use numbers 0-100
4. **Test Changes**: Save and check how it looks before finalizing
5. **Backup**: Copy your JSON before making major changes

## Troubleshooting

### "Invalid JSON format" Error
- Check for missing commas
- Check for missing quotes around text
- Use a JSON validator online

### Changes Not Showing
- Make sure you clicked "Save Changes"
- Wait for page reload
- Clear browser cache if needed

### Lost Changes
- Changes are saved in browser localStorage
- Clearing browser data will reset to default
- Consider backing up your JSON regularly

## Security Note

The admin panel is password-protected but stores data in browser localStorage. For production use, consider:
- Changing the default password
- Implementing backend storage
- Adding user authentication

## Support

If you need help:
1. Check the JSON format
2. Use browser console (F12) to see errors
3. Reset to default and try again
