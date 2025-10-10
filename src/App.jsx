import React, { useState, useEffect } from 'react'
import { Copy, Film, Camera, Zap, MessageSquare, Focus, Sun, Volume2, Check, Plus, X, Save, FolderOpen, Info, RotateCcw } from 'lucide-react'
import SavePromptDialog from './components/SavePromptDialog'
import PromptsDrawer from './components/PromptsDrawer'
import InfoModal from './components/InfoModal'
import { savePrompt, getAllPrompts, deletePrompt, duplicatePrompt } from './utils/localStorage'

function App() {
  const [formData, setFormData] = useState({
    sceneDescription: '',
    cameraShot: '',
    cameraLens: '',
    lighting: '',
    mood: '',
    actions: ['', '', ''],
    audio: '',
    dialogue: ''
  })
  
  const [showNotification, setShowNotification] = useState(false)
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [showDrawer, setShowDrawer] = useState(false)
  const [savedPrompts, setSavedPrompts] = useState([])
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [infoModalType, setInfoModalType] = useState('')

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleActionChange = (index, value) => {
    setFormData(prev => ({
      ...prev,
      actions: prev.actions.map((action, i) => i === index ? value : action)
    }))
  }

  const addAction = () => {
    setFormData(prev => ({
      ...prev,
      actions: [...prev.actions, '']
    }))
  }

  const removeAction = (index) => {
    setFormData(prev => ({
      ...prev,
      actions: prev.actions.filter((_, i) => i !== index)
    }))
  }

  const generatePrompt = () => {
    let prompt = ''
    
    if (formData.sceneDescription) {
      prompt += formData.sceneDescription + '\n\n'
    }
    
    if (formData.cameraShot || formData.cameraLens || formData.lighting || formData.mood) {
      prompt += 'Cinematography:\n'
      if (formData.cameraShot) {
        prompt += `Camera shot: ${formData.cameraShot}\n`
      }
      if (formData.cameraLens) {
        prompt += `Camera lens: ${formData.cameraLens}\n`
      }
      if (formData.lighting) {
        prompt += `Lighting: ${formData.lighting}\n`
      }
      if (formData.mood) {
        prompt += `Mood: ${formData.mood}\n`
      }
      prompt += '\n'
    }
    
    const validActions = formData.actions.filter(action => action.trim())
    if (validActions.length > 0) {
      prompt += 'Actions:\n'
      validActions.forEach(action => {
        prompt += `- ${action}\n`
      })
      prompt += '\n'
    }
    
    if (formData.audio) {
      prompt += 'Audio:\n'
      prompt += formData.audio + '\n\n'
    }
    
    if (formData.dialogue) {
      prompt += 'Dialogue:\n'
      prompt += formData.dialogue
    }
    
    return prompt.trim()
  }

  const copyToClipboard = async () => {
    const prompt = generatePrompt()
    try {
      await navigator.clipboard.writeText(prompt)
      setShowNotification(true)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [showNotification])

  // Load saved prompts on component mount
  useEffect(() => {
    setSavedPrompts(getAllPrompts())
  }, [])

  const handleSavePrompt = async (promptData) => {
    try {
      await savePrompt(promptData)
      setSavedPrompts(getAllPrompts())
      setShowNotification(true)
    } catch (error) {
      console.error('Error saving prompt:', error)
    }
  }

  const handleLoadPrompt = (prompt) => {
    setFormData(prompt.formData)
    setShowDrawer(false)
  }

  const handleDuplicatePrompt = async (prompt) => {
    try {
      const duplicated = await duplicatePrompt(prompt.id)
      setSavedPrompts(getAllPrompts())
      setFormData(duplicated.formData)
      setShowDrawer(false)
    } catch (error) {
      console.error('Error duplicating prompt:', error)
    }
  }

  const handleDeletePrompt = async (id) => {
    try {
      await deletePrompt(id)
      setSavedPrompts(getAllPrompts())
    } catch (error) {
      console.error('Error deleting prompt:', error)
    }
  }

  const openInfoModal = (type) => {
    setInfoModalType(type)
    setShowInfoModal(true)
  }

  const handleInsertTerm = (term) => {
    // Map modal types to form fields
    const fieldMap = {
      'camera-shot': 'cameraShot',
      'camera-lens': 'cameraLens', 
      'lighting': 'lighting',
      'mood': 'mood',
      'actions': 'actions'
    }

    const field = fieldMap[infoModalType]
    if (!field) return

    if (field === 'actions') {
      // For actions, add to the first empty action or create new one
      const emptyIndex = formData.actions.findIndex(action => !action.trim())
      if (emptyIndex !== -1) {
        handleActionChange(emptyIndex, term)
      } else {
        // Add new action
        setFormData(prev => ({
          ...prev,
          actions: [...prev.actions, term]
        }))
      }
    } else {
      // For other fields, append to existing value
      const currentValue = formData[field] || ''
      const newValue = currentValue ? `${currentValue}, ${term}` : term
      handleInputChange(field, newValue)
    }
  }

  const clearAllFields = () => {
    if (confirm('Are you sure you want to clear all fields? This action cannot be undone.')) {
      setFormData({
        sceneDescription: '',
        cameraShot: '',
        cameraLens: '',
        lighting: '',
        mood: '',
        actions: ['', '', ''],
        audio: '',
        dialogue: ''
      })
    }
  }

  const generatedPrompt = generatePrompt()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Utility Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-b border-gray-200 z-40">
        <div className="max-w-5xl mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">
              Sora Prompt Generator
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSaveDialog(true)}
                className="flex items-center px-3 py-1 text-sm text-sky-600 hover:text-sky-800 hover:bg-sky-50 rounded-md transition-colors"
              >
                <Save className="w-3 h-3 mr-1" />
                Save
              </button>
              <button
                onClick={() => setShowDrawer(true)}
                className="flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors"
              >
                <FolderOpen className="w-3 h-3 mr-1" />
                Saved ({savedPrompts.length})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-12 pb-8 md:pt-12 md:pb-8">
        <div className="max-w-5xl mx-auto px-0 md:px-4">
          <div className="bg-white rounded-b-lg shadow-lg p-5 md:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              Sora Prompt Generator
            </h1>
            <div className="text-center mb-8">
              <p className="text-sm text-gray-600 mb-2">
                Based on the official <a 
                href="https://cookbook.openai.com/examples/sora/sora2_prompting_guide" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sky-600 hover:text-sky-800 text-sm underline"
              >Sora 2 Prompting Guide</a>.<br />All fields are optional.
              </p>
            </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Film className="inline w-4 h-4 mr-2" />
                  Scene Description
                  <button
                    type="button"
                    onClick={() => openInfoModal('scene-description')}
                    className="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Scene description reference"
                  >
                    <Info className="w-3 h-3" />
                  </button>
                </label>
                <textarea
                  value={formData.sceneDescription}
                  onChange={(e) => handleInputChange('sceneDescription', e.target.value)}
                  placeholder="Describe characters, costumes, scenery, weather and other details..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={8}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Camera className="inline w-4 h-4 mr-2" />
                  Camera Shot
                  <button
                    type="button"
                    onClick={() => openInfoModal('camera-shot')}
                    className="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Camera shot reference"
                  >
                    <Info className="w-3 h-3" />
                  </button>
                </label>
                <input
                  type="text"
                  value={formData.cameraShot}
                  onChange={(e) => handleInputChange('cameraShot', e.target.value)}
                  placeholder="e.g. wide establishing shot, eye level"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Focus className="inline w-4 h-4 mr-2" />
                  Camera Lens
                  <button
                    type="button"
                    onClick={() => openInfoModal('camera-lens')}
                    className="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Camera & lens reference"
                  >
                    <Info className="w-3 h-3" />
                  </button>
                </label>
                <input
                  type="text"
                  value={formData.cameraLens}
                  onChange={(e) => handleInputChange('cameraLens', e.target.value)}
                  placeholder="e.g. 50mm lens, wide angle, telephoto"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Sun className="inline w-4 h-4 mr-2" />
                  Lighting
                  <button
                    type="button"
                    onClick={() => openInfoModal('lighting')}
                    className="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Lighting reference"
                  >
                    <Info className="w-3 h-3" />
                  </button>
                </label>
                <input
                  type="text"
                  value={formData.lighting}
                  onChange={(e) => handleInputChange('lighting', e.target.value)}
                  placeholder="e.g. natural daylight, dramatic shadows, soft lighting"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Zap className="inline w-4 h-4 mr-2" />
                  Mood
                  <button
                    type="button"
                    onClick={() => openInfoModal('mood')}
                    className="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Film mood reference"
                  >
                    <Info className="w-3 h-3" />
                  </button>
                </label>
                <input
                  type="text"
                  value={formData.mood}
                  onChange={(e) => handleInputChange('mood', e.target.value)}
                  placeholder="e.g. cinematic and tense, playful and suspenseful"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Actions
                  <button
                    type="button"
                    onClick={() => openInfoModal('actions')}
                    className="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Cinematic techniques reference"
                  >
                    <Info className="w-3 h-3" />
                  </button>
                </label>
                {formData.actions.map((action, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={action}
                      onChange={(e) => handleActionChange(index, e.target.value)}
                      placeholder={`Action ${index + 1}: a clear, specific beat or gesture`}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {formData.actions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeAction(index)}
                        className="ml-2 p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addAction}
                  className="flex items-center px-3 py-1 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Volume2 className="inline w-4 h-4 mr-2" />
                  Audio
                </label>
                <textarea
                  value={formData.audio}
                  onChange={(e) => handleInputChange('audio', e.target.value)}
                  placeholder="Describe background music, sound effects, ambient sounds..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="inline w-4 h-4 mr-2" />
                  Dialogue
                </label>
                <textarea
                  value={formData.dialogue}
                  onChange={(e) => handleInputChange('dialogue', e.target.value)}
                  placeholder={`- Character one: "Line one."\n- Character two: "Line two."\n- Character one: "Line three"`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                />
              </div>
            </div>

            {/* Generated Prompt */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Generated Prompt</h2>
                <button
                  onClick={copyToClipboard}
                  disabled={!generatedPrompt}
                  className="flex items-center px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </button>
              </div>
              
              <div className="bg-gray-100 rounded-md p-4 min-h-[400px]">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                  {generatedPrompt || 'Fill in the form fields to generate your Sora prompt...'}
                </pre>
              </div>
              
              {/* Clear Fields Button */}
              <div className="mt-4 flex justify-center">
                <button
                  onClick={clearAllFields}
                  className="flex items-center px-4 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Clear All Fields
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50 animate-in slide-in-from-right duration-300">
          <Check className="w-5 h-5" />
          <span>Prompt saved successfully!</span>
        </div>
      )}

      {/* Save Dialog */}
      <SavePromptDialog
        isOpen={showSaveDialog}
        onClose={() => setShowSaveDialog(false)}
        onSave={handleSavePrompt}
        formData={formData}
      />

      {/* Prompts Drawer */}
      <PromptsDrawer
        isOpen={showDrawer}
        onClose={() => setShowDrawer(false)}
        onLoadPrompt={handleLoadPrompt}
        onDuplicatePrompt={handleDuplicatePrompt}
        onDeletePrompt={handleDeletePrompt}
        prompts={savedPrompts}
      />

      {/* Info Modal */}
      <InfoModal
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        type={infoModalType}
        onInsertTerm={handleInsertTerm}
      />
    </div>
  )
}

export default App
