import React, { useState, useEffect } from 'react'
import { Copy, Film, Camera, Zap, MessageSquare, Focus, Sun, Volume2, Check, Plus, X } from 'lucide-react'

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

  const generatedPrompt = generatePrompt()

  return (
    <div className="min-h-screen bg-gray-50 py-0 md:py-8">
      <div className="max-w-5xl mx-auto px-0 md:px-4">
        <div className="bg-white rounded-lg shadow-lg p-5 md:p-8">
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
            >Sora 2 Prompting Guide</a>
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Film className="inline w-4 h-4 mr-2" />
                  Scene Description
                </label>
                <textarea
                  value={formData.sceneDescription}
                  onChange={(e) => handleInputChange('sceneDescription', e.target.value)}
                  placeholder="Describe characters, costumes, scenery, weather and other details..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Camera className="inline w-4 h-4 mr-2" />
                  Camera Shot
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
                  rows={3}
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
                  rows={3}
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
            </div>
          </div>
        </div>
      </div>
      
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50 animate-in slide-in-from-right duration-300">
          <Check className="w-5 h-5" />
          <span>Prompt copied to clipboard!</span>
        </div>
      )}
    </div>
  )
}

export default App
