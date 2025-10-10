# Sora Video Prompt Generator

A simple web application for generating structured prompts for OpenAI's Sora video generation model. This tool helps you create well-formatted prompts by organizing your input into the key sections that Sora responds to best.

## Features

- **Scene Description** - Describe characters, costumes, scenery, and setting details
- **Cinematography Controls** - Specify camera shots, lens types, lighting, and mood
- **Action Planning** - Add multiple specific actions with dynamic add/remove functionality
- **Audio & Dialogue** - Include background sounds and character dialogue
- **Real-time Preview** - See your generated prompt update as you type
- **One-click Copy** - Copy the formatted prompt to your clipboard
- **Clean UI** - Modern, responsive design with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sora
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Usage

1. **Fill in the form fields** on the left side with your video details
2. **Watch the prompt generate** in real-time on the right side
3. **Copy the prompt** using the blue "Copy" button
4. **Use the prompt** with OpenAI's Sora API or interface

### Prompt Structure

The generator creates prompts following the official Sora 2 prompting guide structure:

```
[Scene description]

Cinematography:
Camera shot: [your camera details]
Camera lens: [lens specifications]
Lighting: [lighting description]
Mood: [overall tone]

Actions:
- [Action 1]
- [Action 2]
- [Action 3]

Audio:
[Background sounds and music]

Dialogue:
[Character dialogue]
```

## Based On

This tool is based on the official [Sora 2 Prompting Guide](https://cookbook.openai.com/examples/sora/sora2_prompting_guide) from OpenAI's cookbook, which provides best practices for crafting effective video prompts.

## Tech Stack

- **React** - Frontend framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).
