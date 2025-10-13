import React from 'react'
import { Film, Camera, Focus, Sun, Zap, Volume2, MessageSquare, Plus, X, Info } from 'lucide-react'

function PromptForm({ formData, onInputChange, onActionChange, onAddAction, onRemoveAction, onOpenInfoModal }) {
  return (
    <div className="space-y-6">
      {/* Scene Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Film className="inline w-4 h-4 mr-2" />
          Scene Description
          <button
            type="button"
            onClick={() => onOpenInfoModal('scene-description')}
            className="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            title="Scene description reference"
          >
            <Info className="w-3 h-3" />
          </button>
        </label>
        <textarea
          value={formData.sceneDescription}
          onChange={(e) => onInputChange('sceneDescription', e.target.value)}
          placeholder="Describe characters, costumes, scenery, weather and other details..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          rows={8}
        />
      </div>

      {/* Cinematography Section Header */}
      <div className="pt-4">
        <div className="border-t border-gray-200 pt-4 mb-4">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Cinematography</h3>
        </div>
      </div>

      {/* Camera Shot */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Camera className="inline w-4 h-4 mr-2" />
          Camera Shot
          <button
            type="button"
            onClick={() => onOpenInfoModal('camera-shot')}
            className="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            title="Camera shot reference"
          >
            <Info className="w-3 h-3" />
          </button>
        </label>
        <input
          type="text"
          value={formData.cameraShot}
          onChange={(e) => onInputChange('cameraShot', e.target.value)}
          placeholder="e.g. wide establishing shot, eye level"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
        />
      </div>

      {/* Camera Lens */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Focus className="inline w-4 h-4 mr-2" />
          Camera Lens
          <button
            type="button"
            onClick={() => onOpenInfoModal('camera-lens')}
            className="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            title="Camera & lens reference"
          >
            <Info className="w-3 h-3" />
          </button>
        </label>
        <input
          type="text"
          value={formData.cameraLens}
          onChange={(e) => onInputChange('cameraLens', e.target.value)}
          placeholder="e.g. 50mm lens, wide angle, telephoto"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
        />
      </div>

      {/* Camera Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Film className="inline w-4 h-4 mr-2" />
          Camera Notes
          <button
            type="button"
            onClick={() => onOpenInfoModal('cinematography-notes')}
            className="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            title="Camera notes reference"
          >
            <Info className="w-3 h-3" />
          </button>
        </label>
        <input
          type="text"
          value={formData.cinematographyNotes}
          onChange={(e) => onInputChange('cinematographyNotes', e.target.value)}
          placeholder="e.g. shallow depth of field, rack focus, handheld motion"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
        />
      </div>

      {/* Lighting */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Sun className="inline w-4 h-4 mr-2" />
          Lighting
          <button
            type="button"
            onClick={() => onOpenInfoModal('lighting')}
            className="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            title="Lighting reference"
          >
            <Info className="w-3 h-3" />
          </button>
        </label>
        <input
          type="text"
          value={formData.lighting}
          onChange={(e) => onInputChange('lighting', e.target.value)}
          placeholder="e.g. natural daylight, dramatic shadows, soft lighting"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
        />
      </div>

      {/* Mood */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Zap className="inline w-4 h-4 mr-2" />
          Mood
          <button
            type="button"
            onClick={() => onOpenInfoModal('mood')}
            className="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            title="Film mood reference"
          >
            <Info className="w-3 h-3" />
          </button>
        </label>
        <input
          type="text"
          value={formData.mood}
          onChange={(e) => onInputChange('mood', e.target.value)}
          placeholder="e.g. cinematic and tense, playful and suspenseful"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
        />
      </div>

      {/* Actions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Actions
          <button
            type="button"
            onClick={() => onOpenInfoModal('actions')}
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
              onChange={(e) => onActionChange(index, e.target.value)}
              placeholder={`Action ${index + 1}: a clear, specific beat or gesture`}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
            {formData.actions.length > 1 && (
              <button
                type="button"
                onClick={() => onRemoveAction(index)}
                className="ml-2 p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={onAddAction}
          className="flex items-center px-3 py-1 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add
        </button>
      </div>

      {/* Audio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Volume2 className="inline w-4 h-4 mr-2" />
          Audio
        </label>
        <textarea
          value={formData.audio}
          onChange={(e) => onInputChange('audio', e.target.value)}
          placeholder="Describe background music, sound effects, ambient sounds..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          rows={4}
        />
      </div>

      {/* Dialogue */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <MessageSquare className="inline w-4 h-4 mr-2" />
          Dialogue
        </label>
        <textarea
          value={formData.dialogue}
          onChange={(e) => onInputChange('dialogue', e.target.value)}
          placeholder={`- Character one: "Line one."\n- Character two: "Line two."\n- Character one: "Line three"`}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          rows={4}
        />
      </div>
    </div>
  )
}

export default PromptForm

