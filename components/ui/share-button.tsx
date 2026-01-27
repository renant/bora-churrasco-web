'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ShareButtonProps {
  shareText: string;
  shareTitle?: string;
}

export default function ShareButton({
  shareText,
  shareTitle = 'Lista de Compras - Bora Churrasco',
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: shareText,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (_error) {
      try {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (clipboardError) {
        console.error('Failed to copy to clipboard:', clipboardError);
      }
    }
  };

  const liveMessage = copied
    ? 'Lista copiada para a area de transferencia'
    : '';

  return (
    <Button
      onClick={handleShare}
      variant="default"
      className="w-full text-sm md:text-base py-3 bg-red-600 hover:bg-red-700 text-white"
    >
      <span className="sr-only" aria-live="polite">
        {liveMessage}
      </span>
      {copied ? '✓ Copiado!' : '📤 Compartilhar Lista'}
    </Button>
  );
}

