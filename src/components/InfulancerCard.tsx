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
