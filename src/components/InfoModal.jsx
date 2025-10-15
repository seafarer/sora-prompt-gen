import React from 'react'
import { X, Camera, Zap, Sun, Film, Play } from 'lucide-react'

const InfoModal = ({ isOpen, onClose, type, onInsertTerm }) => {
  if (!isOpen) return null

  const handleTermClick = (term) => {
    onInsertTerm(term.toLowerCase())
    onClose()
  }

  const makeClickableTerm = (keyword, description, insertValue) => (
    <div 
      key={keyword}
      className="cursor-pointer hover:bg-sky-50 hover:text-sky-800 px-3 py-2 rounded-lg border border-transparent hover:border-sky-200 transition-all"
      onClick={() => handleTermClick(insertValue)}
      title={`Click to insert: "${insertValue}"`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="font-semibold text-sky-700 text-sm mb-1">{keyword}</div>
          <div className="text-gray-600 text-xs leading-relaxed">{description}</div>
        </div>
        <div className="ml-2 text-xs text-gray-400 font-mono bg-gray-100 px-2 py-1 rounded">
          {insertValue}
        </div>
      </div>
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
                <div className="grid grid-cols-1 gap-3">
                  {makeClickableTerm("Wide Shot", "Shows subject in full context with surrounding environment", "wide shot")}
                  {makeClickableTerm("Long Shot", "Full figure visible with significant background space", "long shot")}
                  {makeClickableTerm("Full Shot", "Head-to-toe framing of a person, shows complete figure", "full shot")}
                  {makeClickableTerm("Medium Shot", "Waist-up framing, ideal for dialogue scenes", "medium shot")}
                  {makeClickableTerm("Medium Close-Up", "Shoulders up, intimate but not claustrophobic", "medium close-up")}
                  {makeClickableTerm("Close-Up", "Focuses on face or key object, creates intimacy", "close-up")}
                  {makeClickableTerm("Extreme Close-Up", "Isolates small details like eyes or hands", "extreme close-up")}
                  {makeClickableTerm("Two-Shot", "Two subjects in the same frame, shows relationship", "two-shot")}
                  {makeClickableTerm("Insert Shot", "Detail or object related to the main action", "insert shot")}
                  {makeClickableTerm("Cutaway", "Related detail that cuts away from main action", "cutaway")}
                  {makeClickableTerm("Reaction Shot", "Character's emotional response to events", "reaction shot")}
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Camera Angles</h3>
                <div className="grid grid-cols-1 gap-3">
                  {makeClickableTerm("Eye-Level Shot", "Neutral perspective at subject's eye height, natural viewpoint", "eye-level shot")}
                  {makeClickableTerm("Low Angle Shot", "Camera looks up at subject, conveys power and dominance", "low angle shot")}
                  {makeClickableTerm("High Angle Shot", "Camera looks down at subject, creates vulnerability", "high angle shot")}
                  {makeClickableTerm("Bird's-Eye Shot", "Directly overhead view, detached and omniscient", "bird's-eye shot")}
                  {makeClickableTerm("Overhead Shot", "Straight down perspective, reveals spatial relationships", "overhead shot")}
                  {makeClickableTerm("Dutch Angle Shot", "Tilted horizon creates unease and dynamic energy", "dutch angle shot")}
                  {makeClickableTerm("Over-the-Shoulder Shot", "From behind one subject looking at another, dialogue framing", "over-the-shoulder shot")}
                  {makeClickableTerm("POV Shot", "Shows exactly what a character sees, first-person perspective", "POV shot")}
                  {makeClickableTerm("Fisheye Shot", "Ultra-wide lens with curved distortion for stylized effect", "fisheye shot")}
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Camera Movements</h3>
                <div className="grid grid-cols-1 gap-3">
                  {makeClickableTerm("Dolly In", "Camera physically moves toward subject, creates intimacy", "dolly in")}
                  {makeClickableTerm("Dolly Out", "Camera physically moves away from subject, reveals context", "dolly out")}
                  {makeClickableTerm("Zoom In", "Lens magnification increases, optical effect", "zoom in")}
                  {makeClickableTerm("Zoom Out", "Lens magnification decreases, reveals more space", "zoom out")}
                  {makeClickableTerm("Crane Up", "Large sweeping vertical movement upward, dramatic reveal", "crane up")}
                  {makeClickableTerm("Crane Down", "Large sweeping vertical movement downward, settling motion", "crane down")}
                  {makeClickableTerm("Handheld", "Naturalistic, slightly shaky motion, documentary feel", "handheld")}
                  {makeClickableTerm("Static", "No camera movement, stable and composed", "static")}
                  {makeClickableTerm("Locked-Off", "Completely fixed position, no movement", "locked-off")}
                  {makeClickableTerm("Arc Left", "Camera circles subject to the left, dynamic framing", "arc left")}
                  {makeClickableTerm("Arc Right", "Camera circles subject to the right, dynamic framing", "arc right")}
                  {makeClickableTerm("Whip Pan", "Fast horizontal blur as transition between shots", "whip pan")}
                  {makeClickableTerm("Tracking", "Camera follows subject, reveals new elements", "tracking")}
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
                <div className="grid grid-cols-1 gap-3">
                  {makeClickableTerm("Shallow Depth of Field", "Subject sharp with blurred background, creates focus and intimacy", "shallow depth of field")}
                  {makeClickableTerm("Deep Depth of Field", "Everything in focus, reveals full environment", "deep depth of field")}
                  {makeClickableTerm("Rack Focus", "Focus shifts between subjects during the shot", "rack focus")}
                  {makeClickableTerm("Selective Focus", "Isolates specific element while blurring others", "selective focus")}
                  {makeClickableTerm("Bokeh", "Aesthetic blur quality in out-of-focus areas", "bokeh")}
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Camera Motion Quality</h3>
                <div className="grid grid-cols-1 gap-3">
                  {makeClickableTerm("Smooth Tracking", "Fluid, professional camera movement", "smooth tracking")}
                  {makeClickableTerm("Handheld Motion", "Natural, organic feel with slight camera shake", "handheld motion")}
                  {makeClickableTerm("Steadicam", "Stabilized movement, smooth but mobile", "steadicam")}
                  {makeClickableTerm("Gimbal Movement", "Smooth electronic stabilization, modern look", "gimbal movement")}
                  {makeClickableTerm("Locked Off", "Completely static, no movement", "locked off")}
                  {makeClickableTerm("Subtle Drift", "Slight organic movement, natural breathing", "subtle drift")}
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Frame Rate & Speed</h3>
                <div className="grid grid-cols-1 gap-3">
                  {makeClickableTerm("24fps Cinematic", "Standard film look with natural motion blur", "24fps cinematic")}
                  {makeClickableTerm("60fps Smooth", "High frame rate for clarity and smoothness", "60fps smooth")}
                  {makeClickableTerm("120fps Slow Motion", "Dramatic slow-down for emphasis", "120fps slow motion")}
                  {makeClickableTerm("Overcranked", "Slowed down effect, dreamy quality", "overcranked")}
                  {makeClickableTerm("Undercranked", "Sped up effect, comedic or urgent", "undercranked")}
                  {makeClickableTerm("Variable Speed", "Speed changes within the shot", "variable speed")}
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Camera Properties</h3>
                <div className="grid grid-cols-1 gap-3">
                  {makeClickableTerm("Film Grain", "Organic texture from analog film stock", "film grain")}
                  {makeClickableTerm("Digital Noise", "Video texture from digital sensors", "digital noise")}
                  {makeClickableTerm("Soft Focus", "Diffused, dreamy quality with gentle blur", "soft focus")}
                  {makeClickableTerm("Tack Sharp", "Crystal clear detail, maximum sharpness", "tack sharp")}
                  {makeClickableTerm("Lens Flare", "Light artifacts from bright light sources", "lens flare")}
                  {makeClickableTerm("Chromatic Aberration", "Color fringing effect at edges", "chromatic aberration")}
                  {makeClickableTerm("Vignette", "Darkened edges, draws focus to center", "vignette")}
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
                <div className="grid grid-cols-1 gap-3">
                  {makeClickableTerm("Prime Lens", "Fixed focal length, sharp and fast with wide aperture", "prime lens")}
                  {makeClickableTerm("Zoom Lens", "Variable focal length for flexibility and versatility", "zoom lens")}
                  {makeClickableTerm("Wide Angle", "Captures more of the scene, expansive view", "wide angle")}
                  {makeClickableTerm("Telephoto", "Long lens compressing depth and isolating subjects", "telephoto")}
                  {makeClickableTerm("Macro Lens", "For extreme close-ups and fine details", "macro lens")}
                  {makeClickableTerm("Fish-Eye Lens", "Ultra-wide with curved distortion for stylized effect", "fish-eye lens")}
                  {makeClickableTerm("Anamorphic Lens", "Wide cinematic aspect ratio with oval bokeh", "anamorphic lens")}
                  {makeClickableTerm("Spherical Lens", "Standard optical projection, natural perspective", "spherical lens")}
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Camera Types</h3>
                <div className="grid grid-cols-1 gap-3">
                  {makeClickableTerm("Cinema Camera", "Professional film/digital motion capture", "cinema camera")}
                  {makeClickableTerm("DSLR / Mirrorless", "Digital still cameras with video capability", "DSLR mirrorless")}
                  {makeClickableTerm("Action Cam", "Compact, wide-angle for dynamic shots", "action cam")}
                  {makeClickableTerm("FPV Drone", "First-person-view drone camera", "FPV drone")}
                  {makeClickableTerm("16mm / 35mm Film", "Classic film stocks with organic grain", "16mm 35mm film")}
                  {makeClickableTerm("IMAX Film", "Large-format for high detail and resolution", "IMAX film")}
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Frame Rates</h3>
                <div className="grid grid-cols-1 gap-3">
                  {makeClickableTerm("24fps", "Standard cinematic frame rate with smooth motion blur", "24fps")}
                  {makeClickableTerm("30fps", "Video-style frame rate with sharper motion", "30fps")}
                  {makeClickableTerm("60fps+", "High frame rate for slow motion capture", "60fps+")}
                  {makeClickableTerm("Film Grain", "Visible texture from analog film stock", "film grain")}
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
                <div className="grid grid-cols-1 gap-3">
                  {makeClickableTerm("Key Light", "Main light illuminating the subject, primary source", "key light")}
                  {makeClickableTerm("Fill Light", "Reduces shadows from key light, softens contrast", "fill light")}
                  {makeClickableTerm("Back Light", "From behind subject, creates separation and depth", "back light")}
                  {makeClickableTerm("Rim Light", "From behind subject, creates edge definition", "rim light")}
                  {makeClickableTerm("Ambient Light", "Natural or existing light in the scene", "ambient light")}
                  {makeClickableTerm("Practical Light", "Visible sources like lamps, candles, or fixtures", "practical light")}
                  {makeClickableTerm("Bounce Light", "Indirect light reflected off surfaces", "bounce light")}
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Lighting Quality</h3>
                <div className="grid grid-cols-1 gap-3">
                  {makeClickableTerm("Hard Light", "Sharp shadows and strong contrast, dramatic effect", "hard light")}
                  {makeClickableTerm("Soft Light", "Diffused with gentle shadows, flattering look", "soft light")}
                  {makeClickableTerm("High Key Lighting", "Bright, low contrast, cheerful and optimistic", "high key lighting")}
                  {makeClickableTerm("Low Key Lighting", "Dark, high contrast, dramatic and moody", "low key lighting")}
                  {makeClickableTerm("Silhouette Lighting", "Backlit with dark foreground, mysterious", "silhouette lighting")}
                  {makeClickableTerm("Chiaroscuro", "Strong light/shadow contrast, artistic", "chiaroscuro")}
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Lighting Direction</h3>
                <div className="grid grid-cols-1 gap-3">
                  {makeClickableTerm("Top Light", "Overhead lighting, adds intensity or mystery", "top light")}
                  {makeClickableTerm("Under Light", "From below, unsettling or creepy effect", "under light")}
                  {makeClickableTerm("Cross Lighting", "Opposite sides to sculpt form and dimension", "cross lighting")}
                  {makeClickableTerm("Motivated Lighting", "Mimics visible source like window or lamp", "motivated lighting")}
                  {makeClickableTerm("Natural Light", "Sunlight or moonlight, unmodified", "natural light")}
                  {makeClickableTerm("Artificial Light", "Controlled sources like LEDs or spotlights", "artificial light")}
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
                <div className="grid grid-cols-1 gap-3">
                  {makeClickableTerm("Cinematic", "Polished, immersive, visually dramatic", "cinematic")}
                  {makeClickableTerm("Documentary", "Realistic, handheld, observational", "documentary")}
                  {makeClickableTerm("Noir", "Dark, moody, high contrast, moral ambiguity", "noir")}
                  {makeClickableTerm("Dreamlike", "Soft focus, surreal pacing, ethereal", "dreamlike")}
                  {makeClickableTerm("Nostalgic", "Warm tones, film grain, evokes memory", "nostalgic")}
                  {makeClickableTerm("Suspenseful", "Tense pacing and selective lighting", "suspenseful")}
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Emotional Moods</h3>
                <div className="grid grid-cols-1 gap-3">
                  {makeClickableTerm("Romantic", "Soft light, golden hues, intimate framing", "romantic")}
                  {makeClickableTerm("Melancholic", "Muted color, slow pacing, introspective", "melancholic")}
                  {makeClickableTerm("Gritty", "Rough, handheld, desaturated realism", "gritty")}
                  {makeClickableTerm("Whimsical", "Bright, stylized, playful motion", "whimsical")}
                  {makeClickableTerm("Surreal", "Unnatural lighting/movement, dreamlike logic", "surreal")}
                  {makeClickableTerm("Futuristic", "Clean, metallic, cool lighting, precision", "futuristic")}
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Genre Moods</h3>
                <div className="grid grid-cols-1 gap-3">
                  {makeClickableTerm("Horror", "High contrast, underlighting, uneasy framing", "horror")}
                  {makeClickableTerm("Comedic", "Bright lighting, wide framing, rhythmic timing", "comedic")}
                  {makeClickableTerm("Epic", "Grand scale, sweeping shots, orchestral energy", "epic")}
                  {makeClickableTerm("Minimalist", "Sparse design and clean composition", "minimalist")}
                  {makeClickableTerm("Intimate", "Close framing, shallow focus, personal", "intimate")}
                  {makeClickableTerm("Tranquil", "Slow movement, natural sound, serene light", "tranquil")}
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
                <div className="grid grid-cols-1 gap-3">
                  {makeClickableTerm("Rack Focus", "Shifts focus between subjects during the shot", "rack focus")}
                  {makeClickableTerm("Focus Change", "Shifts focus between subjects during the shot", "focus change")}
                  {makeClickableTerm("Match Cut", "Cuts between visually similar compositions", "match cut")}
                  {makeClickableTerm("Cross Dissolve", "Smooth blend from one shot to another", "cross dissolve")}
                  {makeClickableTerm("Freeze Frame", "Holds a single frame for emphasis", "freeze frame")}
                  {makeClickableTerm("Split Diopter", "Foreground and background both sharp", "split diopter")}
                  {makeClickableTerm("Montage", "Rapid cuts to show time passing", "montage")}
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Motion & Speed</h3>
                <div className="grid grid-cols-1 gap-3">
                  {makeClickableTerm("Slow Motion", "High FPS for dramatic slowdown effect", "slow motion")}
                  {makeClickableTerm("Slo-Mo", "High FPS for dramatic slowdown effect", "slo-mo")}
                  {makeClickableTerm("Speed Ramp", "Dynamic shift between slow and normal speed", "speed ramp")}
                  {makeClickableTerm("Overcrank", "Frame-rate manipulation for slow motion", "overcrank")}
                  {makeClickableTerm("Undercrank", "Frame-rate manipulation for fast motion", "undercrank")}
                  {makeClickableTerm("Timelapse", "Time-compressed sequences showing passage of time", "timelapse")}
                  {makeClickableTerm("Hyperlapse", "Moving timelapse through space", "hyperlapse")}
                  {makeClickableTerm("Bullet Time", "Multi-camera array freezes and rotates", "bullet time")}
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Creative Effects</h3>
                <div className="grid grid-cols-1 gap-3">
                  {makeClickableTerm("Whip Pan", "Fast horizontal blur as transition between shots", "whip pan")}
                  {makeClickableTerm("Crash Zoom", "Aggressive zoom for dramatic impact", "crash zoom")}
                  {makeClickableTerm("Dutch Angle", "Tilted horizon as stylistic choice", "dutch angle")}
                  {makeClickableTerm("Low Shutter", "Slow shutter for motion trails and blur", "slow shutter")}
                  {makeClickableTerm("Through Object", "Passes through or behind objects", "through object")}
                  {makeClickableTerm("Glam", "Polished, sensual motion emphasizing style", "glam")}
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
