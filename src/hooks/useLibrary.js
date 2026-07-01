import { useState, useEffect } from 'react';

const STORAGE_KEY = 'sagtube_library';
const MAX_ITEMS = 20;

const DEFAULT_LIBRARY = [
  {
    id: crypto.randomUUID?.() || '1',
    title: 'Deeba Kannan',
    type: 'playlist',
    uid: 'PLAeJqLIux2WMSxzieR45QVTftR-FskFJR',
    url: 'https://www.youtube.com/playlist?list=PLAeJqLIux2WMSxzieR45QVTftR-FskFJR',
  },
  {
    id: crypto.randomUUID?.() || '2',
    title: 'Anita R',
    type: 'playlist',
    uid: 'PL6xbXi2C3sePDwyboAcu7l1UYuUT2SWYd',
    url: 'https://www.youtube.com/playlist?list=PL6xbXi2C3sePDwyboAcu7l1UYuUT2SWYd',
  },
  {
    id: crypto.randomUUID?.() || '3',
    title: 'Computer Network',
    type: 'video',
    uid: 'IPvYjXCsTg8',
    url: 'https://www.youtube.com/watch?v=IPvYjXCsTg8',
  },
  {
    id: crypto.randomUUID?.() || '4',
    title: 'Computer Network 2',
    type: 'playlist',
    uid: 'PLBlnK6fEyqRgMCUAG0XRw78UA8qnv6jEx',
    url: 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRgMCUAG0XRw78UA8qnv6jEx',
  },
  {
    id: crypto.randomUUID?.() || '5',
    title: 'Computer Network 3',
    type: 'playlist',
    uid: 'PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_',
    url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_',
  },
  {
    id: crypto.randomUUID?.() || '6',
    title: 'Maths',
    type: 'playlist',
    uid: 'PLU6SqdYcYsfJ27O0dvuMwafS3X8CecqUg',
    url: 'https://www.youtube.com/playlist?list=PLU6SqdYcYsfJ27O0dvuMwafS3X8CecqUg',
  },
  {
    id: crypto.randomUUID?.() || '7',
    title: 'DSA Java',
    type: 'playlist',
    uid: 'PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ',
    url: 'https://www.youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ',
  },
];

function deduplicate(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (seen.has(item.uid)) return false;
    seen.add(item.uid);
    return true;
  });
}

function loadLibrary() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return deduplicate(parsed);
      }
    }
  } catch {
    // Ignore parse errors, fall through to defaults
  }
  return deduplicate(DEFAULT_LIBRARY);
}

function useLibrary() {
  const [library, setLibrary] = useState(loadLibrary);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(library));
  }, [library]);

  const addToLibrary = (url, title, type, uid) => {
    setLibrary((prev) => {
      if (prev.some((item) => item.uid === uid)) return prev;
      if (prev.length >= MAX_ITEMS) return prev;
      const newItem = {
        id: crypto.randomUUID?.() || Date.now().toString(),
        title,
        type,
        uid,
        url,
      };
      return [...prev, newItem];
    });
  };

  const removeFromLibrary = (id) => {
    setLibrary((prev) => prev.filter((item) => item.id !== id));
  };

  return { library, addToLibrary, removeFromLibrary };
}

export default useLibrary;
