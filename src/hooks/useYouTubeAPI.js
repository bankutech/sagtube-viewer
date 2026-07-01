const videoCache = new Map();
const playlistCache = new Map();

export async function fetchVideoDetails(videoId, apiKey) {
  if (videoCache.has(videoId)) {
    return videoCache.get(videoId);
  }

  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${apiKey}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`YouTube API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  if (!data.items || data.items.length === 0) {
    throw new Error('Video not found');
  }

  const video = data.items[0];
  const details = {
    id: video.id,
    title: video.snippet.title,
    channel: video.snippet.channelTitle,
    description: video.snippet.description,
    thumb: video.snippet.thumbnails?.medium?.url || video.snippet.thumbnails?.default?.url || '',
    duration: video.contentDetails?.duration || '',
    publishedAt: video.snippet.publishedAt,
  };

  videoCache.set(videoId, details);
  return details;
}

export async function fetchPlaylist(playlistId, apiKey) {
  if (playlistCache.has(playlistId)) {
    return playlistCache.get(playlistId);
  }

  const items = [];
  let pageToken = '';

  do {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,status&maxResults=50&playlistId=${playlistId}&key=${apiKey}${pageToken ? `&pageToken=${pageToken}` : ''}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`YouTube API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    if (data.items) {
      for (const item of data.items) {
        // Filter out private and deleted videos
        const status = item.status?.privacyStatus;
        if (status === 'private' || status === 'privacyStatusUnspecified') continue;

        const title = item.snippet?.title || '';
        if (title === 'Private video' || title === 'Deleted video') continue;

        const videoId = item.snippet?.resourceId?.videoId;
        if (!videoId) continue;

        items.push({
          id: videoId,
          title,
          channel: item.snippet.channelTitle || '',
          thumb:
            item.snippet.thumbnails?.medium?.url ||
            item.snippet.thumbnails?.default?.url ||
            '',
        });
      }
    }

    pageToken = data.nextPageToken || '';
  } while (pageToken);

  playlistCache.set(playlistId, items);
  return items;
}

export default { fetchVideoDetails, fetchPlaylist };
