import { useState } from 'react';
import { GEMINI_API_KEY } from '../config';

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

export default function AISummarizer({ videoId }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    if (!videoId || !GEMINI_API_KEY) return;
    setOpen(true);
    setLoading(true);
    setError('');
    setSummary('');

    try {
      const transcriptRes = await fetch(`https://youtube-transcript.ai/transcript/${videoId}.txt`);
      if (!transcriptRes.ok) throw new Error('Transcript API failed');
      const transcriptText = await transcriptRes.text();
      if (!transcriptText || transcriptText.trim() === '' || transcriptText.includes('Not Found')) {
        throw new Error('No transcript found');
      }

      const prompt = `Please provide a highly structured, beautiful, and concise summary of the following video transcript. Use bullet points and bold text for key takeaways. If it's a technical tutorial, highlight the main concepts taught. Keep it under 400 words.\n\nTranscript:\n${transcriptText.substring(0, 15000)}`;

      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        }
      );

      if (!geminiRes.ok) throw new Error('Gemini API failed');
      const geminiData = await geminiRes.json();
      const summaryText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || 'No summary generated.';

      let html = escapeHTML(summaryText);
      html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
      html = html.replace(/## (.*?)(\n|$)/g, '<h3>$1</h3>');
      html = html.replace(/# (.*?)(\n|$)/g, '<h2>$1</h2>');
      html = html.replace(/^- (.*?)$/gm, '<li>$1</li>');
      html = html.replace(/\n/g, '<br>');

      setSummary(html);
    } catch (e) {
      console.error('Summarizer Error:', e);
      if (e.message.includes('transcript')) {
        setError('Could not fetch the transcript for this video. Captions may be disabled.');
      } else {
        setError('An error occurred while generating the summary.');
      }
    }
    setLoading(false);
  };

  return (
    <>
      <button
        className="ai-btn"
        onClick={handleSummarize}
        disabled={loading || !videoId}
        aria-label="Summarize with AI"
      >
        {loading ? 'Thinking...' : 'Summarize ✨'}
      </button>

      {open && (
        <div className="ai-panel">
          <div className="ai-panel-header">
            <h4 className="ai-panel-title">AI Summary</h4>
            <button className="ai-close-btn" onClick={() => setOpen(false)} aria-label="Close">
              &times;
            </button>
          </div>
          <div className="ai-summary-content">
            {loading && (
              <>
                <div className="skeleton skeleton-text" style={{ width: '100%' }} />
                <div className="skeleton skeleton-text" style={{ width: '90%' }} />
                <div className="skeleton skeleton-text" style={{ width: '95%' }} />
                <div className="skeleton skeleton-text short" style={{ width: '60%', marginTop: '1rem' }} />
              </>
            )}
            {error && <p style={{ color: '#ef4444' }}>{error}</p>}
            {summary && <div dangerouslySetInnerHTML={{ __html: summary }} />}
          </div>
        </div>
      )}
    </>
  );
}
