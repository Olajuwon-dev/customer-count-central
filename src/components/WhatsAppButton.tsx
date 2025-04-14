import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phone = "23407031680597"; 
  const message = encodeURIComponent("Hello  (submitted via B.David).");

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button className="flex items-center gap-2" variant="outline">
        <MessageCircle className="w-4 h-4" />
        Chat on WhatsApp
      </Button>
    </a>
  );
};

export default WhatsAppButton;
