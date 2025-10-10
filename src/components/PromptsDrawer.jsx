import React, { useState, useEffect } from 'react'
import { X, Search, Tag, Calendar, Copy, Trash2, Loader } from 'lucide-react'

const PromptsDrawer = ({ isOpen, onClose, onLoadPrompt, onDuplicatePrompt, onDeletePrompt, prompts }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [isDeleting, setIsDeleting] = useState(null)

  // Get all unique tags from prompts
  const allTags = [...new Set(prompts.flatMap(prompt => prompt.tags || []))]

  // Filter prompts based on search and tag
  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = !searchTerm || 
      prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.formData?.sceneDescription?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesTag = !selectedTag || (prompt.tags || []).includes(selectedTag)
    
    return matchesSearch && matchesTag
  })

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this prompt?')) return
    
    setIsDeleting(id)
    try {
      await onDeletePrompt(id)
    } catch (error) {
      console.error('Error deleting prompt:', error)
    } finally {
      setIsDeleting(null)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    })
  }

  const getPreview = (formData) => {
    if (formData?.sceneDescription) {
      return formData.sceneDescription.length > 100 
        ? formData.sceneDescription.substring(0, 100) + '...'
        : formData.sceneDescription
    }
    return 'No description available'
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="
        absolute 
        bottom-0 left-0 right-0 
        md:bottom-auto md:right-0 md:left-auto md:top-0 md:w-[500px]
        bg-white shadow-xl
        max-h-[85vh] md:h-dvh md:max-h-dvh
        flex flex-col
      ">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Saved Prompts ({prompts.length})
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search and Filters */}
        <div className="p-4 border-b space-y-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>

          {/* Tag Filters */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag('')}
                className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                  !selectedTag 
                    ? 'bg-sky-100 text-sky-800 border-sky-300' 
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                  className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                    selectedTag === tag 
                      ? 'bg-sky-100 text-sky-800 border-sky-300' 
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  <Tag className="inline w-3 h-3 mr-1" />
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Prompts List */}
        <div className="flex-1 overflow-y-auto">
          {filteredPrompts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-lg font-medium mb-2">
                {searchTerm || selectedTag ? 'No prompts found' : 'No saved prompts yet'}
              </p>
              <p className="text-sm text-center">
                {searchTerm || selectedTag 
                  ? 'Try adjusting your search or filters' 
                  : 'Create your first prompt and save it here'
                }
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {filteredPrompts.map(prompt => (
                <div key={prompt.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900 text-sm">
                      {prompt.title}
                    </h3>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(prompt.createdAt)}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    {getPreview(prompt.formData)}
                  </p>
                  
                  {/* Tags */}
                  {prompt.tags && prompt.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {prompt.tags.map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 text-xs bg-sky-100 text-sky-800 rounded-full"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onLoadPrompt(prompt)}
                      className="flex items-center px-3 py-1 text-xs bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors"
                    >
                      <Loader className="w-3 h-3 mr-1" />
                      Load
                    </button>
                    <button
                      onClick={() => onDuplicatePrompt(prompt)}
                      className="flex items-center px-3 py-1 text-xs bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Duplicate
                    </button>
                    <button
                      onClick={() => handleDelete(prompt.id)}
                      disabled={isDeleting === prompt.id}
                      className="flex items-center px-3 py-1 text-xs bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400 transition-colors"
                    >
                      {isDeleting === prompt.id ? (
                        <div className="w-3 h-3 mr-1 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      ) : (
                        <Trash2 className="w-3 h-3 mr-1" />
                      )}
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PromptsDrawer
