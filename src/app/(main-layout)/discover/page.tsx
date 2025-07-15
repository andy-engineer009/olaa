'use client';
import InfluencerGrid from "@/components/InfluencerGrid";
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

export default function Discover() {
  return (
    <>
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

                  <div className="flex mt-8 p-4 md:p-8 items-start">
        <div className=" md:pl-9" style={{flex: 1}}>
          <InfluencerGrid influencers={influencers} />
        </div>
      </div>
    </>
  );
}   