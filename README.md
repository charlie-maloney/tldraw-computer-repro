# tldraw-computer-repo

A recreation of the [tldraw computer](https://computer.tldraw.com/home) built with React, TypeScript, and the tldraw SDK. This interactive web application allows users to create visual instruction chains using text nodes and instruction nodes connected by arrows, with OpenAI integration for intelligent processing.

## Demo

![Demo GIF](./assets/Demo.gif)


## Features

- **Visual Node Interface**: Create and connect text nodes and instruction nodes
- **Chain Execution**: Build complex instruction chains that execute sequentially
- **OpenAI Integration**: Leverage ChatGPT API for intelligent text processing and structured responses
- **Real-time Updates**: See results instantly as output nodes are populated with AI-generated content
- **Interactive Canvas**: Built on the tldraw SDK for smooth drawing and editing experience

## How It Works

1. **Add Nodes**: Place text nodes (input data) and instruction nodes (processing commands) on the canvas
2. **Connect with Arrows**: Draw arrows to connect text nodes to instruction nodes, creating data flow. Make sure you have text node that the instruction outputs to
3. **Execute Instructions**: When an instruction node runs, it:
   - Collects all connected text node inputs
   - Combines instruction and input texts into a prompt
   - Sends the prompt to OpenAI's ChatGPT API
   - Receives structured response and injects it into an output text node
4. **Chain Processing**: Execute any instruction in a chain to automatically run all downstream instructions

## Tech Stack

- **Frontend**: Vite + React + TypeScript
- **Drawing Engine**: tldraw SDK
- **AI Integration**: OpenAI SDK
- **Dependencies**: dependency-graph + additional utilities
- **Package Manager**: Yarn

## Prerequisites

- Node.js (v16 or higher)
- Yarn package manager
- OpenAI API key

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/tldraw-computer-repo.git
   cd tldraw-computer-repo
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Add your OpenAI API key to the `.env` file:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Ensure .gitignore is configured**
   
   Verify that `.env` is listed in your `.gitignore` file to protect your API key:
   ```
   .env
   ```

## Usage

1. **Start the development server**
   ```bash
   yarn dev
   ```

2. **Open your browser**
   Navigate to the URL shown in your terminal (typically `http://localhost:5173`)

3. **Start Creating**
   - Add text nodes for your input data
   - Add instruction nodes for processing commands
   - Connect them with arrows to define data flow
   - Click on instruction nodes to execute and see AI-generated results

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint
- `yarn type-check` - Run TypeScript compiler check

## Contributing

We welcome contributions! Please feel free to submit issues and pull requests.

### Collaborators

- **Nicholas Tickle** - [GitHub](https://github.com/nicholastickle)
- **Charlie Maloney** - [GitHub](https://github.com/charlie-maloney)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [tldraw](https://tldraw.dev) for providing the excellent drawing SDK
- [OpenAI](https://openai.com) for the ChatGPT API
- The original [tldraw computer](https://computer.tldraw.com/home) for inspiration


⚠️ **Important**: Never commit your `.env` file or share your OpenAI API key publicly. Always keep your API credentials secure.