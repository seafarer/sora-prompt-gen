import React, { useState, useEffect } from 'react'
import { Copy, Check, Save, FolderOpen, RotateCcw } from 'lucide-react'
import PromptForm from './components/PromptForm'
import SavePromptDialog from './components/SavePromptDialog'
import PromptsDrawer from './components/PromptsDrawer'
import InfoModal from './components/InfoModal'
import Wiki from './components/Wiki'
import { savePrompt, getAllPrompts, deletePrompt, duplicatePrompt } from './utils/localStorage'

function App() {
  const [formData, setFormData] = useState({
    sceneDescription: '',
    cameraShot: '',
    cameraLens: '',
    cinematographyNotes: '',
    lighting: '',
    mood: '',
    actions: ['', '', ''],
    audio: '',
    dialogue: ''
  })
  
  const [notification, setNotification] = useState({ show: false, message: '' })
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
    
    if (formData.cameraShot || formData.cameraLens || formData.cinematographyNotes || formData.lighting || formData.mood) {
      prompt += 'Cinematography:\n'
      if (formData.cameraShot) {
        prompt += `Camera shot: ${formData.cameraShot}\n`
      }
      if (formData.cameraLens) {
        prompt += `Camera lens: ${formData.cameraLens}\n`
      }
      if (formData.cinematographyNotes) {
        prompt += `${formData.cinematographyNotes}\n`
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
      setNotification({ show: true, message: 'Copied to clipboard!' })
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ show: false, message: '' })
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [notification.show])

  // Load saved prompts on component mount
  useEffect(() => {
    setSavedPrompts(getAllPrompts())
  }, [])

  const handleSavePrompt = async (promptData) => {
    try {
      await savePrompt(promptData)
      setSavedPrompts(getAllPrompts())
      setNotification({ show: true, message: 'Prompt saved successfully!' })
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
      'cinematography-notes': 'cinematographyNotes',
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
        cinematographyNotes: '',
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
            <div className="text-sm text-gray-500 font-bold uppercase">
              Shot Builder
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
            <PromptForm
              formData={formData}
              onInputChange={handleInputChange}
              onActionChange={handleActionChange}
              onAddAction={addAction}
              onRemoveAction={removeAction}
              onOpenInfoModal={openInfoModal}
            />

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
              {/* Wiki - Full width below the main content */}
              <div className="mt-8">
                <Wiki />
              </div>
              <div className="mt-8">
                <p className="text-base text-gray-600 text-center">
                  Connect with me on Sora: <br />

                <a className="text-sky-600 hover:text-sky-800 text-base underline" 
                    href="https://sora.chatgpt.com/profile/spunhinged" 
                    target="_blank" 
                    rel="noopener noreferrer"
                   
                  > 
                  Spunhinged</a>
                
                </p>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
      
      {/* Notification Toast */}
      {notification.show && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50 animate-in slide-in-from-right duration-300">
          <Check className="w-5 h-5" />
          <span>{notification.message}</span>
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
