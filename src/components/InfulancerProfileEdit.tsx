'use client';

import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';

// Types
interface InfluencerProfile {
  id: string;
  name: string;
  username: string;
  platforms: string[];
  gender: string;
  categories: string[];
  languages: string[];
  verifiedProfile: boolean;
  state: string;
  city: string;
  locality: string;
  influencerAge: number;
  followerCount: number;
  instagramUrl: string;
  youtubeUrl: string;
  audienceType: string;
  audienceAgeGroup: string;
  startingPrice: number;
  igStoryPrice: number;
  igReelPrice: number;
  igPostPrice: number;
  ytShortsPrice: number;
  ytVideoPrice: number;
  profileImage: string;
  postImages: string[];
  videos: string[];
  isListed: boolean;
}

interface FormValues {
  name: string;
  username: string;
  platforms: string[];
  gender: string;
  categories: string[];
  languages: string[];
  verifiedProfile: boolean;
  state: string;
  city: string;
  locality: string;
  influencerAge: number;
  followerCount: number;
  instagramUrl: string;
  youtubeUrl: string;
  audienceType: string;
  audienceAgeGroup: string;
  startingPrice: number;
  igStoryPrice: number;
  igReelPrice: number;
  igPostPrice: number;
  ytShortsPrice: number;
  ytVideoPrice: number;
  profileImage: File | null;
  postImages: File[];
  videos: File[];
}

// Mock data
const platforms = ['Instagram', 'YouTube'];
const genders = ['Male', 'Female', 'Other'];
const categories = ['Fashion & Beauty', 'Technology', 'Fitness & Health', 'Food & Cooking', 'Travel', 'Lifestyle', 'Gaming', 'Education', 'Business', 'Entertainment'];
const languages = ['English', 'Hindi', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Korean'];
const states = ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Telangana', 'Gujarat'];
const cities = {
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane'],
  'Delhi': ['New Delhi', 'Gurgaon', 'Noida', 'Faridabad'],
  'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
  'Telangana': ['Hyderabad', 'Warangal', 'Karimnagar', 'Nizamabad'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot']
};
const localities = {
  'Mumbai': ['Bandra', 'Andheri', 'Dadar', 'Worli'],
  'Pune': ['Koregaon Park', 'Baner', 'Hinjewadi', 'Kharadi'],
  'New Delhi': ['Connaught Place', 'Khan Market', 'Lajpat Nagar', 'Defence Colony'],
  'Bangalore': ['Indiranagar', 'Koramangala', 'Whitefield', 'Electronic City'],
  'Chennai': ['T Nagar', 'Anna Nagar', 'Adyar', 'Mylapore'],
  'Hyderabad': ['Banjara Hills', 'Jubilee Hills', 'Gachibowli', 'Hitech City']
};
const audienceTypes = ['General', 'Niche', 'Specific'];
const audienceAgeGroups = ['13-18', '19-25', '26-35', '36-45', '46-55', '56+'];

// Validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  username: Yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
  platforms: Yup.array().min(1, 'At least one platform is required'),
  gender: Yup.string().required('Gender is required'),
  categories: Yup.array().min(1, 'At least one category is required'),
  languages: Yup.array().min(1, 'At least one language is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  influencerAge: Yup.number().required('Age is required').min(13, 'Must be at least 13 years old').max(100, 'Invalid age'),
  followerCount: Yup.number().required('Follower count is required').min(100, 'Must have at least 100 followers'),
  instagramUrl: Yup.string().when('platforms', {
    is: (platforms: string[]) => platforms.includes('Instagram'),
    then: (schema) => schema.required('Instagram URL is required').url('Must be a valid URL')
  }),
  youtubeUrl: Yup.string().when('platforms', {
    is: (platforms: string[]) => platforms.includes('YouTube'),
    then: (schema) => schema.required('YouTube URL is required').url('Must be a valid URL')
  }),
  audienceType: Yup.string().required('Audience type is required'),
  audienceAgeGroup: Yup.string().required('Audience age group is required'),
  startingPrice: Yup.number().required('Starting price is required').min(0, 'Price must be positive'),
  igStoryPrice: Yup.number().when('platforms', {
    is: (platforms: string[]) => platforms.includes('Instagram'),
    then: (schema) => schema.required('IG Story price is required').min(0, 'Price must be positive')
  }),
  igReelPrice: Yup.number().when('platforms', {
    is: (platforms: string[]) => platforms.includes('Instagram'),
    then: (schema) => schema.required('IG Reel price is required').min(0, 'Price must be positive')
  }),
  igPostPrice: Yup.number().when('platforms', {
    is: (platforms: string[]) => platforms.includes('Instagram'),
    then: (schema) => schema.required('IG Post price is required').min(0, 'Price must be positive')
  }),
  ytShortsPrice: Yup.number().when('platforms', {
    is: (platforms: string[]) => platforms.includes('YouTube'),
    then: (schema) => schema.required('YT Shorts price is required').min(0, 'Price must be positive')
  }),
  ytVideoPrice: Yup.number().when('platforms', {
    is: (platforms: string[]) => platforms.includes('YouTube'),
    then: (schema) => schema.required('YT Video price is required').min(0, 'Price must be positive')
  })
});

// Multi-Select Checkbox Component
const MultiSelectCheckbox = ({ 
  label, 
  options, 
  field, 
  form 
}: {
  label: string;
  options: string[];
  field: any;
  form: any;
}) => {
  const handleChange = (option: string) => {
    const currentValues = form.values[field.name] || [];
    const newValues = currentValues.includes(option)
      ? currentValues.filter((value: string) => value !== option)
      : [...currentValues, option];
    
    form.setFieldValue(field.name, newValues);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => (
          <label key={option} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={(form.values[field.name] || []).includes(option)}
              onChange={() => handleChange(option)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">{option}</span>
          </label>
        ))}
      </div>
      <ErrorMessage name={field.name} component="div" className="text-red-500 text-sm mt-1" />
    </div>
  );
};

