import Filters from "@/components/Filters";
import InfluencerGrid from "@/components/InfluencerGrid";

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
            <div className="w-full mt-4">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 flex items-center justify-between flex-wrap">
              <div className="flex items-center space-x-4">
                
                <div className="text-white text-center md:text-left">
                  <h2 className="text-xl font-bold">1+ lakh plus Daily Active Visitors</h2>
                  <p className="text-orange-100 hidden md:block">Join India's fastest growing influencer platform</p>
                </div>
              </div>
              <div className="w-full md:w-auto">
                <button className="mt-4 md:mt-0 bg-white text-orange-500 px-6 py-2 rounded-full font-semibold hover:bg-orange-50 transition-colors w-full md:w-auto">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      <div className="flex p-4 md:p-8 items-start">
          <Filters />
        <div className=" md:pl-9" style={{flex: 1}}>
          <InfluencerGrid influencers={influencers} />
        </div>
      </div>
    </div>
  );
}
