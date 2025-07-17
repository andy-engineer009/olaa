'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface InfluencerDetailProps {
  id: string;
  name: string;
  username: string;
  image: string;
  isVerified: boolean;
  location: string;
  category: string;
  followers: number;
  overview: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  posts: Array<{
    id: string;
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
  }>;
  pricing: {
    instagramStory: number;
    instagramPost: number;
    instagramReel: number;
    combo: number;
  };

}

const InfluencerDetail = ({
  id,
  name,
  username,
  image,
  isVerified,
  location,
  category,
  followers,
  overview,
  posts,
  pricing,
  instagramUrl,
  youtubeUrl
}: InfluencerDetailProps) => {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [activeTab, setActiveTab] = useState<'posts' | 'pricing' | 'about'>('posts');
  const [isFollowing, setIsFollowing] = useState(false);
  const router = useRouter();

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

  const handleChat = () => {
    router.push('/chat/1');
    console.log('Opening chat with:', name);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Header */}
      {/* <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-gray-200 px-4 py-3">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold">@{username}</h1>
          <div className="w-8"></div>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="max-w-5xl mx-auto pb-20">
      <div className="relative overflow-hidden shadow-md">
      {/* Back Button */}
      <button   
        onClick={() => router.back()} 
        className="absolute top-4 left-4 z-10 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      {/* Background Banner (Cover Photo) - Optional */}
      <div className="h-[150px] bg-[#000000]"></div>

      {/* Profile Picture + Social Icons */}
      <div className="flex items-start px-6 pb-6 relative">
        {/* Profile Picture (Circular) */}
        <div className="absolute -top-16 left-6 border-4 border-white rounded-full overflow-hidden bg-[#ccc]">
          <img
            src={image}
            alt={name}
            className="w-32 h-32 object-cover"
          />
        </div>

        {/* Social Media Icons (Right Side) */}
        {/* <div className="ml-auto mt-4 flex gap-4">
          {youtubeUrl && (
            <a href={youtubeUrl} target="_blank" rel="noopener noreferrer">
              ii
            </a>
          )}
          {instagramUrl && (
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
            </a>
          )}
        </div> */}
        {/* Featured Tag */}
        <div className="ml-auto mt-4 absolute top-1 right-4">
          <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 rounded-full shadow-md">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            <span className="text-white font-medium text-sm">Featured Profile</span>
          </div>
          {/* <div className="text-center mt-2">
            <a href="/plans" className="text-xs text-gray-600 hover:text-orange-600 transition-colors">
              Boost your profile →
            </a>
          </div> */}
        </div>
      </div>

      {/* Name, Headline, Location, Category */}
      <div className="px-0 pt-8 pb-6">
  {/* Profile Card Container */}
  <div className="bg-white overflow-hidden">
    {/* Gradient Header */}

    {/* Profile Content */}
    <div className="px-6 pt-6">
      {/* Name and Verification */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
            {isVerified && (
              <svg
                className="w-5 h-5 text-blue-500 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <p className="text-gray-500 mt-1">@{username}</p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-3">
          {youtubeUrl && (
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-red-50 rounded-full hover:bg-red-100 transition-colors"
            >
              <svg
                className="w-5 h-5 text-red-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          )}
          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-pink-50 rounded-full hover:bg-pink-100 transition-colors"
            >
              <svg
                className="w-5 h-5 text-pink-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 mt-4 text-gray-600">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span>{location}</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mt-2">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-2xl font-bold ">
            {followers.toLocaleString()}
          </p>
          <p className="text-gray-500 text-sm">Followers</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-2xl font-bold ">
            {category.split(",").length}
          </p>
          <p className="text-gray-500 text-sm">Categories</p>
        </div>
      </div>

      {/* Categories */}
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-500 mb-2">CATEGORIES</h3>
        <div className="flex flex-wrap gap-2">
          {category.split(",").map((cat, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm font-medium"
            >
              {cat.trim()}
            </span>
          ))}
        </div>
      </div>

      {/* Bio */}
      {/* <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-500 mb-2">ABOUT</h3>
        <p className="text-gray-700">{overview}</p>
      </div> */}
    </div>
  </div>
</div>
    </div>
        {/* Tab Navigation */}
        <section className="sticky top-14 z-10 bg-white border-t border-b border-gray-200 mt-4 px-3">
          <div className="flex">
            {[
              { id: 'posts', label: 'Posts', icon: 'grid' },
              { id: 'pricing', label: 'Pricing', icon: 'tag' },
              { id: 'about', label: 'About', icon: 'info' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-3 font-medium text-sm relative flex items-center justify-center gap-1 ${
                  activeTab === tab.id 
                    ? 'text-gray-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gray-900' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {tab.icon === 'grid' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  )}
                  {tab.icon === 'tag' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  )}
                  {tab.icon === 'info' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )}
                </svg>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Tab Content */}
        <section className="px-4 py-6">
          {activeTab === 'posts' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
              <div className="grid grid-cols-3 gap-1">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="aspect-square relative group cursor-pointer"
                    onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
                  >
                    <Image
                      src={post.thumbnail || post.url}
                      alt={`Post by ${name}`}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                    {post.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold mb-4">Collaboration Packages</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: 'Instagram Story', price: pricing.instagramStory, desc: '24-hour visibility', popular: false },
                  { name: 'Instagram Post', price: pricing.instagramPost, desc: 'Permanent feed post', popular: false },
                  { name: 'Instagram Reel', price: pricing.instagramReel, desc: 'Short-form video', popular: false },
                  { name: 'Combo Package', price: pricing.combo, desc: 'Story + Post + Reel', popular: true }
                ].map((package_, index) => (
                  <div
                    key={index}
                    className={`p-5 rounded-xl border ${
                      package_.popular 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    {package_.popular && (
                      <div className="absolute -top-2 right-4 bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Most Popular
                      </div>
                    )}
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{package_.name}</h3>
                        <p className="text-gray-600 text-sm">{package_.desc}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{formatCurrency(package_.price)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">About {name}</h2>
              <div className="bg-gray-50 p-5 rounded-xl">
                <p className="text-gray-800 leading-relaxed">{overview}</p>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-4 z-20">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Price/Post</span>
            <span className="text-lg font-bold text-gray-900">{formatCurrency(pricing.instagramPost)}</span>
          </div>
          
          <button 
            onClick={handleChat}
            className="px-8 py-2.5 bg-[#6f43fe] text-white rounded-lg font-medium hover:bg-[#5a35d4] transition-colors"
          >
            Book Now
          </button>
        </div>
      </nav>
    </div>
  );
};

export default InfluencerDetail;