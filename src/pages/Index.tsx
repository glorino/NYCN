import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Events from '@/components/Events';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppChat from '@/components/Chatbot';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Events />
        <Contact />
      </main>
      <Footer />
      <WhatsAppChat />
    </div>
  );
};

export default Index;
