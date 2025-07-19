'use client';

import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Types
interface Offer {
  id: string;
  type: 'single' | 'combo';
  name?: string;
  price: number;
  items: Array<{
    contentType: string;
    quantity: number;
  }>;
}

interface FormValues {
  // Step 1: Basic Info
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
  
  // Step 2: Pricing
  startingPrice: any;
  offers: Offer[];
  
  // Step 3: Media
  profileImage: File | null;
  // postImages: File[];
  // videos: File[];
}

// Mock data for dropdowns
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

// Validation schemas
const step1Schema = Yup.object().shape({
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
  // audienceType: Yup.string().required('Audience type is required'),
  // audienceAgeGroup: Yup.string().required('Audience age group is required')
});

const step2Schema = Yup.object().shape({
  startingPrice: Yup.number().required('Starting price is required').min(0, 'Price must be positive'),
  offers: Yup.array().of(
    Yup.object().shape({
      id: Yup.string().required('Offer ID is required'),
      type: Yup.string().oneOf(['single', 'combo'], 'Offer type must be single or combo').required('Offer type is required'),
      name: Yup.string().required('Offer name is required'),
      price: Yup.number().required('Offer price is required').min(0, 'Price must be positive'),
      items: Yup.array().of(
        Yup.object().shape({
          contentType: Yup.string().required('Content type is required'),
          quantity: Yup.number().required('Quantity is required').min(1, 'Quantity must be at least 1').max(10, 'Maximum 10 items per offer')
        })
      ).min(1, 'At least one item is required for each offer').test(
        'valid-items',
        'Please check the items configuration',
        function(value) {
          if (!Array.isArray(value)) return false;
          return value.every(item => 
            item && 
            typeof item === 'object' && 
            typeof item.contentType === 'string' && 
            typeof item.quantity === 'number'
          );
        }
      )
    })
  ).min(1, 'At least one offer is required').max(6, 'Maximum 6 offers allowed')
});

const step3Schema = Yup.object().shape({
  profileImage: Yup.mixed().required('Profile image is required'),
  // postImages: Yup.array().min(1, 'Please upload at least 1 post images').max(3, 'Maximum 3 post images allowed'),
  // videos: Yup.array().min(0, 'Please upload at least 2 videos').max(2, 'Maximum 2 videos allowed')
});

// Initial values
const initialValues: FormValues = {
  name: '',
  username: '',
  platforms: [],
  gender: '',
  categories: [],
  languages: [],
  verifiedProfile: false,
  state: '',
  city: '',
  locality: '',
  influencerAge: 0,
  followerCount: 0,
  instagramUrl: '',
  youtubeUrl: '',
  startingPrice: '',
  offers: [],
  profileImage: null,
  // postImages: [],
  // videos: [],
  audienceType: '',
  audienceAgeGroup: ''
};

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
  form 
}: {
  label: string;
  accept: string;
  multiple?: boolean;
  maxFiles?: number;
  field: any;
  form: any;
}) => {
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    if (files.length > maxFiles) {
      alert(`Maximum ${maxFiles} file(s) allowed`);
      return;
    }

    // Check file sizes
    const maxImageSize = 10 * 1024 * 1024; // 10MB in bytes
    const maxVideoSize = 50 * 1024 * 1024; // 50MB in bytes
    
    const invalidFiles = files.filter(file => {
      if (accept.includes('image') && file.size > maxImageSize) {
        return true;
      }
      if (accept.includes('video') && file.size > maxVideoSize) {
        return true;
      }
      return false;
    });

    if (invalidFiles.length > 0) {
      alert(`File size too large. Images must be under 10MB and videos under 50MB`);
      return;
    }

    // Create previews
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);

    // Update form values
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
      
      {/* Previews */}
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

