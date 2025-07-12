import Filters from "@/components/Filters";
import InfluencerGrid from "@/components/InfluencerGrid";

const influencers = [
  {
    id: "1",
    name: "John Doe",
    image: "https://via.placeholder.com/150",
    isVerified: true,
    location: "New York",
    category: "Fashion",
    followers: 1000,
    startingPrice: 1000,
  },
  {
    id: "1",
    name: "Andrii",
    image: "https://via.placeholder.com/150",
    isVerified: true,
    location: "New York",
    category: "Fashion",
    followers: 1000,
    startingPrice: 1000,
  },
  {
    id: "1",
    name: "mak",
    image: "https://via.placeholder.com/150",
    isVerified: true,
    location: "New York",
    category: "Fashion",
    followers: 1000,
    startingPrice: 1000,
  },
  {
    id: "1",
    name: "Sasha",
    image: "https://via.placeholder.com/150",
    isVerified: true,
    location: "New York",
    category: "Fashion",
    followers: 1000,
    startingPrice: 1000,
  },
];

export default function Home() {
  return (
    <div>
      <div className="flex p-4 md:p-8">
        <Filters />
        <InfluencerGrid influencers={influencers} />
      </div>
    </div>
  );
}
