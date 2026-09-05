import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Send, Sparkles, PartyPopper, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const categories = [
  { id: 1, emoji: '🏆', name: 'Youth Leader of the Year Award', color: 'from-yellow-400 to-orange-500', bg: 'bg-gradient-to-br from-yellow-50 to-orange-50', border: 'border-yellow-300' },
  { id: 2, emoji: '🌟', name: 'Most Outstanding Youth Volunteer Award', color: 'from-purple-400 to-pink-500', bg: 'bg-gradient-to-br from-purple-50 to-pink-50', border: 'border-purple-300' },
  { id: 3, emoji: '🤝', name: 'Community Impact Award', color: 'from-green-400 to-emerald-500', bg: 'bg-gradient-to-br from-green-50 to-emerald-50', border: 'border-green-300' },
  { id: 4, emoji: '🎓', name: 'Academic Excellence Award', color: 'from-blue-400 to-indigo-500', bg: 'bg-gradient-to-br from-blue-50 to-indigo-50', border: 'border-blue-300' },
  { id: 5, emoji: '🎨', name: 'Creative Talent Award', color: 'from-pink-400 to-rose-500', bg: 'bg-gradient-to-br from-pink-50 to-rose-50', border: 'border-pink-300' },
  { id: 6, emoji: '💼', name: 'Young Entrepreneur of the Year Award', color: 'from-amber-400 to-yellow-500', bg: 'bg-gradient-to-br from-amber-50 to-yellow-50', border: 'border-amber-300' },
  { id: 7, emoji: '🌍', name: 'Cultural Ambassador Award', color: 'from-teal-400 to-cyan-500', bg: 'bg-gradient-to-br from-teal-50 to-cyan-50', border: 'border-teal-300' },
  { id: 8, emoji: '❤️', name: 'Humanitarian & Service Award', color: 'from-red-400 to-pink-500', bg: 'bg-gradient-to-br from-red-50 to-pink-50', border: 'border-red-300' },
  { id: 9, emoji: '🎤', name: 'Entertainer of the Year Award', color: 'from-violet-400 to-purple-500', bg: 'bg-gradient-to-br from-violet-50 to-purple-50', border: 'border-violet-300' },
  { id: 10, emoji: '🇳🇬🇮🇪', name: 'Most Active Member of NYCN Ireland Award', color: 'from-green-500 to-green-600', bg: 'bg-gradient-to-br from-green-50 to-green-100', border: 'border-green-400' },
];

const VotingPage = () => {
  const [nominations, setNominations] = useState<Record<number, string>>({});
  const [voterName, setVoterName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNominationChange = (categoryId: number, value: string) => {
    setNominations(prev => ({ ...prev, [categoryId]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const filledNominations = Object.entries(nominations).filter(([, name]) => name.trim() !== '');
    
    if (filledNominations.length === 0) {
      toast({
        title: "No nominations entered",
        description: "Please enter at least one nominee name before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Generate browser fingerprint
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      ctx?.fillText('fingerprint', 0, 0);
      const canvasData = canvas.toDataURL();
      
      const fingerprintData = {
        screen: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language,
        platform: navigator.platform,
        canvas: canvasData.slice(-50),
      };
      const fingerprint = btoa(JSON.stringify(fingerprintData));

      const response = await fetch('/api/voting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nominations: filledNominations.map(([categoryId, nomineeName]) => ({
            categoryId: parseInt(categoryId),
            nomineeName,
          })),
          voterName: voterName.trim() || undefined,
          fingerprint,
        }),
      });

      const data = await response.json();

      if (response.status === 409) {
        toast({
          title: "Already Voted",
          description: "You have already submitted a nomination. Please try again tomorrow.",
          variant: "destructive",
        });
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit nominations');
      }
      
      setSubmitted(true);
      
      toast({
        title: "Nominations submitted! 🎉",
        description: `You've submitted ${filledNominations.length} nomination(s). Thank you!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit nominations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 flex items-center justify-center px-4">
        <div className="text-center max-w-lg animate-scale-in">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg animate-float">
            <PartyPopper className="w-12 h-12 text-white" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Thank You! 🎉
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Your nominations have been submitted successfully. You're helping shine a light on someone making a difference!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => { setSubmitted(false); setNominations({}); }}
              className="border-green-300 hover:bg-green-50"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Submit More
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white py-16 sm:py-24">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse" />
          {/* Confetti dots */}
          <div className="absolute top-20 left-1/4 w-3 h-3 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-32 right-1/3 w-2 h-2 bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-24 left-1/3 w-4 h-4 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-40 right-1/4 w-3 h-3 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: '0.7s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-center mb-6">
            <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
          
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6 animate-slide-up">
              <Trophy className="w-4 h-4" />
              NYCN Ireland Youth Festival
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up stagger-1">
              Award Nominations 🏆
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-8 animate-slide-up stagger-2">
              Do you know a young Nigerian in Ireland who deserves to be recognised for their outstanding contribution, leadership, talent, service, or impact? 
              <span className="block mt-2 font-semibold text-yellow-300">Nominate your preferred nominee today!</span>
            </p>

            <div className="flex flex-wrap justify-center gap-3 animate-slide-up stagger-3">
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm">#NYCNIreland</span>
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm">#YouthExcellence</span>
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm">#AwardNominations</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 sm:py-16">
        <form onSubmit={handleSubmit}>
          {/* Voter Name */}
          <div className="max-w-md mx-auto mb-8 animate-slide-up">
            <label className="block text-sm font-medium text-foreground mb-2">
              Your Name (Optional)
            </label>
            <Input
              type="text"
              placeholder="Enter your name..."
              value={voterName}
              onChange={(e) => setVoterName(e.target.value)}
              className="w-full bg-white/80 backdrop-blur-sm border-2 border-green-200 focus:border-green-400 focus:ring-green-400 text-foreground placeholder:text-muted-foreground/60 rounded-xl h-12"
            />
          </div>

          {/* Categories Grid */}
          <div className="max-w-5xl mx-auto mb-6">
            <p className="text-center text-muted-foreground text-sm">
              Fill in only the categories you want to nominate for. All fields are optional.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {categories.map((category, index) => (
              <div 
                key={category.id}
                className={`relative rounded-2xl border-2 ${category.border} ${category.bg} p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] animate-scale-in`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Category Number Badge */}
                <div className={`absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                  {category.id}
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <span className="text-4xl">{category.emoji}</span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground">
                      {category.name}
                    </h3>
                  </div>
                </div>

                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Optional - skip if not nominating"
                    value={nominations[category.id] || ''}
                    onChange={(e) => handleNominationChange(category.id, e.target.value)}
                    className="w-full bg-white/80 backdrop-blur-sm border-2 border-white/50 focus:border-green-400 focus:ring-green-400 text-foreground placeholder:text-muted-foreground/60 rounded-xl h-12"
                  />
                  {nominations[category.id] && (
                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="text-center mt-12 animate-slide-up stagger-5">
            <Button 
              type="submit" 
              size="lg"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800 text-white px-12 py-6 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-3" />
                  Submit Nominations
                </>
              )}
            </Button>
            
            <p className="mt-4 text-sm text-muted-foreground">
              ✨ Your nomination could help shine a light on someone making a difference!
            </p>
          </div>
        </form>
      </main>

      {/* Footer Banner */}
      <section className="bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white font-display text-xl md:text-2xl font-bold">
            🇳🇬 Irish Youth Festival Awards 🇮🇪
          </p>
          <p className="text-white/80 mt-2">
            Celebrating Nigerian Youth Excellence in Ireland
          </p>
        </div>
      </section>
    </div>
  );
};

export default VotingPage;
