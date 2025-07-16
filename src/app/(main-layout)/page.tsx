'use client';

import Filters from "@/components/Filters";
import InfluencerGrid from "@/components/InfluencerGrid";
import InfluencerCard from "@/components/InfulancerCard";
import SearchAndFilter from "@/components/searchAndFilter";

const influencers = [ 
  {
    id: "1",
    name: "John Doe",
    image: "https://apollo.olx.in/v1/files/1mfuey8oh35o3-IN/image;s=300x600;q=60",
    isVerified: true,
    location: "New York",
    category: "Fashion",
    followers: 1000,
    startingPrice: 1000,
    instagramUrl: "https://www.instagram.com/john_doe",
    youtubeUrl: "https://www.youtube.com/john_doe",
    isFeatured: true,
  },
  {
    id: "1",
    name: "Andrii",
    image: "https://apollo.olx.in/v1/files/1mfuey8oh35o3-IN/image;s=300x600;q=60",
    isVerified: true,
    location: "New York",
    category: "Fashion",
    followers: 1000,
    startingPrice: 1000,
    isFeatured: true,
  },
  {
    id: "1",
    name: "mak",
    image: "https://apollo.olx.in/v1/files/1mfuey8oh35o3-IN/image;s=300x600;q=60",
    isVerified: true,
    location: "New York",
    category: "Fashion",
    followers: 1000,
    startingPrice: 1000,
  },
  {
    id: "1",
    name: "Sasha",
    image: "https://apollo.olx.in/v1/files/1mfuey8oh35o3-IN/image;s=300x600;q=60",
    isVerified: true,
    location: "New York",
    category: "Fashion",
    followers: 1000,
    startingPrice: 1000,
  },
  {
    id: "1",
    name: "Sasha",
    image: "https://apollo.olx.in/v1/files/1mfuey8oh35o3-IN/image;s=300x600;q=60",
    isVerified: true,
    location: "New York",
    category: "Fashion",
    followers: 1000,
    startingPrice: 1000,
  },
  {
    id: "1",
    name: "Sasha",
    image: "https://apollo.olx.in/v1/files/1mfuey8oh35o3-IN/image;s=300x600;q=60",
    isVerified: true,
    location: "New York",
    category: "Fashion",
    followers: 1000,
    startingPrice: 1000,
  },
  {
    id: "1",
    name: "Sasha",
    image: "https://apollo.olx.in/v1/files/1mfuey8oh35o3-IN/image;s=300x600;q=60",
    isVerified: true,
    location: "New York",
    category: "Fashion",
    followers: 1000,
    startingPrice: 1000,
  },
  {
    id: "1",
    name: "Sasha",
    image: "https://apollo.olx.in/v1/files/1mfuey8oh35o3-IN/image;s=300x600;q=60",
    isVerified: true,
    location: "New York",
    category: "Fashion",
    followers: 1000,
    startingPrice: 1000,
  },
  {
    id: "1",
    name: "Sasha",
    image: "https://apollo.olx.in/v1/files/1mfuey8oh35o3-IN/image;s=300x600;q=60",
    isVerified: true,
    location: "New York",
    category: "Fashion",
    followers: 1000,
    startingPrice: 1000,
  },
  // {
  //   id: "1",
  //   name: "Sasha",
  //   image: "https://apollo.olx.in/v1/files/1mfuey8oh35o3-IN/image;s=300x600;q=60",
  //   isVerified: true,
  //   location: "New York",
  //   category: "Fashion",
  //   followers: 1000,
  //   startingPrice: 1000,
  // },
  // {
  //   id: "1",
  //   name: "Sasha",
  //   image: "https://apollo.olx.in/v1/files/1mfuey8oh35o3-IN/image;s=300x600;q=60",
  //   isVerified: true,
  //   location: "New York",
  //   category: "Fashion",
  //   followers: 1000,
  //   startingPrice: 1000,
  // },
  // {
  //   id: "1",
  //   name: "Sasha",
  //   image: "https://apollo.olx.in/v1/files/1mfuey8oh35o3-IN/image;s=300x600;q=60",
  //   isVerified: true,
  //   location: "New York",
  //   category: "Fashion",
  //   followers: 1000,
  //   startingPrice: 1000,
  // },
];

