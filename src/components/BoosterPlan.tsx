'use client';

import { useState } from 'react';
import { Formik, Form, Field } from 'formik';

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
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<BoosterPlan | null>(null);

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
        '3x more profile views',
        'Priority brand connections'
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
        '5x more profile views',
        'Priority brand connections',
        'Analytics dashboard'
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
        '10x more profile views',
        'Priority brand connections',
        'Analytics dashboard',
        'Dedicated support'
      ]
    }
  ];

  const handleQuickPurchase = async (plan: BoosterPlan) => {
    setSelectedPlan(plan);
    setShowPaymentForm(true);
  };

  const handlePaymentSubmit = async (values: any) => {
    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Payment processed:', { plan: selectedPlan, payment: values });
      alert('🎉 Payment successful! Your profile is now boosted!');
      setShowPaymentForm(false);
      setSelectedPlan(null);
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCurrency = (amount: number) => `₹${amount}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Mobile-First Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Boost Your Profile
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              Get featured & connect with more brands instantly
            </p>
          </div>
        </div>
      </div>

      {/* Mobile-First Plans */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-xl font-bold text-orange-600">10x</div>
            <div className="text-xs text-gray-600">More Views</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-xl font-bold text-orange-600">5x</div>
            <div className="text-xs text-gray-600">More Brands</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-xl font-bold text-orange-600">3x</div>
            <div className="text-xs text-gray-600">More Earnings</div>
          </div>
        </div>

        {/* Mobile-Optimized Plans */}
        <div className="space-y-4 mb-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-xl shadow-lg border-2 transition-all duration-200 ${
                plan.popular ? 'border-orange-500 ring-2 ring-orange-500 ring-opacity-20' : 'border-gray-100'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-2 left-4">
                  <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    ⭐ MOST POPULAR
                  </div>
                </div>
              )}

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-sm text-gray-600">{plan.duration} Featured</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {formatCurrency(plan.discountedPrice)}
                    </div>
                    <div className="text-sm text-gray-500 line-through">
                      {formatCurrency(plan.originalPrice)}
                    </div>
                    <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
                      {plan.discount}% OFF
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* One-Click Purchase Button */}
                <button
                  onClick={() => handleQuickPurchase(plan)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Boost Now - {formatCurrency(plan.discountedPrice)}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-white rounded-xl p-6 shadow-sm text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Trusted by 10,000+ Influencers</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xl font-bold text-orange-600">4.9★</div>
              <div className="text-xs text-gray-600">User Rating</div>
            </div>
            <div>
              <div className="text-xl font-bold text-orange-600">30d</div>
              <div className="text-xs text-gray-600">Money Back</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Payment Modal */}
      {showPaymentForm && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Complete Payment</h2>
                <button
                  onClick={() => setShowPaymentForm(false)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Plan Summary */}
              <div className="bg-orange-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedPlan.name}</h3>
                    <p className="text-sm text-gray-600">{selectedPlan.duration} Featured</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">
                      {formatCurrency(selectedPlan.discountedPrice)}
                    </div>
                    <div className="text-sm text-gray-500 line-through">
                      {formatCurrency(selectedPlan.originalPrice)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <Formik
                initialValues={{
                  name: '',
                  email: '',
                  phone: '',
                  upiId: ''
                }}
                onSubmit={handlePaymentSubmit}
              >
                <Form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <Field
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label htmlFor="upiId" className="block text-sm font-medium text-gray-700 mb-1">
                      UPI ID (Optional)
                    </label>
                    <Field
                      type="text"
                      id="upiId"
                      name="upiId"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="username@upi"
                    />
                  </div>

                  {/* Payment Button */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>Pay {formatCurrency(selectedPlan.discountedPrice)}</span>
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    Secure payment • 30-day money-back guarantee
                  </p>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoosterPlan;
