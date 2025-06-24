import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaFileInvoiceDollar, FaLock, FaUser, FaEnvelope, FaBuilding, FaPhone, FaEye, FaEyeSlash } from 'react-icons/fa';
import IconWrapper from '../components/shared/IconWrapper';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    phoneNumber: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    setError('');
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      // Remove confirmPassword before sending to backend
      const { confirmPassword, ...signupData } = formData;
      await signup(signupData);
      navigate('/login', { state: { message: 'Account created successfully! Please login.' } });
    } catch (err) {
      console.error('Signup error:', err);
      setError(
        err.response?.data?.message || 
        err.response?.data?.details || 
        'Failed to create an account. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">

      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-xl transform transition-all">
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <IconWrapper 
              icon={FaFileInvoiceDollar} 
              className="h-14 w-14 text-indigo-600 transform transition-transform hover:scale-110"
              aria-hidden={true}
            />
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight">
            Create your account
          </h2>
          <p className="mt-3 text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition-all duration-150 ease-in-out border-b border-transparent hover:border-indigo-500">
              sign in to your existing account
            </Link>
          </p>
        </div>

        {error && (
          <div className="mt-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-r-md" role="alert">
            <div className="flex">
              <div className="flex-shrink-0">
                <IconWrapper 
                  icon={FaFileInvoiceDollar} 
                  className="h-5 w-5 text-red-400"
                  aria-hidden={true}
                />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IconWrapper 
                    icon={FaUser} 
                    className="h-5 w-5 text-gray-400 group-hover:text-indigo-400 transition-colors duration-150"
                    aria-hidden={true}
                  />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="appearance-none relative block w-full pl-10 pr-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-150"
                  placeholder="Username"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IconWrapper 
                    icon={FaEnvelope} 
                    className="h-5 w-5 text-gray-400 group-hover:text-indigo-400 transition-colors duration-150"
                    aria-hidden={true}
                  />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none relative block w-full pl-10 pr-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-150"
                  placeholder="Email address"
                />
              </div>
            </div>

            <div>
              <label htmlFor="companyName" className="sr-only">Company Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IconWrapper 
                    icon={FaBuilding} 
                    className="h-5 w-5 text-gray-400 group-hover:text-indigo-400 transition-colors duration-150"
                    aria-hidden={true}
                  />
                </div>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={handleChange}
                  className="appearance-none relative block w-full pl-10 pr-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-150"
                  placeholder="Company name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phoneNumber" className="sr-only">Phone Number</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IconWrapper 
                    icon={FaPhone} 
                    className="h-5 w-5 text-gray-400 group-hover:text-indigo-400 transition-colors duration-150"
                    aria-hidden={true}
                  />
                </div>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="appearance-none relative block w-full pl-10 pr-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-150"
                  placeholder="Phone number"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IconWrapper 
                    icon={FaLock} 
                    className="h-5 w-5 text-gray-400 group-hover:text-indigo-400 transition-colors duration-150"
                    aria-hidden={true}
                  />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none relative block w-full pl-10 pr-12 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-150"
                  placeholder="Password"
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('password')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                >
                  <IconWrapper 
                    icon={showPassword ? FaEyeSlash : FaEye}
                    className="h-5 w-5 text-gray-400 hover:text-indigo-500 transition-colors duration-150"
                    aria-hidden={true}
                  />
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IconWrapper 
                    icon={FaLock} 
                    className="h-5 w-5 text-gray-400 group-hover:text-indigo-400 transition-colors duration-150"
                    aria-hidden={true}
                  />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="appearance-none relative block w-full pl-10 pr-12 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-150"
                  placeholder="Confirm password"
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirm')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                >
                  <IconWrapper 
                    icon={showConfirmPassword ? FaEyeSlash : FaEye}
                    className="h-5 w-5 text-gray-400 hover:text-indigo-500 transition-colors duration-150"
                    aria-hidden={true}
                  />
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${
                isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              } transition-all duration-150`}
            >
              {isLoading ? (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <div className="h-5 w-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                </span>
              ) : null}
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp; 