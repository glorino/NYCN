import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Trash2, Eye, EyeOff, Image, LogOut, ExternalLink } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Ad {
  id: string;
  imageUrl: string;
  linkUrl?: string;
  position: 'sidebar' | 'banner' | 'footer';
  active: boolean;
  createdAt: string;
}

const AdManager = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ imageUrl: '', linkUrl: '', position: 'sidebar' as const });
  const [uploading, setUploading] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchAds = async () => {
    try {
      const response = await fetch('/api/ads?all=true');
      if (response.ok) {
        const data = await response.json();
        setAds(data);
      }
    } catch (error) {
      console.error('Error fetching ads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formDataObj = new FormData();
    formDataObj.append('file', file);
    formDataObj.append('upload_preset', 'nycn_uploads');
    formDataObj.append('folder', 'adverts');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/demo/image/upload', {
        method: 'POST',
        body: formDataObj,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData(prev => ({ ...prev, imageUrl: data.secure_url }));
        toast({ title: "Image uploaded!", description: "Image URL has been set." });
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      toast({ title: "Upload failed", description: "Please paste an image URL instead.", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleAddAd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      toast({ title: "Error", description: "Image URL is required", variant: "destructive" });
      return;
    }

    try {
      const response = await fetch('/api/ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({ title: "Ad created!", description: "New advertisement has been added." });
        setFormData({ imageUrl: '', linkUrl: '', position: 'sidebar' });
        setShowForm(false);
        fetchAds();
      } else {
        throw new Error('Failed to create ad');
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to create advertisement", variant: "destructive" });
    }
  };

  const handleToggleAd = async (ad: Ad) => {
    try {
      await fetch('/api/ads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: ad.id, active: !ad.active }),
      });
      fetchAds();
      toast({ title: ad.active ? "Ad deactivated" : "Ad activated" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to update ad", variant: "destructive" });
    }
  };

  const handleDeleteAd = async (id: string) => {
    if (!window.confirm('Delete this advertisement?')) return;
    try {
      await fetch(`/api/ads?id=${id}`, { method: 'DELETE' });
      toast({ title: "Ad deleted" });
      fetchAds();
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete ad", variant: "destructive" });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:inline">Back</span>
              </Link>
              <div className="h-6 w-px bg-border hidden sm:block" />
              <h1 className="font-display text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
                <Image className="w-6 h-6 text-primary" />
                Ad Manager
              </h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Button size="sm" onClick={() => setShowForm(!showForm)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Ad
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 sm:py-8">
        {/* Add Ad Form */}
        {showForm && (
          <Card className="mb-6 border-2 border-primary/20">
            <CardHeader>
              <CardTitle>Add New Advertisement</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddAd} className="space-y-4">
                <div>
                  <Label htmlFor="imageUrl">Image URL *</Label>
                  <Input
                    id="imageUrl"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Paste a direct link to the image (recommended: 300x250px)</p>
                </div>
                
                <div>
                  <Label htmlFor="linkUrl">Link URL (optional)</Label>
                  <Input
                    id="linkUrl"
                    type="url"
                    placeholder="https://example.com"
                    value={formData.linkUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, linkUrl: e.target.value }))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="position">Position</Label>
                  <select
                    id="position"
                    value={formData.position}
                    onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value as any }))}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="sidebar">Sidebar</option>
                    <option value="banner">Banner</option>
                    <option value="footer">Footer</option>
                  </select>
                </div>

                {formData.imageUrl && (
                  <div className="border rounded-lg p-2">
                    <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                    <img src={formData.imageUrl} alt="Preview" className="max-w-[200px] rounded" />
                  </div>
                )}

                <div className="flex gap-2">
                  <Button type="submit">Save Advertisement</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Ads List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ads.length === 0 ? (
            <Card className="col-span-full text-center py-12">
              <CardContent>
                <Image className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No advertisements yet</p>
                <Button onClick={() => setShowForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Ad
                </Button>
              </CardContent>
            </Card>
          ) : (
            ads.map((ad) => (
              <Card key={ad.id} className={`overflow-hidden ${!ad.active ? 'opacity-60' : ''}`}>
                <div className="aspect-video bg-muted relative">
                  <img src={ad.imageUrl} alt="Advertisement" className="w-full h-full object-cover" />
                  <Badge 
                    variant={ad.active ? "default" : "secondary"}
                    className="absolute top-2 right-2"
                  >
                    {ad.active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{ad.position}</Badge>
                    <div className="flex gap-1">
                      {ad.linkUrl && (
                        <a href={ad.linkUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </a>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleToggleAd(ad)}
                      >
                        {ad.active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteAd(ad.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default AdManager;
