// pages/auth/verify-email.js
'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'next/navigation';

const VerifyEmail = () => {
  const {id} = useParams();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id) {
      const verifyEmail = async () => {
        try {
          const response = await axios.post('/api/auth/verify-email', { id });
          setMessage(response.data.message);
          toast.success(response.data.message);
        } catch (error) {
          if (error.response && error.response.data && error.response.data.message) {
            setMessage(error.response.data.message);
            toast.error(error.response.data.message);
          } else {
            setMessage('An unexpected error occurred.');
            toast.error('An unexpected error occurred.');
          }
        } finally {
          setLoading(false);
        }
      };

      verifyEmail();
    }
  }, [id]);

  return (
    <>
      <ToastContainer />
      <div className="flex min-h-screen items-center justify-center">
        {loading ? (
          <p>Verifying your email...</p>
        ) : (
          <p>{message}</p>
        )}
      </div>
    </>
  );
};

export default VerifyEmail;
