'use client';

import { useState } from 'react';

interface BoosterPlan {
  id: string;
  name: string;
  duration: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  features: string[];
  popular?: boolean;
  bestValue?: boolean;
}

const BoosterPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const plans: BoosterPlan[] = [
    {
      id: 'daily',
      name: 'Daily Boost',
      duration: '1 Day',
      originalPrice: 50,
      discountedPrice: 19,
      discount: 60,
      features: [
        'Featured on top for 24 hours',
        'Priority listing in search results',
        'Enhanced visibility to brands',
        'Profile highlighted with special badge',
        'Get 3x more profile views',
        'Direct brand connection priority'
      ]
    },
    {
      id: 'weekly',
      name: 'Weekly Boost',
      duration: '10 Days',
      originalPrice: 190,
      discountedPrice: 99,
      discount: 50,
      features: [
        'Featured on top for 10 days',
        'Priority listing in search results',
        'Enhanced visibility to brands',
        'Profile highlighted with special badge',
        'Get 5x more profile views',
        'Direct brand connection priority',
        'Analytics dashboard access',
        'Priority customer support'
      ],
      popular: true,
      bestValue: true
    },
    {
      id: 'monthly',
      name: 'Monthly Boost',
      duration: '30 Days',
      originalPrice: 700,
      discountedPrice: 299,
      discount: 60,
      features: [
        'Featured on top for 30 days',
        'Priority listing in search results',
        'Enhanced visibility to brands',
        'Profile highlighted with special badge',
        'Get 10x more profile views',
        'Direct brand connection priority',
        'Analytics dashboard access',
        'Priority customer support',
        'Featured in weekly newsletter',
        'Exclusive brand partnerships',
        'Custom profile customization',
        'Dedicated account manager'
      ]
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handlePurchase = async () => {
    if (!selectedPlan) return;
    
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Processing payment for plan:', selectedPlan);
      alert('Payment processed successfully! Your profile is now boosted!');
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Boost Your Profile
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get featured on top and connect with more brands. Choose your boost plan and start earning more collaborations!
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Section */}
        <div className="text-center mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-orange-600 mb-2">10x</div>
              <div className="text-gray-600">More Profile Views</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-orange-600 mb-2">5x</div>
              <div className="text-gray-600">More Brand Connections</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-orange-600 mb-2">3x</div>
              <div className="text-gray-600">Higher Earnings</div>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-xl border-2 transition-all duration-300 hover:shadow-2xl ${
                selectedPlan === plan.id
                  ? 'border-orange-500 shadow-orange-100'
                  : 'border-gray-100 hover:border-orange-200'
              } ${plan.popular ? 'ring-2 ring-orange-500 ring-opacity-50' : ''}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    ⭐ MOST POPULAR
                  </div>
                </div>
              )}

              {/* Best Value Badge */}
              {plan.bestValue && (
                <div className="absolute -top-4 right-4">
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    BEST VALUE
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600">{plan.duration} Featured</p>
                </div>

                {/* Pricing */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center space-x-3 mb-2">
                    <span className="text-3xl font-bold text-gray-900">
                      ₹{plan.discountedPrice}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ₹{plan.originalPrice}
                    </span>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold inline-block">
                    {plan.discount}% OFF
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Select Button */}
                <button
                  onClick={() => handlePlanSelect(plan.id)}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                    selectedPlan === plan.id
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                  }`}
                >
                  {selectedPlan === plan.id ? '✓ Selected' : 'Select Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Purchase Section */}
        {selectedPlan && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Boost Your Profile?
            </h2>
            <p className="text-gray-600 mb-6">
              You've selected the {plans.find(p => p.id === selectedPlan)?.name} plan. 
              Get ready to see your profile views and brand connections skyrocket!
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  ₹{plans.find(p => p.id === selectedPlan)?.discountedPrice}
                </div>
                <div className="text-sm text-gray-500">One-time payment</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {plans.find(p => p.id === selectedPlan)?.discount}% OFF
                </div>
                <div className="text-sm text-gray-500">Limited time offer</div>
              </div>
            </div>

            <button
              onClick={handlePurchase}
              disabled={isProcessing}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center space-x-2 mx-auto"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Boost My Profile Now</span>
                </>
              )}
            </button>

            <p className="text-xs text-gray-500 mt-4">
              Secure payment powered by Razorpay • 30-day money-back guarantee
            </p>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Trusted by 10,000+ Influencers</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">4.9★</div>
              <div className="text-sm text-gray-600">User Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">99%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">30d</div>
              <div className="text-sm text-gray-600">Money Back</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoosterPlan;
