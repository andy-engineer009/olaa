'use client';

import Filters from "@/components/Filters";
import InfluencerGrid from "@/components/InfluencerGrid";
import InfluencerCard from "@/components/InfulancerCard";
import SearchAndFilter from "@/components/searchAndFilter";
import UserRolePopup from "@/components/userRolePopup";

const influencers = [ 
  {
    id:1,
    name: "John Doe",
    image: "https://apollo.olx.in/v1/files/1mfuey8oh35o3-IN/image;s=300x600;q=60",
    isVerified: true,
    location: "New York",
    category: "Fashion",
    followers: 1000,
    startingPrice: 1000,
    instagramUrl: "https://www.instagram.com/john_doe",
    youtubeUrl: "https://www.youtube.com/john_doe", 
    facebookUrl: "https://www.facebook.com/john_doe",
    isFeatured: true,
  },
  {
    id: 2,
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
    id: 3,
    name: "mak",
    image: "https://apollo.olx.in/v1/files/1mfuey8oh35o3-IN/image;s=300x600;q=60",
    isVerified: true,
    location: "New York",
    category: "Fashion",
    followers: 1000,
    startingPrice: 1000,
  },
  {
    id: 4,
    name: "Sasha",
    image: "https://apollo.olx.in/v1/files/1mfuey8oh35o3-IN/image;s=300x600;q=60",
    isVerified: true,
    location: "New York",
    category: "Fashion",
    followers: 1000,
    startingPrice: 1000,
  },
  // {
  //   id: 5,
  //   name: "Sasha",
  //   image: "https://apollo.olx.in/v1/files/1mfuey8oh35o3-IN/image;s=300x600;q=60",
  //   isVerified: true,
  //   location: "New York",
  //   category: "Fashion",
  //   followers: 1000,
  //   startingPrice: 1000,
  // },
  // {
  //   id: 6,
  //   name: "Sasha",
  //   image: "https://apollo.olx.in/v1/files/1mfuey8oh35o3-IN/image;s=300x600;q=60",
  //   isVerified: true,
  //   location: "New York",
  //   category: "Fashion",
  //   followers: 1000,
  //   startingPrice: 1000,
  // },
  // {
  //   id: 7,
  //   name: "Sasha",
  //   image: "https://apollo.olx.in/v1/files/1mfuey8oh35o3-IN/image;s=300x600;q=60",
  //   isVerified: true,
  //   location: "New York",
  //   category: "Fashion",
  //   followers: 1000,
  //   startingPrice: 1000,
  // },
  // {
  //   id: 8,
  //   name: "Sasha",
  //   image: "https://apollo.olx.in/v1/files/1mfuey8oh35o3-IN/image;s=300x600;q=60",
  //   isVerified: true,
  //   location: "New York",
  //   category: "Fashion",
  //   followers: 1000,
  //   startingPrice: 1000,
  // },
  // {
  //   id: 9,
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
      {/* logobar */}
    <div className=" top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 px-4 py-3 flex justify-between items-center h-14 md:hidden">
  <div className="flex items-center">
    <svg className="w-8 h-8 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1-9h-2V6h2v2zm0 4h-2v-2h2v2z"/>
    </svg>
    <span className="ml-2 font-bold text-lg">AppName</span>
  </div>

  <div className="flex items-center space-x-2">
    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">v1.0</span>
    <button className="p-1 rounded-full hover:bg-gray-100">
      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
      </svg>
    </button>
  </div>
</div>


            {/* <div className="w-full bg-white p-4">
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
            </div> */}
              <UserRolePopup />

            <div className="w-full pt-[0px] md:mt-0">
          <div className="max-w-4xl mx-auto px-0">
            <div className="bg-[#6f43fe] shadow-lg px-6 py-10 flex items-center justify-between flex-wrap">
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-6 pb-4 md:pb-0">
          {influencers.slice(0, 10).map((influencer, index) => (
            <div key={index} className="">
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
            
            {/* trending influencers  scrooll bar */}
            {/* <div className="w-full mx-auto mt-5 px-4 md:px-8">
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
      </div> */}

<div className="w-full mx-auto mt-5 px-4 md:px-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-md font-semibold text-gray-800">Trending Influencers</h3>
          <button className="text-blue-600 hover:text-blue-700 font-[500] text-[14px]">View All</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-6 pb-20 md:pb-0">
          {influencers.slice(0, 10).map((influencer, index) => (
            <div key={index} className="">
              <InfluencerCard key={index} {...influencer} />
            </div>
          ))}
        </div>
      </div>


    

  
                  {/* trending influencers */}
          {/* <div className="w-full mx-auto mt-3 px-4 md:px-8">
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
      </div> */}


      {/* <div className="flex mt-4 p-4 md:p-8 items-start">
        <div className=" md:pl-9" style={{flex: 1}}>
          <InfluencerGrid influencers={influencers} />
        </div>
      </div> */}
    </div>
  );
}
