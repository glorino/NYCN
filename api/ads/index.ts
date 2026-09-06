import { kv } from '@vercel/kv';

const ADS_KEY = 'nycn:ads';

interface Ad {
  id: string;
  imageUrl: string;
  linkUrl?: string;
  position: 'sidebar' | 'banner' | 'footer';
  active: boolean;
  createdAt: string;
}

async function getAds(): Promise<Ad[]> {
  try {
    const data = await kv.get<Ad[]>(ADS_KEY);
    if (data) return data;
  } catch (error) {
    console.error('Error reading ads from KV:', error);
  }
  return [];
}

async function saveAds(ads: Ad[]): Promise<void> {
  try {
    await kv.set(ADS_KEY, ads);
  } catch (error) {
    console.error('Error saving ads to KV:', error);
  }
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // GET - Fetch all ads (or active ads only)
  if (req.method === 'GET') {
    try {
      const ads = await getAds();
      const showAll = req.query.all === 'true';
      const filteredAds = showAll ? ads : ads.filter(ad => ad.active);
      return res.status(200).json(filteredAds);
    } catch (error) {
      console.error('Error fetching ads:', error);
      return res.status(500).json({ error: 'Failed to fetch ads' });
    }
  }

  // POST - Create new ad
  if (req.method === 'POST') {
    try {
      let body = req.body;
      if (typeof body === 'string') body = JSON.parse(body);
      
      const { imageUrl, linkUrl, position } = body;
      if (!imageUrl) {
        return res.status(400).json({ error: 'Image URL is required' });
      }

      const ads = await getAds();
      const newAd: Ad = {
        id: Date.now().toString(),
        imageUrl,
        linkUrl: linkUrl || '',
        position: position || 'sidebar',
        active: true,
        createdAt: new Date().toISOString(),
      };
      ads.push(newAd);
      await saveAds(ads);
      return res.status(201).json(newAd);
    } catch (error) {
      console.error('Error creating ad:', error);
      return res.status(500).json({ error: 'Failed to create ad' });
    }
  }

  // PUT - Update ad
  if (req.method === 'PUT') {
    try {
      let body = req.body;
      if (typeof body === 'string') body = JSON.parse(body);
      
      const { id, ...updates } = body;
      if (!id) {
        return res.status(400).json({ error: 'Ad ID is required' });
      }

      const ads = await getAds();
      const index = ads.findIndex(ad => ad.id === id);
      if (index === -1) {
        return res.status(404).json({ error: 'Ad not found' });
      }

      ads[index] = { ...ads[index], ...updates };
      await saveAds(ads);
      return res.status(200).json(ads[index]);
    } catch (error) {
      console.error('Error updating ad:', error);
      return res.status(500).json({ error: 'Failed to update ad' });
    }
  }

  // DELETE - Delete ad
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: 'Ad ID is required' });
      }

      const ads = await getAds();
      const filteredAds = ads.filter(ad => ad.id !== id);
      await saveAds(filteredAds);
      return res.status(200).json({ success: true, message: 'Ad deleted' });
    } catch (error) {
      console.error('Error deleting ad:', error);
      return res.status(500).json({ error: 'Failed to delete ad' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
