# SagTube Viewer

SagTube Viewer is a beautifully designed, distraction-free YouTube video and playlist viewer built with React and Vite. It provides an immersive theater mode experience, stripping away the noise of the standard YouTube interface so you can focus entirely on your content.

## 🚀 Live Demo

[https://sagtube-react.vercel.app](https://sagtube-react.vercel.app)

## ✨ Features

- **Distraction-Free Theater**: Watch videos and playlists in a clean, edge-to-edge player.
- **Smart Parsing**: Paste any YouTube video URL, playlist URL, or `youtu.be` link—SagTube automatically extracts what you need.
- **Playlist Drawer**: Browse through entire playlists in a sleek, scrollable drawer that automatically highlights the active video.
- **Saved Library**: Easily save your favorite videos and playlists to your local library for quick access later.
- **AI Summarization**: Leverage Gemini AI to instantly generate high-quality, structured summaries of any video you're watching (requires API key).
- **Dark & Light Mode**: Flawless monochrome themes that adapt to your environment.
- **Responsive Design**: Pixel-perfect on desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (CSS Variables for dynamic theming)
- **Deployment**: Vercel
- **APIs**: YouTube Data API v3, Google Gemini API

## 💻 Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/bankutech/sagtube-viewer.git
   cd sagtube-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory and add your API keys:
   ```env
   VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Deployment

This project is configured for seamless deployment on Vercel. Ensure you add `VITE_YOUTUBE_API_KEY` and `VITE_GEMINI_API_KEY` to your Vercel Project Environment Variables before deploying.

---
*Built with ❤️ for a distraction-free learning environment.*
