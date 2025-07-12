import InfluencerDetail from "@/components/InfulancerDetail";

export default function DetailPage() {
    const detail = {
        id: "1",
        name: "John Doe",
        username: "john_doe",
        image: "https://via.placeholder.com/150",
        isVerified: true,
        location: "New York",
        category: "Fashion",
        followers: 1000,
        overview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        posts: [],
        pricing: {
            instagramStory: 100,
            instagramPost: 200,
            instagramReel: 300,
            combo: 400
        }
    }       
  return <div>
    <InfluencerDetail {...detail} />
  </div>;   
}