// Media Upload Component
const MediaUpload = ({ 
  label, 
  accept, 
  multiple = false, 
  maxFiles = 1, 
  field, 
  form,
  existingFiles = []
}: {
  label: string;
  accept: string;
  multiple?: boolean;
  maxFiles?: number;
  field: any;
  form: any;
  existingFiles?: string[];
}) => {
  const [previews, setPreviews] = useState<string[]>(existingFiles);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    if (files.length > maxFiles) {
      alert(`Maximum ${maxFiles} file(s) allowed`);
      return;
    }

    const maxImageSize = 10 * 1024 * 1024; // 10MB
    const maxVideoSize = 50 * 1024 * 1024; // 50MB
    
    const invalidFiles = files.filter(file => {
      if (accept.includes('image') && file.size > maxImageSize) return true;
      if (accept.includes('video') && file.size > maxVideoSize) return true;
      return false;
    });

    if (invalidFiles.length > 0) {
      alert(`File size too large. Images must be under 10MB and videos under 50MB`);
      return;
    }

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews([...existingFiles, ...newPreviews]);

    if (multiple) {
      form.setFieldValue(field.name, files);
    } else {
      form.setFieldValue(field.name, files[0]);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
          id={field.name}
        />
        <label htmlFor={field.name} className="cursor-pointer">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="mt-2 text-sm text-gray-600">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-500">
            {accept.includes('image') ? 'PNG, JPG, GIF up to 10MB' : 'MP4, MOV up to 50MB'}
          </p>
        </label>
      </div>
      
      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative">
              {accept.includes('image') ? (
                <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
              ) : (
                <video src={preview} className="w-full h-24 object-cover rounded-lg" controls />
              )}
              <button
                type="button"
                onClick={() => {
                  setPreviews(previews.filter((_, i) => i !== index));
                  if (multiple) {
                    const currentFiles = form.values[field.name] || [];
                    form.setFieldValue(field.name, currentFiles.filter((_: any, i: number) => i !== index));
                  } else {
                    form.setFieldValue(field.name, null);
                  }
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Loading Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

// Not Listed Component
const NotListedComponent = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
      <div className="mb-6">
        <Link
          href="/profile"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
              clipRule="evenodd" 
            />
          </svg>
          Back to Profile
        </Link>
      </div>

      <div className="mb-6">
        <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Not Listed as Influencer</h2>
      <p className="text-gray-600 mb-6">
        You haven't listed yourself as an influencer yet. Start your influencer journey by creating your profile!
      </p>

      <Link
        href="/influencer-onboarding"
        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        List as Influencer
      </Link>
    </div>
  </div>
);

// Main Component
export default function InfluencerProfileEdit() {
  const [profile, setProfile] = useState<InfluencerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch profile data on component mount
  useEffect(() => {
    fetchProfileData();
  }, []);

  // Mock API function to fetch profile data
  const fetchProfileData = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - replace with actual API call
      const mockProfile: InfluencerProfile = {
        id: '1',
        name: 'John Doe',
        username: 'johndoe',
        platforms: ['Instagram', 'YouTube'],
        gender: 'Male',
        categories: ['Fashion & Beauty', 'Technology'],
        languages: ['English', 'Hindi'],
        verifiedProfile: true,
        state: 'Maharashtra',
        city: 'Mumbai',
        locality: 'Bandra',
        influencerAge: 25,
        followerCount: 50000,
        instagramUrl: 'https://instagram.com/johndoe',
        youtubeUrl: 'https://youtube.com/@johndoe',
        audienceType: 'General',
        audienceAgeGroup: '19-25',
        startingPrice: 5000,
        igStoryPrice: 2000,
        igReelPrice: 3000,
        igPostPrice: 5000,
        ytShortsPrice: 4000,
        ytVideoPrice: 8000,
        profileImage: '/api/profile-image.jpg',
        postImages: ['/api/post1.jpg', '/api/post2.jpg', '/api/post3.jpg'],
        videos: ['/api/video1.mp4', '/api/video2.mp4'],
        isListed: true // Change this to false to test not listed state
      };

      setProfile(mockProfile);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mock API function to save profile data
  const saveProfileData = async (values: FormValues) => {
    try {
      setSaving(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Saving profile data:', values);
      
      if (profile) {
        setProfile({
          ...profile,
          ...values,
          profileImage: profile.profileImage,
          postImages: profile.postImages,
          videos: profile.videos
        });
      }
      
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error updating profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Convert profile data to form values
  const getInitialValues = (): FormValues => {
    if (!profile) return {
      name: '', username: '', platforms: [], gender: '', categories: [], languages: [],
      verifiedProfile: false, state: '', city: '', locality: '', influencerAge: 0,
      followerCount: 0, instagramUrl: '', youtubeUrl: '', audienceType: '', audienceAgeGroup: '',
      startingPrice: 0, igStoryPrice: 0, igReelPrice: 0, igPostPrice: 0,
      ytShortsPrice: 0, ytVideoPrice: 0, profileImage: null, postImages: [], videos: []
    };

    return {
      name: profile.name,
      username: profile.username,
      platforms: profile.platforms,
      gender: profile.gender,
      categories: profile.categories,
      languages: profile.languages,
      verifiedProfile: profile.verifiedProfile,
      state: profile.state,
      city: profile.city,
      locality: profile.locality,
      influencerAge: profile.influencerAge,
      followerCount: profile.followerCount,
      instagramUrl: profile.instagramUrl,
      youtubeUrl: profile.youtubeUrl,
      audienceType: profile.audienceType,
      audienceAgeGroup: profile.audienceAgeGroup,
      startingPrice: profile.startingPrice,
      igStoryPrice: profile.igStoryPrice,
      igReelPrice: profile.igReelPrice,
      igPostPrice: profile.igPostPrice,
      ytShortsPrice: profile.ytShortsPrice,
      ytVideoPrice: profile.ytVideoPrice,
      profileImage: null,
      postImages: [],
      videos: []
    };
  };

  // Handle form submission
  const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    try {
      await saveProfileData(values);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  // Show loading spinner while fetching data
  if (loading) {
    return <LoadingSpinner />;
  }

  // Show not listed component if user is not listed as influencer
  if (profile && !profile.isListed) {
    return <NotListedComponent />;
  }

  // Show form if user is listed as influencer
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/profile"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
              Back to Profile
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Edit Influencer Profile</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Formik
            initialValues={getInitialValues()}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, setFieldValue, isSubmitting }) => (
              <Form className="space-y-8">
                {/* Basic Information Section */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Basic Information</h2>
                  
                  {/* Name and Username */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your full name"
                      />
                      <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                        Username *
                      </label>
                      <Field
                        type="text"
                        id="username"
                        name="username"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your username"
                      />
                      <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  </div>

                  {/* Platforms */}
                  <Field name="platforms">
                    {({ field, form }: any) => (
                      <MultiSelectCheckbox
                        label="Platforms * (Select one or both)"
                        options={platforms}
                        field={field}
                        form={form}
                      />
                    )}
                  </Field>

                  {/* Platform URLs */}
                  {values.platforms.includes('Instagram') && (
                    <div>
                      <label htmlFor="instagramUrl" className="block text-sm font-medium text-gray-700 mb-2">
                        Instagram Profile URL *
                      </label>
                      <Field
                        type="url"
                        id="instagramUrl"
                        name="instagramUrl"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://instagram.com/yourusername"
                      />
                      <ErrorMessage name="instagramUrl" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  )}

                  {values.platforms.includes('YouTube') && (
                    <div>
                      <label htmlFor="youtubeUrl" className="block text-sm font-medium text-gray-700 mb-2">
                        YouTube Channel URL *
                      </label>
                      <Field
                        type="url"
                        id="youtubeUrl"
                        name="youtubeUrl"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://youtube.com/@yourchannel"
                      />
                      <ErrorMessage name="youtubeUrl" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  )}

                  {/* Age and Followers */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="influencerAge" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Age *
                      </label>
                      <Field
                        type="number"
                        id="influencerAge"
                        name="influencerAge"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your age"
                      />
                      <ErrorMessage name="influencerAge" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label htmlFor="followerCount" className="block text-sm font-medium text-gray-700 mb-2">
                        Total Follower Count *
                      </label>
                      <Field
                        type="number"
                        id="followerCount"
                        name="followerCount"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter total follower count"
                      />
                      <ErrorMessage name="followerCount" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  </div>

                  {/* Gender */}
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                      Gender *
                    </label>
                    <Field
                      as="select"
                      id="gender"
                      name="gender"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Gender</option>
                      {genders.map(gender => (
                        <option key={gender} value={gender}>{gender}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Categories */}
                  <Field name="categories">
                    {({ field, form }: any) => (
                      <MultiSelectCheckbox
                        label="Categories * (Select all that apply)"
                        options={categories}
                        field={field}
                        form={form}
                      />
                    )}
                  </Field>

                  {/* Languages */}
                  <Field name="languages">
                    {({ field, form }: any) => (
                      <MultiSelectCheckbox
                        label="Languages * (Select all that apply)"
                        options={languages}
                        field={field}
                        form={form}
                      />
                    )}
                  </Field>

                  {/* Verified Profile */}
                  <div className="flex items-center space-x-3">
                    <Field
                      type="checkbox"
                      id="verifiedProfile"
                      name="verifiedProfile"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="verifiedProfile" className="text-sm font-medium text-gray-700">
                      Verified Profile
                    </label>
                  </div>

                  {/* Location Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <Field
                        as="select"
                        id="state"
                        name="state"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          setFieldValue('state', e.target.value);
                          setFieldValue('city', '');
                          setFieldValue('locality', '');
                        }}
                      >
                        <option value="">Select State</option>
                        {states.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </Field>
                      <ErrorMessage name="state" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <Field
                        as="select"
                        id="city"
                        name="city"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={!values.state}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          setFieldValue('city', e.target.value);
                          setFieldValue('locality', '');
                        }}
                      >
                        <option value="">Select City</option>
                        {values.state && cities[values.state as keyof typeof cities]?.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </Field>
                      <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label htmlFor="locality" className="block text-sm font-medium text-gray-700 mb-2">
                        Locality (Optional)
                      </label>
                      <Field
                        as="select"
                        id="locality"
                        name="locality"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={!values.city}
                      >
                        <option value="">Select Locality</option>
                        {values.city && localities[values.city as keyof typeof localities]?.map(locality => (
                          <option key={locality} value={locality}>{locality}</option>
                        ))}
                      </Field>
                    </div>
                  </div>

                  {/* Audience Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="audienceType" className="block text-sm font-medium text-gray-700 mb-2">
                        Audience Type *
                      </label>
                      <Field
                        as="select"
                        id="audienceType"
                        name="audienceType"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Audience Type</option>
                        {audienceTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </Field>
                      <ErrorMessage name="audienceType" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label htmlFor="audienceAgeGroup" className="block text-sm font-medium text-gray-700 mb-2">
                        Audience Age Group *
                      </label>
                      <Field
                        as="select"
                        id="audienceAgeGroup"
                        name="audienceAgeGroup"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Age Group</option>
                        {audienceAgeGroups.map(ageGroup => (
                          <option key={ageGroup} value={ageGroup}>{ageGroup}</option>
                        ))}
                      </Field>
                      <ErrorMessage name="audienceAgeGroup" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  </div>
                </div>

                {/* Pricing Information Section */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Pricing Information</h2>
                  
                  {/* Starting Price */}
                  <div>
                    <label htmlFor="startingPrice" className="block text-sm font-medium text-gray-700 mb-2">
                      Starting Price (₹) *
                    </label>
                    <Field
                      type="number"
                      id="startingPrice"
                      name="startingPrice"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter starting price"
                    />
                    <ErrorMessage name="startingPrice" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Instagram Pricing */}
                  {values.platforms.includes('Instagram') && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label htmlFor="igStoryPrice" className="block text-sm font-medium text-gray-700 mb-2">
                          IG Story Price (₹) *
                        </label>
                        <Field
                          type="number"
                          id="igStoryPrice"
                          name="igStoryPrice"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter story price"
                        />
                        <ErrorMessage name="igStoryPrice" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div>
                        <label htmlFor="igReelPrice" className="block text-sm font-medium text-gray-700 mb-2">
                          IG Reel Price (₹) *
                        </label>
                        <Field
                          type="number"
                          id="igReelPrice"
                          name="igReelPrice"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter reel price"
                        />
                        <ErrorMessage name="igReelPrice" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div>
                        <label htmlFor="igPostPrice" className="block text-sm font-medium text-gray-700 mb-2">
                          IG Post Price (₹) *
                        </label>
                        <Field
                          type="number"
                          id="igPostPrice"
                          name="igPostPrice"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter post price"
                        />
                        <ErrorMessage name="igPostPrice" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </div>
                  )}

                  {/* YouTube Pricing */}
                  {values.platforms.includes('YouTube') && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="ytShortsPrice" className="block text-sm font-medium text-gray-700 mb-2">
                          YT Shorts Price (₹) *
                        </label>
                        <Field
                          type="number"
                          id="ytShortsPrice"
                          name="ytShortsPrice"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter shorts price"
                        />
                        <ErrorMessage name="ytShortsPrice" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div>
                        <label htmlFor="ytVideoPrice" className="block text-sm font-medium text-gray-700 mb-2">
                          YT Video Price (₹) *
                        </label>
                        <Field
                          type="number"
                          id="ytVideoPrice"
                          name="ytVideoPrice"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter video price"
                        />
                        <ErrorMessage name="ytVideoPrice" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Media Upload Section */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Media Upload</h2>
                  
                  {/* Profile Image */}
                  <Field name="profileImage">
                    {({ field }: any) => (
                      <MediaUpload
                        label="Profile Image * recommended size 400x400"
                        accept="image/*"
                        field={field}
                        form={{ values, setFieldValue }}
                        existingFiles={profile?.profileImage ? [profile.profileImage] : []}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="profileImage" component="div" className="text-red-500 text-sm mt-1" />

                  {/* Post Images */}
                  <Field name="postImages">
                    {({ field }: any) => (
                      <MediaUpload
                        label="Post Images (3 required) *"
                        accept="image/*"
                        multiple={true}
                        maxFiles={3}
                        field={field}
                        form={{ values, setFieldValue }}
                        existingFiles={profile?.postImages || []}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="postImages" component="div" className="text-red-500 text-sm mt-1" />

                  {/* Videos */}
                  <Field name="videos">
                    {({ field }: any) => (
                      <MediaUpload
                        label="Videos (2 required) *"
                        accept="video/*"
                        multiple={true}
                        maxFiles={2}
                        field={field}
                        form={{ values, setFieldValue }}
                        existingFiles={profile?.videos || []}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="videos" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={isSubmitting || saving}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}