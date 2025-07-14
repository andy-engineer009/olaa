'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './css/inluancerCard.module.css';

interface InfluencerCardProps {
  id: string;
  name: string;
  image: string;
  isVerified: boolean;
  location: string;
  category: string;
  followers: number;
  startingPrice: number;
  instagramUrl?: string;
  youtubeUrl?: string;
  isFeatured?: boolean;
//   onViewDetails: (id: string) => void;
}

const InfluencerCard = ({
  id,
  name,
  image,
  isVerified,
  location,
  category,
  followers,
  startingPrice,
  instagramUrl,
  youtubeUrl,
  isFeatured,
//   onViewDetails
}: InfluencerCardProps) => {
  const [imageError, setImageError] = useState(false);

  const formatFollowers = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const formatCurrency = (amount: number): string => {
    return `₹${amount.toLocaleString()}`;
  };

  const router = useRouter();

  return (
<div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 relative">
  {/* Smaller Featured Badge */}
  {isFeatured && (
    <div className="absolute top-2 left-2 bg-yellow-400 text-black text-[10px] font-medium px-2 py-0.5 rounded shadow-sm z-10">
      FEATURED
    </div>
  )}

  {/* Profile Image */}
  <div className="relative overflow-hidden aspect-square">
    <Image
      src={imageError ? '/api/placeholder/400/200' : image}
      alt={name}
      width={400}
      height={400}
      className="w-full h-full object-cover"
      onError={() => setImageError(true)}
    />
    
    {/* Verified Badge */}
    {isVerified && (
      <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full shadow-sm">
        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
    )}

    {/* Social Media Icons */}
    <div className="absolute bottom-2 right-2 flex gap-2">
      {instagramUrl && (
        <a 
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-1 rounded-full shadow-sm hover:scale-110 transition-transform"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C14.717 2 15.056 2.01 16.122 2.06C17.187 2.11 17.912 2.277 18.55 2.525C19.21 2.779 19.766 3.123 20.322 3.678C20.8305 4.1779 21.224 4.78259 21.475 5.45C21.722 6.087 21.89 6.813 21.94 7.878C21.987 8.944 22 9.283 22 12C22 14.717 21.99 15.056 21.94 16.122C21.89 17.187 21.722 17.912 21.475 18.55C21.2247 19.2178 20.8311 19.8226 20.322 20.322C19.822 20.8303 19.2173 21.2238 18.55 21.475C17.913 21.722 17.187 21.89 16.122 21.94C15.056 21.987 14.717 22 12 22C9.283 22 8.944 21.99 7.878 21.94C6.813 21.89 6.088 21.722 5.45 21.475C4.78233 21.2245 4.17753 20.8309 3.678 20.322C3.16941 19.8222 2.77593 19.2175 2.525 18.55C2.277 17.913 2.11 17.187 2.06 16.122C2.013 15.056 2 14.717 2 12C2 9.283 2.01 8.944 2.06 7.878C2.11 6.812 2.277 6.088 2.525 5.45C2.77524 4.78218 3.1688 4.17732 3.678 3.678C4.17767 3.16923 4.78243 2.77573 5.45 2.525C6.088 2.277 6.812 2.11 7.878 2.06C8.944 2.013 9.283 2 12 2Z" stroke="#E4405F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#E4405F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      )}
      
      {youtubeUrl && (
        <a 
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-1 rounded-full shadow-sm hover:scale-110 transition-transform"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.54 6.42C22.4212 5.94541 22.1793 5.51057 21.8387 5.15941C21.498 4.80824 21.0708 4.55318 20.6 4.42C18.88 4 12 4 12 4C12 4 5.12 4 3.4 4.46C2.92925 4.59318 2.50198 4.84824 2.16135 5.19941C1.82072 5.55057 1.57879 5.98541 1.46 6.46C1.14521 8.20556 0.991235 9.97631 1 11.75C0.988786 13.537 1.14277 15.3213 1.46 17.08C1.59096 17.5398 1.83831 17.9581 2.17814 18.2945C2.51798 18.6308 2.93882 18.8738 3.4 19C5.12 19.46 12 19.46 12 19.46C12 19.46 18.88 19.46 20.6 19C21.0708 18.8668 21.498 18.6118 21.8387 18.2606C22.1793 17.9094 22.4212 17.4746 22.54 17C22.8524 15.2676 23.0063 13.5103 23 11.75C23.0112 9.96295 22.8572 8.1787 22.54 6.42Z" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.75 15.02L15.5 11.75L9.75 8.48001V15.02Z" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      )}
    </div>
  </div>

  {/* Compact Card Content */}
  <div className="p-3">
    {/* Name and Category */}
    <div className="mb-2">
      <h3 className="font-semibold text-gray-900 text-sm truncate">{name}</h3>
      <span className="text-xs text-gray-500">{category}</span>
    </div>

    {/* Minimal Stats */}
    <div className="flex justify-between items-center text-xs mb-3">
      <div className="flex items-center text-gray-600">
        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {formatFollowers(followers)}
      </div>
      <div className="text-orange-600 font-semibold">
        {formatCurrency(startingPrice)}
      </div>
    </div>

    {/* Highlighted CTA Button */}
    <button 
      onClick={() => router.push(`/detail/${id}`)}
      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm shadow-md"
    >
      View Profile
    </button>
  </div>
</div>
  );
};

export default InfluencerCard;
