'use client';

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface LoginFormValues {
  email: string;
}

interface VerificationFormValues {
  code: string;
}

const Login = () => {
  const [isVerificationStep, setIsVerificationStep] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const loginValidationSchema = Yup.object({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),
  });

  const verificationValidationSchema = Yup.object({
    code: Yup.string()
      .length(4, 'Verification code must be 4 digits')
      .matches(/^[0-9]+$/, 'Code must contain only numbers')
      .required('Verification code is required'),
  });

  const handleEmailSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      // Simulate API call to send verification code
      await new Promise(resolve => setTimeout(resolve, 2000));
      setUserEmail(values.email);
      setIsVerificationStep(true);
      console.log('Verification code sent to:', values.email);
    } catch (error) {
      console.error('Error sending verification code:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationSubmit = async (values: VerificationFormValues) => {
    setIsLoading(true);
    try {
      // Simulate API call to verify code
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Verification successful with code:', values.code);
      localStorage.setItem('token', '1234567890');
      // Redirect to homepage or handle successful login
      window.location.href = '/';
    } catch (error) {
      console.error('Error verifying code:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // Simulate Google OAuth
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Google login successful');
      // Redirect to homepage
      window.location.href = '/';
    } catch (error) {
      console.error('Google login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resendCode = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Verification code resent to:', userEmail);
    } catch (error) {
      console.error('Error resending code:', error);
    } finally {
      setIsLoading(false);
    }
  };  

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
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

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mr-3">
              <span className="text-white font-bold text-2xl">O</span>
            </div>
            <span className="text-3xl font-bold text-gray-900">Ol</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isVerificationStep ? 'Verify Your Email' : 'Welcome Back'}
          </h1>
          <p className="text-gray-600">
            {isVerificationStep 
              ? `We've sent a 4-digit code to ${userEmail}`
              : 'Sign in to continue to your account'
            }
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
          {!isVerificationStep ? (
            // Email Login Form
            <Formik
              initialValues={{ email: '' }}
              validationSchema={loginValidationSchema}
              onSubmit={handleEmailSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Sending Code...</span>
                      </>
                    ) : (
                      <span>Continue with Email</span>
                    )}
                  </button>
                </Form>
              )}
            </Formik>
          ) : (
            // Verification Code Form
            <Formik
              initialValues={{ code: '' }}
              validationSchema={verificationValidationSchema}
              onSubmit={handleVerificationSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <div>
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                      Verification Code
                    </label>
                    <Field
                      type="text"
                      id="code"
                      name="code"
                      placeholder="Enter 4-digit code"
                      maxLength={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-center text-2xl font-mono tracking-widest"
                    />
                    <ErrorMessage name="code" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <span>Verify & Continue</span>
                    )}
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={resendCode}
                      disabled={isLoading}
                      className="text-orange-600 hover:text-orange-700 text-sm font-medium disabled:text-gray-400"
                    >
                      Didn't receive code? Resend
                    </button>
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
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-white hover:bg-gray-50 disabled:bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-lg border border-gray-300 transition-colors duration-200 flex items-center justify-center space-x-3"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
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

          {/* Back to Email Option */}
          {isVerificationStep && (
            <div className="text-center mt-6">
              <button
                type="button"
                onClick={() => setIsVerificationStep(false)}
                className="text-gray-600 hover:text-gray-800 text-sm font-medium"
              >
                ← Back to email entry
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
    </div>
  );
};

export default Login;
