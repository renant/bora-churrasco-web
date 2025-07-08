'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ShareButtonProps {
  shareText: string;
  shareTitle?: string;
}

export default function ShareButton({ shareText, shareTitle = 'Lista de Compras - Bora Churrasco' }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      // Check if the Web Share API is available
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: shareText,
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      // Fallback to clipboard if share fails
      try {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (clipboardError) {
        console.error('Failed to copy to clipboard:', clipboardError);
      }
    }
  };

  return (
    <Button
      onClick={handleShare}
      variant="default"
      className="w-full text-sm md:text-base py-3 bg-red-600 hover:bg-red-700 text-white"
    >
      {copied ? '✓ Copiado!' : '📤 Compartilhar Lista'}
    </Button>
  );
}