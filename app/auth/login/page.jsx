'use client'
// pages/auth/login.js

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import axios from 'axios';


export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);


  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const response = await axios.post('/api/auth/login', data);
      const { token, userInfo } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      setMessage('Login successful');
      setError(false);
      window.location.href = '/'
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An unexpected error occurred');
      }
      setError(true);
      setLoading(false)

    }
  };


  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} method='post' className="space-y-6">
          <div>
            <label htmlFor="emailOrPhone" className="block text-sm font-medium leading-6 text-gray-900">
              Email or Phone Number
            </label>
            <div className="mt-2">
              <input
                {...register('emailOrPhone', { required: 'Email or Phone Number is required' })}
                id="emailOrPhone"
                type="text"
                autoComplete="email"
                className="block w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              />
              {errors.emailOrPhone && <span className="text-red-500 text-sm">{errors.emailOrPhone.message}</span>}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                {...register('password', { required: 'Password is required' })}
                id="password"
                type="password"
                autoComplete="current-password"
                className="block w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>
          </div>

          <div>
            <button
            disabled={loading}
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12c0-3.042-1.135-5.824-3-7.938l-3 2.647A7.962 7.962 0 0116 12h4zm-6 7.938V19h-4v1.938A7.962 7.962 0 0112 20h4zM7 4.062L4 6.709V9h4V4.062H7z"
                  ></path>
                </svg>
              ) : (
                'Login'
              )}
            </button>
          </div>
        </form>

        {/* Display success or error message */}
        {message && (
          <p className={`mt-4 text-center text-sm ${error ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </p>
        )}

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <Link href="/auth/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Create new account
          </Link>
        </p>
      </div>
    </div>
  );
}
