import React from 'react'
import { X, Camera, Zap, Sun, Film, Play } from 'lucide-react'

const InfoModal = ({ isOpen, onClose, type, onInsertTerm }) => {
  if (!isOpen) return null

  const handleTermClick = (term) => {
    onInsertTerm(term.toLowerCase())
    onClose()
  }

  const makeClickableTerm = (term, description) => (
    <div 
      key={term}
      className="cursor-pointer hover:bg-sky-50 hover:text-sky-800 px-2 py-1 rounded transition-colors"
      onClick={() => handleTermClick(term)}
      title={`Click to insert "${term}"`}
    >
      <strong>{term}</strong> – {description}
    </div>
  )

  const makeClickableFullLine = (term, description) => (
    <div 
      key={term}
      className="cursor-pointer hover:bg-sky-50 hover:text-sky-800 px-2 py-1 rounded transition-colors"
      onClick={() => handleTermClick(`${term} – ${description}`)}
      title={`Click to insert full description`}
    >
      <strong>{term}</strong> – {description}
    </div>
  )

  const getContent = () => {
    switch (type) {
      case 'camera-shot':
        return {
          icon: <Camera className="w-6 h-6 text-sky-600" />,
          title: 'Camera Shot Reference',
          content: (
            <div className="space-y-6">
              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Shot Types (Framing)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {makeClickableTerm("Establishing Shot", "Introduces location or context")}
                  {makeClickableTerm("Wide Shot", "Subject and environment together")}
                  {makeClickableTerm("Long Shot", "Subject and environment together")}
                  {makeClickableTerm("Full Shot", "Head-to-toe framing of a person")}
                  {makeClickableTerm("Medium Shot", "Waist-up framing for dialogue")}
                  {makeClickableTerm("Medium Close-Up", "Shoulders-up, intimate but not tight")}
                  {makeClickableTerm("Close-Up", "Focuses on face or key object")}
                  {makeClickableTerm("Extreme Close-Up", "Isolates small detail (eyes, hands)")}
                  {makeClickableTerm("Two-Shot", "Two subjects in same frame")}
                  {makeClickableTerm("Insert Shot", "Detail/object related to action")}
                  {makeClickableTerm("Cutaway", "Detail/object related to action")}
                  {makeClickableTerm("Reaction Shot", "Character's emotional response")}
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Camera Angles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {makeClickableTerm("Eye-Level", "Neutral perspective at subject's height")}
                  {makeClickableTerm("Low Angle", "Looks up; conveys power/dominance")}
                  {makeClickableTerm("High Angle", "Looks down; vulnerability/smallness")}
                  {makeClickableTerm("Bird's-Eye", "Straight down; detached view")}
                  {makeClickableTerm("Overhead", "Straight down; detached view")}
                  {makeClickableTerm("Dutch Angle", "Tilted horizon for unease/energy")}
                  {makeClickableTerm("Over-the-Shoulder", "From behind subject; dialogue")}
                  {makeClickableTerm("OTS", "From behind subject; dialogue")}
                  {makeClickableTerm("POV", "Shows what character sees")}
                  {makeClickableTerm("Fisheye", "Ultra-wide, distorted for stylized effect")}
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Camera Movements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {makeClickableTerm("Dolly In", "Camera moves toward subject")}
                  {makeClickableTerm("Dolly Out", "Camera moves away from subject")}
                  {makeClickableTerm("Zoom In", "Lens magnification increases")}
                  {makeClickableTerm("Zoom Out", "Lens magnification decreases")}
                  {makeClickableTerm("Crane Up", "Large sweeping vertical movement up")}
                  {makeClickableTerm("Crane Down", "Large sweeping vertical movement down")}
                  {makeClickableTerm("Handheld", "Naturalistic, slightly shaky motion")}
                  {makeClickableTerm("Static", "No camera movement")}
                  {makeClickableTerm("Locked-Off", "No camera movement")}
                  {makeClickableTerm("Arc Left", "Camera circles subject left")}
                  {makeClickableTerm("Arc Right", "Camera circles subject right")}
                  {makeClickableTerm("Whip Pan", "Fast horizontal blur as transition")}
                  {makeClickableTerm("Tracking", "Move uncovers new subject")}
                </div>
              </section>
            </div>
          )
        }

      case 'cinematography-notes':
        return {
          icon: <Film className="w-6 h-6 text-indigo-600" />,
          title: 'Camera Notes Reference',
          content: (
            <div className="space-y-6">
              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Depth of Field</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {makeClickableTerm("Shallow depth of field", "Subject sharp, background blurred")}
                  {makeClickableTerm("Deep depth of field", "Everything in focus")}
                  {makeClickableTerm("Rack focus", "Focus shifts between subjects")}
                  {makeClickableTerm("Selective focus", "Isolates specific element")}
                  {makeClickableTerm("Bokeh", "Aesthetic blur quality")}
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Camera Motion Quality</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {makeClickableTerm("Smooth tracking", "Fluid camera movement")}
                  {makeClickableTerm("Handheld motion", "Natural, organic feel")}
                  {makeClickableTerm("Steady cam", "Stabilized movement")}
                  {makeClickableTerm("Gimbal movement", "Smooth electronic stabilization")}
                  {makeClickableTerm("Locked off", "Completely static")}
                  {makeClickableTerm("Subtle drift", "Slight organic movement")}
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Frame Rate & Speed</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {makeClickableTerm("24fps cinematic", "Standard film look")}
                  {makeClickableTerm("60fps smooth", "High frame rate clarity")}
                  {makeClickableTerm("120fps slow motion", "Dramatic slow-down")}
                  {makeClickableTerm("Overcranked", "Slowed down effect")}
                  {makeClickableTerm("Undercranked", "Sped up effect")}
                  {makeClickableTerm("Variable speed", "Speed changes within shot")}
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Camera Properties</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {makeClickableTerm("Film grain", "Organic texture")}
                  {makeClickableTerm("Digital noise", "Video texture")}
                  {makeClickableTerm("Soft focus", "Diffused, dreamy quality")}
                  {makeClickableTerm("Tack sharp", "Crystal clear detail")}
                  {makeClickableTerm("Lens flare", "Light artifacts")}
                  {makeClickableTerm("Chromatic aberration", "Color fringing effect")}
                  {makeClickableTerm("Vignette", "Darkened edges")}
                </div>
              </section>
            </div>
          )
        }

      case 'camera-lens':
        return {
          icon: <Camera className="w-6 h-6 text-sky-600" />,
          title: 'Camera & Lens Reference',
          content: (
            <div className="space-y-6">
              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Lens Types</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {makeClickableTerm("Prime Lens", "Fixed focal length; sharp and fast")}
                  {makeClickableTerm("Zoom Lens", "Variable focal length for flexibility")}
                  {makeClickableTerm("Wide Angle", "Captures more of the scene")}
                  {makeClickableTerm("Telephoto", "Long lens compressing depth")}
                  {makeClickableTerm("Macro Lens", "For extreme close-ups and details")}
                  {makeClickableTerm("Fish-Eye Lens", "Ultra-wide with curved distortion")}
                  {makeClickableTerm("Anamorphic Lens", "Wide cinematic aspect ratio")}
                  {makeClickableTerm("Spherical Lens", "Standard optical projection")}
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Camera Types</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div><strong>Cinema Camera</strong> – Professional film/digital motion</div>
                  <div><strong>DSLR / Mirrorless</strong> – Digital still cameras with video</div>
                  <div><strong>Action Cam</strong> – Compact, wide-angle for dynamic shots</div>
                  <div><strong>FPV Drone</strong> – First-person-view drone camera</div>
                  <div><strong>16mm / 35mm Film</strong> – Classic film stocks with grain</div>
                  <div><strong>IMAX Film</strong> – Large-format for high detail</div>
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Frame Rates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div><strong>24fps</strong> – Standard cinematic; smooth motion blur</div>
                  <div><strong>30fps</strong> – Video-style; sharper motion</div>
                  <div><strong>60fps+</strong> – High frame rate for slow motion</div>
                  <div><strong>Film Grain</strong> – Visible texture from analog film</div>
                </div>
              </section>
            </div>
          )
        }

      case 'lighting':
        return {
          icon: <Sun className="w-6 h-6 text-yellow-500" />,
          title: 'Lighting Reference',
          content: (
            <div className="space-y-6">
              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Light Types</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {makeClickableFullLine("Key Light", "Main light illuminating the subject")}
                  {makeClickableFullLine("Fill Light", "Reduces shadows from key light")}
                  {makeClickableFullLine("Back Light", "From behind; separates subject")}
                  {makeClickableFullLine("Rim Light", "From behind; separates subject")}
                  {makeClickableFullLine("Ambient Light", "Natural or existing light in scene")}
                  {makeClickableFullLine("Practical Light", "Visible sources like lamps/candles")}
                  {makeClickableFullLine("Bounce Light", "Indirect light reflected off surface")}
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Lighting Quality</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {makeClickableFullLine("Hard Light", "Sharp shadows and strong contrast")}
                  {makeClickableFullLine("Soft Light", "Diffused with gentle shadows")}
                  {makeClickableFullLine("High Key Lighting", "Bright, low contrast, cheerful")}
                  {makeClickableFullLine("Low Key Lighting", "Dark, high contrast, dramatic")}
                  {makeClickableFullLine("Silhouette Lighting", "Backlit with dark foreground")}
                  {makeClickableFullLine("Chiaroscuro", "Strong light/shadow contrast")}
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Lighting Direction</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {makeClickableFullLine("Top Light", "Overhead; adds intensity or mystery")}
                  {makeClickableFullLine("Under Light", "From below; unsettling/creepy effect")}
                  {makeClickableFullLine("Cross Lighting", "Opposite sides to sculpt form")}
                  {makeClickableFullLine("Motivated Lighting", "Mimics visible source (window/lamp)")}
                  {makeClickableFullLine("Natural Light", "Sunlight or moonlight, unmodified")}
                  {makeClickableFullLine("Artificial Light", "Controlled sources (LEDs, spots)")}
                </div>
              </section>
            </div>
          )
        }

      case 'mood':
        return {
          icon: <Zap className="w-6 h-6 text-purple-500" />,
          title: 'Film Mood Reference',
          content: (
            <div className="space-y-6">
              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Cinematic Moods</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {makeClickableFullLine("Cinematic", "Polished, immersive, visually dramatic")}
                  {makeClickableFullLine("Documentary", "Realistic, handheld, observational")}
                  {makeClickableFullLine("Noir", "Dark, moody, high contrast, moral ambiguity")}
                  {makeClickableFullLine("Dreamlike", "Soft focus, surreal pacing, ethereal")}
                  {makeClickableFullLine("Nostalgic", "Warm tones, film grain, evokes memory")}
                  {makeClickableFullLine("Suspenseful", "Tense pacing and selective lighting")}
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Emotional Moods</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {makeClickableFullLine("Romantic", "Soft light, golden hues, intimate framing")}
                  {makeClickableFullLine("Melancholic", "Muted color, slow pacing, introspective")}
                  {makeClickableFullLine("Gritty", "Rough, handheld, desaturated realism")}
                  {makeClickableFullLine("Whimsical", "Bright, stylized, playful motion")}
                  {makeClickableFullLine("Surreal", "Unnatural lighting/movement; dreamlike logic")}
                  {makeClickableFullLine("Futuristic", "Clean, metallic; cool lighting, precision")}
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Genre Moods</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {makeClickableFullLine("Horror", "High contrast, underlighting, uneasy framing")}
                  {makeClickableFullLine("Comedic", "Bright lighting, wide framing, rhythmic timing")}
                  {makeClickableFullLine("Epic", "Grand scale, sweeping shots, orchestral energy")}
                  {makeClickableFullLine("Minimalist", "Sparse design and clean composition")}
                  {makeClickableFullLine("Intimate", "Close framing, shallow focus, personal")}
                  {makeClickableFullLine("Tranquil", "Slow movement, natural sound, serene light")}
                </div>
              </section>
            </div>
          )
        }

      case 'scene-description':
        return {
          icon: <Film className="w-6 h-6 text-sky-500" />,
          title: 'Scene Description Reference',
          content: (
            <div className="space-y-6">
              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Single Field Prompt Pattern</h3>
                <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-sky-800 font-medium mb-2">Follow this pattern for a single field prompt:</p>
                  <div className="bg-white rounded p-3 border border-sky-300">
                    <code className="text-sm text-gray-800">
                      [SHOT TYPE] + [SUBJECT] + [ACTION] + [STYLE] + [CAMERA MOVEMENT] + [AUDIO CUES]
                    </code>
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700 font-medium mb-2">Example:</p>
                  <div className="bg-white rounded p-3 border border-gray-300">
                    <code className="text-sm text-gray-800">
                      Medium shot, cyberpunk hacker typing frantically, neon reflections on face, blade runner aesthetic, slow push in, Audio: mechanical keyboard clicks, distant sirens
                    </code>
                  </div>
                </div>
              </section>
            </div>
          )
        }

      case 'actions':
        return {
          icon: <Play className="w-6 h-6 text-green-500" />,
          title: 'Cinematic Techniques Reference',
          content: (
            <div className="space-y-6">
              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Focus & Transitions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {makeClickableTerm("Rack Focus", "Shifts focus between subjects")}
                  {makeClickableTerm("Focus Change", "Shifts focus between subjects")}
                  {makeClickableTerm("Match Cut", "Cuts between visually similar compositions")}
                  {makeClickableTerm("Cross Dissolve", "Smooth blend from one shot to another")}
                  {makeClickableTerm("Freeze Frame", "Holds a single frame")}
                  {makeClickableTerm("Split Diopter", "Foreground and background both sharp")}
                  {makeClickableTerm("Montage", "Rapid cuts to show time passing")}
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Motion & Speed</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {makeClickableTerm("Slow Motion", "High FPS for dramatic slowdown")}
                  {makeClickableTerm("Slo-Mo", "High FPS for dramatic slowdown")}
                  {makeClickableTerm("Speed Ramp", "Dynamic shift between slow/normal speed")}
                  {makeClickableTerm("Overcrank", "Frame-rate manipulation for slow motion")}
                  {makeClickableTerm("Undercrank", "Frame-rate manipulation for fast motion")}
                  {makeClickableTerm("Timelapse", "Time-compressed sequences")}
                  {makeClickableTerm("Hyperlapse", "Moving timelapse through space")}
                  {makeClickableTerm("Bullet Time", "Multi-camera array freezes/rotates")}
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Creative Effects</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {makeClickableTerm("Whip Pan", "Fast horizontal blur as transition")}
                  {makeClickableTerm("Crash Zoom", "Aggressive zoom for impact")}
                  {makeClickableTerm("Dutch Angle", "Tilted horizon as stylistic choice")}
                  {makeClickableTerm("Low Shutter", "Slow shutter for motion trails")}
                  {makeClickableTerm("Through Object", "Passes through/behind objects")}
                  {makeClickableTerm("Glam", "Polished, sensual motion emphasizing style")}
                </div>
              </section>
            </div>
          )
        }

      default:
        return null
    }
  }

  const content = getContent()
  if (!content) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-3">
            {content.icon}
            <h2 className="text-lg font-semibold text-gray-900">{content.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {content.content}
        </div>
      </div>
    </div>
  )
}

export default InfoModal