// Warning Popup Component
const WarningPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8" fill="red" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Important Notice</h2>
            <p className="text-sm opacity-90">Before you proceed, please read this carefully</p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Public Profile Requirement</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Your social media profiles (Instagram/YouTube) must be <strong>public</strong> to be listed on our platform. Private profiles cannot be verified or displayed to potential clients.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">What We Check</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Profile visibility settings</li>
                  {/* <li>• Content accessibility</li> */}
                  <li>• Follower count verification</li>
                  {/* <li>• Account authenticity</li> */}
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-yellow-800 mb-1">Need to make your profile public?</p>
                  <p className="text-xs text-yellow-700">
                    Go to your social media settings → Privacy → Account Privacy → Turn off "Private Account"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-[#6f43fe] text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              I Understand, Continue
            </button>
            <button
              onClick={() => {
                // You can add navigation to help page or settings guide
                window.open('https://help.instagram.com/116024195217477', '_blank');
              }}
              className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Learn How
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Step Components
const Step1BasicInfo = ({ values, setFieldValue }: { values: FormValues; setFieldValue: (field: string, value: any) => void }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-6"
  >
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>
    
    <div className="space-y-6">
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
      <div>
        <h2 className="block text-sm font-medium text-gray-700 mb-2">is Your profile has tick</h2>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Field
              type="radio"
              id="verifiedProfileYes"
              name="verifiedProfile" 
              value="true"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="verifiedProfileYes" className="text-sm font-medium text-gray-700">
              Yes
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Field
              type="radio"
              id="verifiedProfileNo"
              name="verifiedProfile"
              value="false"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="verifiedProfileNo" className="text-sm font-medium text-gray-700">
              No
            </label>
          </div>
        </div>
        <ErrorMessage name="verifiedProfile" component="div" className="text-red-500 text-sm mt-1" />
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
        <div>
          <label htmlFor="audienceType" className="block text-sm font-medium text-gray-700 mb-2">
            Audience Type (optional)
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
            Audience Age Group (optional)
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
          {/* <ErrorMessage name="audienceAgeGroup" component="div" className="text-red-500 text-sm mt-1" /> */}
        </div>
      </div>
    </div>
  </motion.div>
);

const Step2Pricing = ({ values, setFieldValue }: { values: FormValues; setFieldValue: (field: string, value: any) => void }) => {
  const contentTypes = ['Post', 'Reel', 'Story', 'YouTube Shorts', 'YouTube Video'];
  
  // Ensure offers is always an array
  const safeOffers = Array.isArray(values.offers) ? values.offers : [];
  
  const addNewOffer = () => {
    const newOffer: Offer = {
      id: `offer-${Date.now()}`,
      type: 'single',
      price: 0,
      items: [{ contentType: 'Post', quantity: 1 }]
    };
    setFieldValue('offers', [...safeOffers, newOffer]);
  };

  const removeOffer = (index: number) => {
    const newOffers = safeOffers.filter((_, i) => i !== index);
    setFieldValue('offers', newOffers);
  };

  const addItemToCombo = (offerIndex: number) => {
    const newOffers = [...safeOffers];
    if (newOffers[offerIndex]) {
      if (!Array.isArray(newOffers[offerIndex].items)) {
        newOffers[offerIndex].items = [];
      }
      newOffers[offerIndex].items.push({ contentType: 'Post', quantity: 1 });
      setFieldValue('offers', newOffers);
    }
  };

  const removeItemFromCombo = (offerIndex: number, itemIndex: number) => {
    const newOffers = [...safeOffers];
    if (newOffers[offerIndex] && Array.isArray(newOffers[offerIndex].items)) {
      newOffers[offerIndex].items = newOffers[offerIndex].items.filter((_, i) => i !== itemIndex);
      setFieldValue('offers', newOffers);
    }
  };

  // Helper function to safely render offer items
  const renderOfferItems = (offer: Offer, index: number) => {
    if (!offer || !Array.isArray(offer.items)) {
      return null;
    }

    // Additional safety check for offer structure
    if (typeof offer !== 'object' || offer === null) {
      return null;
    }

    if (offer.type === 'single') {
      if (offer.items.length === 0) {
        return null;
      }
      
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Field
              as="select"
              name={`offers.${index}.items.0.contentType`}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {contentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </Field>
          </div>
          <div>
            <Field
              type="number"
              name={`offers.${index}.items.0.quantity`}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Quantity"
              min="1"
              max="10"
            />
          </div>
        </div>
      );
    }

    if (offer.type === 'combo') {
      return (
        <div className="space-y-3">
          {offer.items.map((item, itemIndex) => {
            // Ensure item is a valid object
            if (!item || typeof item !== 'object') {
              return null;
            }
            
            return (
              <div key={itemIndex} className="flex items-center space-x-3 p-0 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <Field
                    as="select"
                    name={`offers.${index}.items.${itemIndex}.contentType`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {contentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </Field>
                </div>
                <div className="w-24">
                  <Field
                    type="number"
                    name={`offers.${index}.items.${itemIndex}.quantity`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Qty"
                    min="1"
                    max="10"
                  />
                </div>
                {offer.items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItemFromCombo(index, itemIndex)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            );
          })}
          <button
            type="button"
            onClick={() => addItemToCombo(index)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Item
          </button>
        </div>
      );
    }

    return null;
  };

  // Wrap the entire component in error boundary
  try {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6"
      >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Pricing Information</h2>
      
      <div className="space-y-6">
        {/* Starting Price */}
        <div>
          <label htmlFor="startingPrice" className="block text-sm font-medium text-gray-700 mb-2">
            Starting Price (₹) *
          </label>
          <p className="text-sm text-gray-500 mb-3">This is used for public listing preview and is not linked to actual offers.</p>
          <Field
            type="number"
            id="startingPrice"
            name="startingPrice"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter starting price"
          />
          <ErrorMessage name="startingPrice" component="div" className="text-red-500 text-sm mt-1" />
        </div>

                  {/* Offers Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Offers *
              </label>
              <span className="text-sm text-gray-500">
                {safeOffers.length}/6 offers
              </span>
            </div>
            
            {/* Custom error handling for offers */}
            <Field name="offers">
              {({ field, form }: any) => {
                const error = form.errors.offers;
                const touched = form.touched.offers;
                
                if (error && touched) {
                  let errorMessage = '';
                  if (typeof error === 'string') {
                    errorMessage = error;
                  } else if (Array.isArray(error)) {
                    errorMessage = error.filter(e => typeof e === 'string').join(', ');
                  } else if (error && typeof error === 'object') {
                    errorMessage = 'Please check your offers configuration';
                  }
                  
                  return errorMessage ? (
                    <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
                  ) : null;
                }
                return null;
              }}
            </Field>
          
          {safeOffers.length === 0 && (
            <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-500 mb-4">No offers added yet</p>
              <p className="text-sm text-gray-400">Add at least 1 offer to continue</p>
            </div>
          )}

          {/* Offers List */}
          <div className="space-y-4">
            {safeOffers.map((offer, index) => {
              // Ensure offer is a valid object
              if (!offer || typeof offer !== 'object') {
                return null;
              }
              
              return (
                <div key={offer.id || `offer-${index}`} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  {/* Offer Header */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold text-gray-800">Offer {index + 1}</h3>
                      {/* {offer.name && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {offer.name}
                        </span>
                      )} */}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeOffer(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Offer Type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Offer Type *
                      </label>
                      <Field
                        as="select"
                        name={`offers.${index}.type`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="single">Single Item Offer</option>
                        <option value="combo">Combo Offer</option>
                      </Field>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Offer Name * 
                      </label>
                      <Field
                        type="text"
                        name={`offers.${index}.name`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., 🔥 Best Seller"
                      />
                      <ErrorMessage name={`offers.${index}.name`} component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (₹) *
                    </label>
                    <Field
                      type="number"
                      name={`offers.${index}.price`}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter price"
                    />
                    <ErrorMessage name={`offers.${index}.price`} component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Items */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {offer.type === 'single' ? 'Content Type & Quantity' : 'Items Included'} *
                    </label>
                    
                    {renderOfferItems(offer, index)}
                    
                    <Field name={`offers.${index}.items`}>
                    {({ field, form }: any) => {
                      const error = form.errors[`offers.${index}.items`];
                      const touched = form.touched[`offers.${index}.items`];
                      
                      if (error && touched) {
                        // Handle different types of errors
                        let errorMessage = '';
                        if (typeof error === 'string') {
                          errorMessage = error;
                        } else if (Array.isArray(error)) {
                          errorMessage = error.filter(e => typeof e === 'string').join(', ');
                        } else if (error && typeof error === 'object') {
                          // If it's an object, try to extract meaningful error
                          errorMessage = 'Please check the items configuration';
                        }
                        
                        return errorMessage ? (
                          <div className="text-red-500 text-sm mt-1">{errorMessage}</div>
                        ) : null;
                      }
                      return null;
                    }}
                  </Field>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Offer Button */}
          {safeOffers.length < 6 && (
            <button
              type="button"
              onClick={addNewOffer}
              className="mt-4 w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Offer
            </button>
          )}
        </div>
      </div>
    </motion.div>
    );
  } catch (error) {
    console.error('Error in Step2Pricing:', error);
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Pricing Information</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Something went wrong. Please refresh the page and try again.</p>
        </div>
      </div>
    );
  }
};

const Step3MediaUpload = ({ form }: { form: any }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-8"
  >
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Media Upload</h2>
    
    <div className="space-y-8">
      {/* Profile Image */}
      <Field name="profileImage">
        {({ field }: any) => (
          <MediaUpload
            label="Profile Image * recommended size 400x400"
            accept="image/*"
            field={field}
            form={form}
          />
        )}
      </Field>
      <ErrorMessage name="profileImage" component="div" className="text-red-500 text-sm mt-1" />

      {/* Post Images */}
      {/* <Field name="postImages">
        {({ field }: any) => (
          <MediaUpload
            label="Post Images (3 required) *"
            accept="image/*"
            multiple={true}
            maxFiles={3}
            field={field}
            form={form}
          />
        )}
      </Field>
      <ErrorMessage name="postImages" component="div" className="text-red-500 text-sm mt-1" /> */}

      {/* Videos */}
      {/* <Field name="videos">
        {({ field }: any) => (
          <MediaUpload
            label="Videos (2 required) *"
            accept="video/*"
            multiple={true}
            maxFiles={2}
            field={field}
            form={form}
          />
        )}
      </Field>
      <ErrorMessage name="videos" component="div" className="text-red-500 text-sm mt-1" /> */}
    </div>
  </motion.div>
);

export default function InfluencerOnboardingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormValues>(initialValues);
  const [showWarning, setShowWarning] = useState(false);

  // Show warning popup on first visit
  useEffect(() => {
    setShowWarning(true);

    const hasSeenWarning = localStorage.getItem('influencer-warning-seen');
    if (!hasSeenWarning) {
      setShowWarning(true);
    }
  }, []);

  const handleWarningClose = () => {
    setShowWarning(false);
    localStorage.setItem('influencer-warning-seen', 'true');
  };

  const steps = [
    { number: 1, title: 'Basic Info', schema: step1Schema },
    { number: 2, title: 'Pricing', schema: step2Schema },
    { number: 3, title: 'Media Upload', schema: step3Schema }
  ];

  const handleNext = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    try {
      await steps[currentStep - 1].schema.validate(values);
      setFormData(values);
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.error('Validation error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    try {
      await steps[currentStep - 1].schema.validate(values);
      const finalData = { ...formData, ...values };
      console.log('Final form data:', finalData);
      alert('Form submitted successfully! Check console for data.');
    } catch (error) {
      console.error('Validation error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const getCurrentSchema = () => {
    return steps[currentStep - 1].schema;
  };

  return (
    <>
      {/* Warning Popup */}
      <WarningPopup isOpen={showWarning} onClose={handleWarningClose} />

      <div className="max-w-4xl mx-auto px-4 mb-0 pt-3">
        <Link
          href={'/'}
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
          Back to Home
        </Link>
      </div>
    <div className="min-h-screen bg-gray-50 pt-3 pb-8">

      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep > step.number 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : currentStep === step.number 
                    ? 'bg-blue-500 border-blue-500 text-white' 
                    : 'bg-gray-200 border-gray-300 text-gray-500'
                }`}>
                  {currentStep > step.number ? '✓' : step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step.number ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Step {currentStep}: {steps[currentStep - 1].title}</h1>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Formik
            initialValues={formData}
            validationSchema={getCurrentSchema()}
            onSubmit={currentStep === steps.length ? handleSubmit : handleNext}
          >
            {({ values, setFieldValue, isSubmitting }) => (
              <Form>
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <Step1BasicInfo key="step1" values={values} setFieldValue={setFieldValue} />
                  )}
                  {currentStep === 2 && (
                    <Step2Pricing key="step2" values={values} setFieldValue={setFieldValue} />
                  )}
                  {currentStep === 3 && (
                    <Step3MediaUpload key="step3" form={{ values, setFieldValue }} />
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      currentStep === 1
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-500 text-white hover:bg-gray-600'
                    }`}
                  >
                    Previous
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
                  >
                    {isSubmitting ? 'Processing...' : currentStep === steps.length ? 'Submit' : 'Next'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
    </>
  );
}
