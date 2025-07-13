'use client';

import { useState, useEffect } from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';

interface FilterValues {
  location: string;
  budgetMin: number;
  budgetMax: number;
  gender: string;
  followersMin: number;
  followersMax: number;
  categories: string[];
}

const initialValues: FilterValues = {
  location: '',
  budgetMin: 0,
  budgetMax: 10000,
  gender: '',
  followersMin: 0,
  followersMax: 1000000,
  categories: [],
};

const categories = [
  'Fashion & Beauty', 'Technology', 'Fitness & Health', 'Food & Cooking',
  'Travel', 'Lifestyle', 'Gaming', 'Education', 'Business', 'Entertainment'
];

const Filters = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<FilterValues | null>(null);

  // Prevent body scroll when mobile filter is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileOpen]);

  const handleApplyFilters = (values: FilterValues) => {
    setAppliedFilters(values);
    setIsMobileOpen(false);
    console.log('Applied filters:', values);
  };

  const handleClearFilters = (resetForm: () => void) => {
    resetForm();
    setAppliedFilters(null);
  };

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString()}`;
  };

  const formatFollowers = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  const DualRangeSlider = ({ 
    min, 
    max, 
    step, 
    minValue, 
    maxValue, 
    onMinChange, 
    onMaxChange, 
    formatValue 
  }: {
    min: number;
    max: number;
    step: number;
    minValue: number;
    maxValue: number;
    onMinChange: (value: number) => void;
    onMaxChange: (value: number) => void;
    formatValue: (value: number) => string;
  }) => {
    const minPercent = ((minValue - min) / (max - min)) * 100;
    const maxPercent = ((maxValue - min) / (max - min)) * 100;

    return (
      <div className="relative">
        <div className="relative h-2 bg-gray-200 rounded-lg">
          <div 
            className="absolute h-2 bg-orange-500 rounded-lg"
            style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={minValue}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value <= maxValue) {
                onMinChange(value);
              }
            }}
            className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
            style={{ zIndex: 2 }}
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={maxValue}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value >= minValue) {
                onMaxChange(value);
              }
            }}
            className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
            style={{ zIndex: 2 }}
          />
        </div>
        <div className="flex justify-between text-sm font-medium text-gray-900 mt-2">
          <span>{formatValue(minValue)}</span>
          <span>{formatValue(maxValue)}</span>
        </div>
      </div>
    );
  };

  const FilterForm = ({ resetForm }: { resetForm: () => void }) => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-gray-200 bg-white">
        <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
        <button
          onClick={() => setIsMobileOpen(false)}
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="h-[calc(100vh-225px)]  overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <Field
              as="select"
              id="location"
              name="location"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black bg-white transition-colors"
            >
              <option value="">Select Location</option>
              <option value="new-york">New York</option>
              <option value="los-angeles">Los Angeles</option>
              <option value="chicago">Chicago</option>
              <option value="mumbai">Mumbai</option>
              <option value="delhi">Delhi</option>
              <option value="bangalore">Bangalore</option>
            </Field>
          </div>

          {/* Budget Amount Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget Amount (₹)
            </label>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{formatCurrency(0)}</span>
                <span>{formatCurrency(10000)}</span>
              </div>
              <Field name="budgetMin">
                {({ field, form }: any) => (
                  <Field name="budgetMax">
                    {({ field: fieldMax }: any) => (
                      <DualRangeSlider
                        min={0}
                        max={10000}
                        step={100}
                        minValue={field.value}
                        maxValue={fieldMax.value}
                        onMinChange={(value) => form.setFieldValue('budgetMin', value)}
                        onMaxChange={(value) => form.setFieldValue('budgetMax', value)}
                        formatValue={formatCurrency}
                      />
                    )}
                  </Field>
                )}
              </Field>
            </div>
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <Field
              as="select"
              id="gender"
              name="gender"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black bg-white transition-colors"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Field>
          </div>

          {/* Follower Count Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Follower Count
            </label>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>0</span>
                <span>1M</span>
              </div>
              <Field name="followersMin">
                {({ field, form }: any) => (
                  <Field name="followersMax">
                    {({ field: fieldMax }: any) => (
                      <DualRangeSlider
                        min={0}
                        max={1000000}
                        step={1000}
                        minValue={field.value}
                        maxValue={fieldMax.value}
                        onMinChange={(value) => form.setFieldValue('followersMin', value)}
                        onMaxChange={(value) => form.setFieldValue('followersMax', value)}
                        formatValue={formatFollowers}
                      />
                    )}
                  </Field>
                )}
              </Field>
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Categories
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <Field
                    type="checkbox"
                    name="categories"
                    value={category}
                    className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <span className="ml-3 text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Buttons */}
      <div className="flex-shrink-0 p-6 border-t border-gray-200 bg-white">
        <div className="space-y-3">
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium transition-colors shadow-sm"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={() => handleClearFilters(resetForm)}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Custom CSS for range sliders */}
      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #f97316;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider-thumb::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #f97316;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider-thumb::-webkit-slider-track {
          background: transparent;
          border-radius: 8px;
          height: 8px;
        }
        
        .slider-thumb::-moz-range-track {
          background: transparent;
          border-radius: 8px;
          height: 8px;
        }
      `}</style>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
          </svg>
        </button>
      </div>

      {/* Mobile Overlay with Slide Animation */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
            onClick={() => setIsMobileOpen(false)}
          />
          
          {/* Slide-in Panel */}
          <div className={`absolute left-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-out ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <Formik
              initialValues={initialValues}
              onSubmit={handleApplyFilters}
            >
              {({ resetForm }: { resetForm: () => void }) => (
                <Form>
                  <FilterForm resetForm={resetForm} />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block bg-white border-r border-gray-200 h-screen sticky top-16">
        <Formik
          initialValues={initialValues}
          onSubmit={handleApplyFilters}
        >
          {({ resetForm }: { resetForm: () => void }) => (
            <Form>
              <FilterForm resetForm={resetForm} />
            </Form>
          )}
        </Formik>
      </div>

      {/* Applied Filters Display */}
      {appliedFilters && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Applied Filters:</h3>
          <div className="text-sm text-blue-800 space-y-1">
            {appliedFilters.location && <p>Location: {appliedFilters.location}</p>}
            {(appliedFilters.budgetMin > 0 || appliedFilters.budgetMax < 10000) && (
              <p>Budget: {formatCurrency(appliedFilters.budgetMin)} - {formatCurrency(appliedFilters.budgetMax)}</p>
            )}
            {appliedFilters.gender && <p>Gender: {appliedFilters.gender}</p>}
            {(appliedFilters.followersMin > 0 || appliedFilters.followersMax < 1000000) && (
              <p>Followers: {formatFollowers(appliedFilters.followersMin)} - {formatFollowers(appliedFilters.followersMax)}</p>
            )}
            {appliedFilters.categories.length > 0 && (
              <p>Categories: {appliedFilters.categories.join(', ')}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Filters;