export default function Home() {
  return (
    <div>
            <div className="w-full bg-white p-4">
              <div className="max-w-4xl mx-auto px-4">
                <SearchAndFilter
                  placeholder="Search for influencers, brands, or campaigns..."
                  className="w-full"
                  onSearch={(values) => {         
                    console.log('Search values:', values);
                    // Handle search here
                  }}
                />
              </div>
            </div>

            <div className="w-full pt-[46px] md:mt-4">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-[#6f43fe] rounded-lg shadow-lg p-6 flex items-center justify-between flex-wrap">
              <div className="flex items-center space-x-4">
                
                <div className="text-white text-center md:text-left">
                  <h2 className="text-xl font-bold">1+ lakh plus Daily Active Visitors</h2>
                  <p className="text-orange-100 hidden md:block">Join India's fastest growing influencer platform</p>
                </div>
              </div>
              <div className="w-full md:w-auto">
                <button className="mt-4 md:mt-0 bg-[#d2fc31] text-[#000] px-6 py-2 rounded-full font-semibold hover:bg-orange-50 transition-colors w-full md:w-auto">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* category section */}

      <div className="max-w-4xl mx-auto px-4 mt-7">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Browse by Follower Range</h3>
        <div className="grid grid-cols-5 gap-4">
          <div className="group relative">
            <div className="flex flex-col items-center justify-center p-4 h-16 w-full rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <span className="text-white text-xl font-bold">5k</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-xl transition-opacity"></div>
            </div>
          </div>
          
          <div className="group relative">
            <div className="flex flex-col items-center justify-center p-4 h-16 w-full rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <span className="text-white text-xl font-bold">10k</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-xl transition-opacity"></div>
            </div>
          </div>

          <div className="group relative">
            <div className="flex flex-col items-center justify-center p-4 h-16 w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <span className="text-white text-xl font-bold">20k</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-xl transition-opacity"></div>
            </div>
          </div>

          <div className="group relative">
            <div className="flex flex-col items-center justify-center p-4 h-16 w-full rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <span className="text-white text-xl font-bold">30k</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-xl transition-opacity"></div>
            </div>
          </div>

          <div className="group relative">
            <div className="flex flex-col items-center justify-center p-4 h-16 w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <span className="text-white text-xl font-bold">50k</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-xl transition-opacity"></div>
            </div>
          </div>
        </div>
      </div>

      {/* top featured influencers */}
      <div className="w-full mx-auto mt-7 px-4 md:px-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-md font-semibold text-gray-800">Top Featured Influencers</h3>
          <button className="text-blue-600 hover:text-blue-700 font-[500] text-[14px]">View All</button>
        </div>

        <div className="flex space-x-4 overflow-x-auto pb-4 hide-scrollbar">
          {influencers.slice(0, 10).map((influencer, index) => (
            <div key={index} className="flex-none w-40">
              <InfluencerCard key={index} {...influencer} />
            </div>
          ))}
        </div>
      </div>
      
            {/* Advertisement Section */}
            <div className="w-full mx-auto mt-2 px-4 md:px-8">
              <div className="h-[60px] bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <div className="text-2xl font-bold text-white">Your Ads</div>
              </div>
            </div>
            
            {/* trending influencers */}
            <div className="w-full mx-auto mt-5 px-4 md:px-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-md font-semibold text-gray-800">Trending Influencers</h3>
          <button className="text-blue-600 hover:text-blue-700 font-[500] text-[14px]">View All</button>
        </div>

        <div className="flex space-x-4 overflow-x-auto pb-4 hide-scrollbar">
          {influencers.slice(0, 10).map((influencer, index) => (
            <div key={index} className="flex-none w-40">
              <InfluencerCard key={index} {...influencer} />
            </div>
          ))}
        </div>
      </div>

                  {/* trending influencers */}
          <div className="w-full mx-auto mt-3 px-4 md:px-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-md font-semibold text-gray-800">Near By Influencers</h3>
          <button className="text-blue-600 hover:text-blue-700 font-[500] text-[14px]">View All</button>
        </div>

        <div className="flex space-x-4 overflow-x-auto pb-4 hide-scrollbar">
          {influencers.slice(0, 10).map((influencer, index) => (
            <div key={index} className="flex-none w-40">
              <InfluencerCard key={index} {...influencer} />
            </div>
          ))}
        </div>
      </div>

      {/* <div className="flex mt-4 p-4 md:p-8 items-start">
        <div className=" md:pl-9" style={{flex: 1}}>
          <InfluencerGrid influencers={influencers} />
        </div>
      </div> */}
    </div>
  );
}
