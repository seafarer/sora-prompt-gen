import React, { useState } from 'react'
import { ChevronDown, ChevronRight, BookOpen, Lightbulb, Camera, Palette, Workflow } from 'lucide-react'

const Wiki = () => {
  const [expandedSections, setExpandedSections] = useState({})

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => {
      // If clicking the same section, toggle it
      if (prev[sectionId]) {
        return { [sectionId]: false }
      }
      // Otherwise, close all others and open this one
      return { [sectionId]: true }
    })
  }

  const wikiSections = [
    {
      id: 'prompt-anatomy',
      title: 'Prompt Anatomy',
      icon: <BookOpen className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-600 mb-2">Structure Your Shots</h4>
            <p className="text-sm text-gray-600">Describe your shot like a storyboard: state camera framing, note depth of field, describe action in beats, and set lighting and palette. One shot, one camera setup, one action.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-600 mb-2">Balance Detail vs. Freedom</h4>
            <p className="text-sm text-gray-600">Shorter prompts give the model creative freedom with surprising results. Longer, detailed prompts restrict creativity for more control—but may not always follow instructions reliably.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-600 mb-2">Be Specific Where It Counts</h4>
            <p className="text-sm text-gray-600">Instead of "beautiful street," write "wet asphalt, zebra crosswalk, neon signs reflecting in puddles." Verbs and nouns that point to visible results yield clearer output.</p>
          </div>
        </div>
      )
    },
    {
      id: 'motion-timing',
      title: 'Motion & Timing',
      icon: <Workflow className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-600 mb-2">Keep It Simple</h4>
            <p className="text-sm text-gray-600">Each shot should have one clear camera move and one clear subject action. Movement is the hardest part—don't overcomplicate it.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-600 mb-2">Describe in Beats</h4>
            <p className="text-sm text-gray-600">Instead of "actor walks," write "actor takes four steps to the window, pauses, and pulls the curtain in the final second." Specific timing makes actions achievable.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-600 mb-2">Shorter Clips Work Better</h4>
            <p className="text-sm text-gray-600">The model follows instructions more reliably in 4-second clips. Consider stitching multiple 4s clips together rather than generating one 8s clip.</p>
          </div>
        </div>
      )
    },
    {
      id: 'camera-framing',
      title: 'Camera & Framing',
      icon: <Camera className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-600 mb-2">Be Specific About Framing</h4>
            <p className="text-sm text-gray-600">Instead of "cinematic look," specify: "wide shot, low angle" or "medium close-up, slight angle from behind." Clear direction shapes how the shot feels.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-600 mb-2">Depth of Field Matters</h4>
            <p className="text-sm text-gray-600">Shallow focus makes subjects stand out against blurred backgrounds. Deep focus keeps foreground and background sharp. State your preference clearly.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-600 mb-2">Camera Movement</h4>
            <p className="text-sm text-gray-600">Good examples: "slowly tilting camera," "handheld eng camera," "wide shot, tracking left to right," "aerial wide shot, slight downward angle."</p>
          </div>
        </div>
      )
    },
    {
      id: 'lighting-color',
      title: 'Lighting & Color',
      icon: <Palette className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-600 mb-2">Light Determines Mood</h4>
            <p className="text-sm text-gray-600">Describe quality and color: "soft window light with warm lamp fill, cool rim from hallway" beats "brightly lit room." Light creates mood as much as action.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-600 mb-2">Use Color Anchors</h4>
            <p className="text-sm text-gray-600">Name 3-5 specific colors to keep your palette stable across shots: "amber, cream, walnut brown" or "teal, sand, rust." This ensures consistency when cutting clips together.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-600 mb-2">Set Style Early</h4>
            <p className="text-sm text-gray-600">Establish aesthetic upfront: "1970s film," "IMAX-scale scene," or "16mm black-and-white." Style is one of the most powerful levers for guiding output.</p>
          </div>
        </div>
      )
    },
    {
      id: 'iteration-tips',
      title: 'Iteration & Workflow',
      icon: <Lightbulb className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-600 mb-2">Treat Prompts as Briefs, Not Contracts</h4>
            <p className="text-sm text-gray-600">The same prompt generates different results each time—this is a feature. Iterate and collaborate with the model; small changes to camera, lighting, or action can shift outcomes dramatically.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-600 mb-2">Use Remix for Controlled Changes</h4>
            <p className="text-sm text-gray-600">Make one tweak at a time: "same shot, switch to 85mm" or "same lighting, new palette: teal, sand, rust." Pin good results and describe only what you're changing.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-600 mb-2">When Stuck, Simplify</h4>
            <p className="text-sm text-gray-600">If a shot keeps failing, strip it back: freeze the camera, simplify the action, clear the background. Once it works, layer in complexity step by step.</p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-gray-400" />
          Shot Builder Wiki
        </h2>
        <p className="text-sm text-gray-600 mt-1">Quick reference for better Sora prompts</p>
      </div>
      
      <div className="divide-y divide-gray-200">
        {wikiSections.map((section) => (
          <div key={section.id} className="p-4">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between text-left hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors"
            >
              <div className="flex items-center gap-3">

                <span className="font-medium text-gray-500">{section.title}</span>
              </div>
              {expandedSections[section.id] ? (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
            </button>
            
            {expandedSections[section.id] && (
              <div className="mt-4">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wiki
