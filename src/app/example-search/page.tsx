'use client';

import SearchAndFilter from '../../components/searchAndFilter';

export default function ExampleSearchPage() {
  const handleSearch = (values: { searchQuery: string }) => {
    console.log('Search submitted:', values);
    // Handle search logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Search & Filter Example
          </h1>
          <p className="text-gray-600">
            A beautiful search interface with integrated filters for both desktop and mobile
          </p>
        </div>

        {/* Search and Filter Component */}
        <SearchAndFilter 
          onSearch={handleSearch}
          placeholder="Search for influencers, brands, or campaigns..."
          className="mb-8"
        />

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Search Results
          </h2>
          <p className="text-gray-600">
            Your search results will appear here. The search and filter component above provides:
          </p>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Beautiful search input with search icon
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              Location dropdown with emoji icon
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Filter button that opens advanced filters
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
              Search button with gradient styling
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
              Fully responsive design for mobile and desktop
            </li>
          </ul>
        </div>

        {/* Standalone Filters Example */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Standalone Filters
          </h2>
          <p className="text-gray-600 mb-4">
            You can also use the Filters component independently:
          </p>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <SearchAndFilter 
              onSearch={handleSearch}
              placeholder="Search with standalone filters..."
            />
          </div>
        </div>
      </div>
    </div>
  );
} 