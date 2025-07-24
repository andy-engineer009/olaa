'use client';

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn } from '@/store/userRoleSlice';

// Types for form values
interface PhoneLoginFormValues {
  phoneNumber: string;
}

interface OTPVerificationFormValues {
  otp: string;
}

interface GoogleLoginResponse {
  success: boolean;
  message: string;
  redirectUrl?: string;
}

// Validation schemas
const phoneValidationSchema = Yup.object({
  phoneNumber: Yup.string()
    .matches(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number')
    .required('Phone number is required'),
});

const otpValidationSchema = Yup.object({
  otp: Yup.string()
    .length(4, 'OTP must be exactly 4 digits')
    .matches(/^[0-9]+$/, 'OTP must contain only numbers')
    .required('OTP is required'),
});

// Toast notification component
const Toast = ({ message, type, onClose }: { message: string; type: 'success' | 'error' | 'info'; onClose: () => void }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';

  return (
    <div className={`fixed top-4 right-4 z-50 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center max-w-sm animate-slide-in`}>
      <span className="mr-2 font-bold">{icon}</span>
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="ml-2 text-white hover:text-gray-200">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

// Loading spinner component
const LoadingSpinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <svg className={`animate-spin ${sizeClasses[size]} text-white`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
};

const Login = () => {
  // State management
  const [isOTPStep, setIsOTPStep] = useState(false);
  const [userPhone, setUserPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [resendTimer, setResendTimer] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();
  
  // Show toast notification
  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  // Handle phone number submission
  const handlePhoneSubmit = async (values: PhoneLoginFormValues) => {
    setIsLoading(true);
    try {
      // Simulate API call to send OTP
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store phone number and show OTP screen
      setUserPhone(values.phoneNumber);
      setIsOTPStep(true);
      
      // Start resend timer (30 seconds)
      setResendTimer(30);
      const timer = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      // Show success toast
      showToast(`OTP sent to +91 ${values.phoneNumber}`, 'success');
      console.log('OTP sent to:', values.phoneNumber);
      
    } catch (error) {
      console.error('Error sending OTP:', error);
      showToast('Failed to send OTP. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP verification
  const handleOTPSubmit = async (values: OTPVerificationFormValues) => {
    setIsLoading(true);
    try {
      // Simulate API call to verify OTP
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock verification (in real app, this would be verified by backend)
      if (values.otp === '1234') { // Mock OTP for testing
        showToast('Login successful! Redirecting...', 'success');
        
        // Store authentication token
        localStorage.setItem('token', 'mock-jwt-token');
        dispatch(setIsLoggedIn(true));
        localStorage.setItem('userPhone', userPhone);
        
        // Redirect to home page
        setTimeout(() => {
          router.push('/');
        }, 1000);
      } else {
        showToast('Invalid OTP. Please try again.', 'error');
      }
      
    } catch (error) {
      console.error('Error verifying OTP:', error);
      showToast('Failed to verify OTP. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google sign-in
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // Simulate Google OAuth process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock Google sign-in response
      const mockResponse: GoogleLoginResponse = {
        success: true,
        message: 'Google sign-in successful',
        redirectUrl: '/'
      };
      
      if (mockResponse.success) {
        showToast('Google sign-in successful! Redirecting...', 'success');
        
        // Store authentication token
        localStorage.setItem('token', 'google-jwt-token');
        localStorage.setItem('loginMethod', 'google');
        
        // Redirect to home page
        setTimeout(() => {
          router.push('/');
        }, 1000);
      } else {
        showToast(mockResponse.message || 'Google sign-in failed', 'error');
      }
      
    } catch (error) {
      console.error('Google login error:', error);
      showToast('Google sign-in failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resend OTP
  const handleResendOTP = async () => {
    if (resendTimer > 0) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Start resend timer again
      setResendTimer(30);
      const timer = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      showToast(`OTP resent to +91 ${userPhone}`, 'success');
      console.log('OTP resent to:', userPhone);
      
    } catch (error) {
      console.error('Error resending OTP:', error);
      showToast('Failed to resend OTP. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Format phone number for display
  const formatPhoneNumber = (phone: string) => {
    if (phone.length === 10) {
      return `${phone.slice(0, 5)} ${phone.slice(5, 10)}`;
    }
    return phone;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
      {/* Toast Notifications */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      <div className="w-full max-w-md">
        {/* Back to Home Button */}
        <div className="absolute top-4 left-4 sm:top-8 sm:left-8">
          <button
            onClick={() => router.push('/')}
            className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Back to Home"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        </div>

        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-[#6f43fe] rounded-xl flex items-center justify-center mr-3">
              <span className="text-white font-bold text-2xl">O</span>
            </div>
            <span className="text-3xl font-bold text-gray-900">Ol</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isOTPStep ? 'Verify Your Phone' : 'Welcome Back'}
          </h1>
          <p className="text-gray-600">
            {isOTPStep 
              ? `We've sent a 4-digit code to +91 ${formatPhoneNumber(userPhone)}`
              : 'Sign in to continue to your account'
            }
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
          {!isOTPStep ? (
            // Phone Number Login Form
            <Formik
            key="phone-form" 
              initialValues={{ phoneNumber: '' }}
              validationSchema={phoneValidationSchema}
              onSubmit={handlePhoneSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 text-sm">+91</span>
                      </div>
                      <Field
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="Enter your 10-digit mobile number"
                        maxLength={10}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      />
                    </div>
                    <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm mt-1" />
                    <p className="text-xs text-gray-500 mt-1">
                      We'll send you a 4-digit verification code
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className="w-full bg-[#6f43fe] hover:bg-[#6f43fe] disabled:bg-[#ccc] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <LoadingSpinner size="sm" />
                        <span>Sending OTP...</span>
                      </>
                    ) : (
                      <span>Continue with Phone</span>
                    )}
                  </button>
                </Form>
              )}
            </Formik>
          ) : (
            // OTP Verification Form
            <Formik
            key="otp-form" // 👈 And this one
              initialValues={{ otp: '' }}
              validationSchema={otpValidationSchema}
              onSubmit={handleOTPSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                      Verification Code
                    </label>
                    <Field
                      type="text"
                      id="otp"
                      name="otp"
                      placeholder="Enter 4-digit code"
                      maxLength={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-center text-2xl font-mono tracking-widest placeholder:text-sm"
                    />
                    <ErrorMessage name="otp" component="div" className="text-red-500 text-sm mt-1" />
                    <p className="text-xs text-gray-500 mt-1 text-center">
                      Enter the 4-digit code sent to your phone
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className="w-full bg-[#6f43fe] hover:bg-[#6f43fe] disabled:bg-[#ccc] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <LoadingSpinner size="sm" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <span>Verify & Continue</span>
                    )}
                  </button>

                  {/* Resend OTP Section */}
                  <div className="text-center">
                    {resendTimer > 0 ? (
                      <p className="text-gray-500 text-sm">
                        Resend code in {resendTimer} seconds
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendOTP}
                        disabled={isLoading}
                        className="text-orange-600 hover:text-orange-700 text-sm font-medium disabled:text-gray-400"
                      >
                        Didn't receive code? Resend
                      </button>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          )}

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Google Login Button */}

          {!isOTPStep && <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-white hover:bg-gray-50 disabled:bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-lg border border-gray-300 transition-colors duration-200 flex items-center justify-center space-x-3"
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>
          }

          {/* Back to Phone Entry Option */}
          {isOTPStep && (
            <div className="text-center mt-6">
              <button
                type="button"
                onClick={() => {
                  setIsOTPStep(false);
                  setUserPhone('');
                  setResendTimer(0);
                }}
                className="text-gray-600 hover:text-gray-800 text-sm font-medium"
              >
                ← Back to phone entry
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">
            By continuing, you agree to our{' '}
            <a href="#" className="text-orange-600 hover:text-orange-700 font-medium">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-orange-600 hover:text-orange-700 font-medium">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Login;
