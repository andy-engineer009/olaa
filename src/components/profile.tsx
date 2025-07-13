'use client'
import { useEffect, useState } from 'react';
import InfulancerForm from './InfulancerForm';
import { useRouter } from 'next/navigation';

// Mock API functions (replace with real API calls)
const fetchUserProfile = async () => {
  // Simulate API call
  return {
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Influencer & content creator',
    image: '/profile.jpg',
    // ...other fields as per your form
  };
};

const updateUserProfile = async (data: any) => {
  // Simulate API call
  return { success: true };
};

const deleteProfileImage = async () => {
  // Simulate API call
  return { success: true };
};

const uploadProfileImage = async (file: File) => {
  // Simulate API call
  return { url: '/new-profile.jpg' };
};

const Profile = () => {
  const [initialValues, setInitialValues] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchUserProfile().then((data) => {
      setInitialValues(data);
      setImage(data.image);
      setLoading(false);
    });
  }, []);

  const handleImageDelete = async () => {
    setUpdating(true);
    await deleteProfileImage();
    setImage(null);
    setUpdating(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUpdating(true);
      const res = await uploadProfileImage(e.target.files[0]);
      setImage(res.url);
      setUpdating(false);
    }
  };

  const handleSubmit = async (values: any) => {
    setUpdating(true);
    await updateUserProfile({ ...values, image });
    setUpdating(false);
    alert('Profile updated!');
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-lg mx-auto p-4 pb-24 bg-white min-h-screen">
                <button
          onClick={() => router.push('/')}
          className="self-start mb-4 flex items-center text-gray-600 hover:text-orange-500 transition-colors"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>
      <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">My Profile</h1>
      <div className="flex flex-col items-center mb-6">


        {image ? (
          <div className="relative w-28 h-28 mb-2">
            <img src={image} alt="Profile" className="w-28 h-28 rounded-full object-cover border-2 border-orange-400" />
            <button
              onClick={handleImageDelete}
              disabled={updating}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600 transition"
              title="Delete image"
            >
              ×
            </button>
          </div>
        ) : (
          <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center mb-2 border-2 border-dashed border-orange-300">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
        <label className="block">
          <span className="text-sm text-orange-600 font-medium cursor-pointer">{image ? 'Change' : 'Upload'} Image</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            disabled={updating}
          />
        </label>
      </div>
      <InfulancerForm
        initialValues={{ ...initialValues, image }}
        onSubmit={handleSubmit}
        isEditMode={true}
      />
    </div>
  );
};

export default Profile;
