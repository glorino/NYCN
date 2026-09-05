import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, RefreshCw, Trophy, Users, TrendingUp, LogOut, Download, Trash2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface NominationResult {
  categoryId: number;
  categoryName: string;
  nomineeName: string;
  voteCount: number;
}

const categoryEmojis: Record<number, string> = {
  1: '🏆', 2: '🌟', 3: '🤝', 4: '🎓', 5: '🎨',
  6: '💼', 7: '🌍', 8: '❤️', 9: '🎤', 10: '🇳🇬🇮🇪',
};

const categoryColors: Record<number, string> = {
  1: 'from-yellow-400 to-orange-500',
  2: 'from-purple-400 to-pink-500',
  3: 'from-green-400 to-emerald-500',
  4: 'from-blue-400 to-indigo-500',
  5: 'from-pink-400 to-rose-500',
  6: 'from-amber-400 to-yellow-500',
  7: 'from-teal-400 to-cyan-500',
  8: 'from-red-400 to-pink-500',
  9: 'from-violet-400 to-purple-500',
  10: 'from-green-500 to-green-600',
};

const VotingDashboard = () => {
  const [nominations, setNominations] = useState<NominationResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchNominations = async () => {
    try {
      const response = await fetch('/api/voting');
      if (response.ok) {
        const data = await response.json();
        setNominations(data);
        setLastRefresh(new Date());
      }
    } catch (error) {
      console.error('Error fetching nominations:', error);
      toast({
        title: "Error",
        description: "Failed to load nominations",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNominations();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchNominations, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const exportToCSV = () => {
    const headers = ['Category', 'Nominee', 'Votes'];
    const rows = nominations.map(n => [n.categoryName, n.nomineeName || 'No nominations', n.voteCount.toString()]);
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nycn-nominations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Exported!",
      description: "Nominations exported to CSV",
    });
  };

  const handleResetAll = async () => {
    if (!window.confirm('Are you sure you want to delete ALL nominations? This cannot be undone!')) {
      return;
    }
    try {
      const response = await fetch('/api/voting', { method: 'DELETE' });
      if (response.ok) {
        toast({
          title: "Reset Complete",
          description: "All nominations have been cleared.",
        });
        fetchNominations();
      } else {
        throw new Error('Failed to reset');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset nominations",
        variant: "destructive",
      });
    }
  };

  const totalVotes = nominations.reduce((sum, n) => sum + n.voteCount, 0);
  const categoriesWithVotes = nominations.filter(n => n.voteCount > 0).length;
  const topNominee = nominations.reduce((top, n) => n.voteCount > (top?.voteCount || 0) ? n : top, nominations[0]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading voting results...</p>
        </div>
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
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:inline">Back to Website</span>
              </Link>
              <div className="h-6 w-px bg-border hidden sm:block" />
              <div>
                <h1 className="font-display text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                  Voting Dashboard
                </h1>
                <p className="text-xs text-muted-foreground">
                  Last updated: {lastRefresh.toLocaleTimeString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchNominations}
                className="hidden sm:inline-flex"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={exportToCSV}
                className="hidden sm:inline-flex"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleResetAll}
                className="hidden sm:inline-flex text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Reset All
              </Button>
              <span className="text-sm text-muted-foreground hidden md:inline">
                Welcome, {user?.username}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 sm:py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-700 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Total Votes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-800">{totalVotes}</div>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-yellow-700 flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Categories Active
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-800">{categoriesWithVotes}/10</div>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-700 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Top Nominee
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-purple-800 truncate">
                {topNominee?.nomineeName || 'N/A'}
              </div>
              <p className="text-xs text-purple-600">{topNominee?.voteCount || 0} votes</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className="bg-green-500 hover:bg-green-600">Live</Badge>
              <p className="text-xs text-blue-600 mt-1">Auto-refresh: 30s</p>
            </CardContent>
          </Card>
        </div>

        {/* Mobile buttons */}
        <div className="flex gap-2 mb-6 sm:hidden">
          <Button variant="outline" size="sm" onClick={fetchNominations} className="flex-1">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={exportToCSV} className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={handleResetAll} className="flex-1 text-red-600 border-red-200">
            <Trash2 className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Results Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {nominations.map((nomination) => (
            <Card 
              key={nomination.categoryId} 
              className={`border-2 overflow-hidden transition-all hover:shadow-lg ${
                nomination.voteCount > 0 ? 'border-green-200' : 'border-gray-200'
              }`}
            >
              <div className={`h-2 bg-gradient-to-r ${categoryColors[nomination.categoryId]}`} />
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{categoryEmojis[nomination.categoryId]}</span>
                    <div>
                      <CardTitle className="text-base font-bold text-foreground">
                        {nomination.categoryName}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Category #{nomination.categoryId}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant={nomination.voteCount > 0 ? "default" : "secondary"}
                    className={`text-lg px-3 py-1 ${
                      nomination.voteCount > 0 
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                        : ''
                    }`}
                  >
                    {nomination.voteCount}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {nomination.nomineeName ? (
                  <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="font-semibold text-foreground">{nomination.nomineeName}</span>
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    No nominations yet
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Voting Link */}
        <div className="mt-8 text-center">
          <Card className="inline-block border-2 border-dashed border-green-300 bg-green-50/50">
            <CardContent className="py-6 px-8">
              <p className="text-muted-foreground mb-3">Share the nomination page:</p>
              <code className="text-sm bg-white px-3 py-1 rounded border font-mono">
                https://nycnie.vercel.app/voting
              </code>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default VotingDashboard;
