// localStorage utility functions for prompt management

const STORAGE_KEY = 'sora_prompts';

// Generate unique ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Save a prompt to localStorage
export const savePrompt = (promptData) => {
  try {
    const prompts = getAllPrompts();
    const newPrompt = {
      id: generateId(),
      title: promptData.title || 'Untitled Prompt',
      tags: promptData.tags || [],
      formData: promptData.formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    prompts.push(newPrompt);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
    return newPrompt;
  } catch (error) {
    console.error('Error saving prompt:', error);
    throw error;
  }
};

// Get all saved prompts
export const getAllPrompts = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error retrieving prompts:', error);
    return [];
  }
};

// Delete a prompt by ID
export const deletePrompt = (id) => {
  try {
    const prompts = getAllPrompts();
    const filteredPrompts = prompts.filter(prompt => prompt.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPrompts));
    return true;
  } catch (error) {
    console.error('Error deleting prompt:', error);
    throw error;
  }
};

// Update a prompt
export const updatePrompt = (id, updates) => {
  try {
    const prompts = getAllPrompts();
    const index = prompts.findIndex(prompt => prompt.id === id);
    
    if (index === -1) {
      throw new Error('Prompt not found');
    }
    
    prompts[index] = {
      ...prompts[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
    return prompts[index];
  } catch (error) {
    console.error('Error updating prompt:', error);
    throw error;
  }
};

// Duplicate a prompt
export const duplicatePrompt = (id) => {
  try {
    const prompts = getAllPrompts();
    const originalPrompt = prompts.find(prompt => prompt.id === id);
    
    if (!originalPrompt) {
      throw new Error('Prompt not found');
    }
    
    // Find the highest version number for this title
    const baseTitle = originalPrompt.title.replace(/\s+v\d+$/, '');
    const versionedPrompts = prompts.filter(p => 
      p.title === baseTitle || p.title.startsWith(baseTitle + ' v')
    );
    
    let versionNumber = 1;
    if (versionedPrompts.length > 0) {
      const versionNumbers = versionedPrompts
        .map(p => {
          const match = p.title.match(/v(\d+)$/);
          return match ? parseInt(match[1]) : 0;
        })
        .filter(v => v > 0);
      
      if (versionNumbers.length > 0) {
        versionNumber = Math.max(...versionNumbers) + 1;
      }
    }
    
    const duplicatedPrompt = {
      ...originalPrompt,
      id: generateId(),
      title: `${baseTitle} v${versionNumber}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    prompts.push(duplicatedPrompt);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
    return duplicatedPrompt;
  } catch (error) {
    console.error('Error duplicating prompt:', error);
    throw error;
  }
};
