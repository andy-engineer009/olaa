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
  instagramUrl?: string;
  youtubeUrl?: string;
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
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-gray-200 px-4 py-3">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold">@{username}</h1>
          <div className="w-8"></div> {/* Spacer for balance */}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto pb-20">
        {/* Profile Section */}
        <section className="px-4 py-6">
          <div className="flex items-start gap-6">
            {/* Profile Image */}
            <div className="relative flex-shrink-0">
              <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-white shadow-md bg-black">
                <Image
                  src={imageError ? '/api/placeholder/160/160' : image}
                  alt={name}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              </div>
              {isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1 rounded-full">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold">{name}</h1>
                  <p className="text-gray-600">@{username}</p>
                </div>
                
                <div className="flex gap-3">
                  {/* <button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm ${
                      isFollowing 
                        ? 'bg-gray-100 text-gray-900 border border-gray-300' 
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </button> */}
                  
                  <button
                    onClick={handleChat}
                    className="bg-black text-white px-4 py-2 rounded-lg font-medium text-sm border border-gray-300 hover:bg-gray-50 flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Message</span>
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{location}</span>
                </div>
                <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  <span className="font-medium">{category}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-4 flex items-center gap-6">
                <div className="text-center">
                  <div className="text-lg font-bold">{formatFollowers(followers)}</div>
                  <div className="text-gray-600 text-sm">Followers</div>
                </div>
                
                {/* Social Links */}
                <div className="flex gap-3">
                  {instagramUrl && (
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-sm"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  )}
                  {youtubeUrl && (
                    <a
                      href={youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-sm"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bio */}
        <section className="px-4 py-3 border-t border-gray-200">
          <p className="text-gray-800">{overview}</p>
        </section>

        {/* Tab Navigation */}
        <section className="sticky top-14 z-10 bg-white border-t border-b border-gray-200 mt-4">
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
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 z-20">
        <div className="max-w-5xl mx-auto flex justify-around items-center">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button 
            onClick={handleChat}
            className="p-2 rounded-full bg-gray-900 text-white hover:bg-gray-800"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default InfluencerDetail;