import React from 'react';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';

interface Props {
  sourceId: string;
  title: string;
  company?: string;
}

export const ShareButtons: React.FC<Props> = ({ sourceId }) => {
  // ✅ Use the SSR share endpoint for OG scraping
  const shareUrl = `https://www.careergistpro.com/share/${sourceId}`;
  const encodedUrl = encodeURIComponent(shareUrl);

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

  return (
    <div className="flex items-center gap-3 mt-2">
      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="text-blue-400 hover:text-blue-600"
      >
        <FaLinkedin size={18} />
      </a>
      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="text-blue-400 hover:text-blue-600"
      >
        <FaFacebook size={18} />
      </a>
    </div>
  );
};
