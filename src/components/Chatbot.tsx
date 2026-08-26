import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WhatsAppChat = () => {
  const phoneNumber = '+353834870106';
  const message = 'Hello! I\'m interested in Nigeria Youths in Ireland. Can you provide more information?';
  
  const openWhatsApp = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button
      onClick={openWhatsApp}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 bg-green-500 hover:bg-green-600 text-white animate-pulse-glow"
      aria-label="Chat on WhatsApp"
      size="icon"
    >
      <MessageCircle className="w-6 h-6" />
    </Button>
  );
};

export default WhatsAppChat;
