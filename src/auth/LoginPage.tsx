import { API_URL } from '../api';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  HeartPulse,
  Eye,
  EyeOff,
  Mail,
  Lock,
  LoaderCircle,
  CheckCircle2,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        API_URL + '/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || 'Login failed. Please try again.');
        return;
      }

      setSuccess(`Welcome, ${data.user.fullName}! Login successful.`);
      localStorage.setItem('curaguide_token', data.token);
      localStorage.setItem('curaguide_user', JSON.stringify(data.user));
      
      setEmail('');
      setPassword('');

      // Navigate after showing the success message.
      setTimeout(() => {
        navigate('/dashboard');
      }, 1200);
    } catch {
      setError(
        'Cannot connect to the server. Please check that the backend is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F0FDFA] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 mb-7 text-[#102A43]"
        >
          <span className="bg-[#0D9488] text-white p-2 rounded-xl">
            <HeartPulse className="w-7 h-7" />
          </span>
          <span className="text-2xl font-bold">CuraGuide</span>
        </Link>

        <section className="bg-white rounded-3xl shadow-xl border border-teal-100 p-7 sm:p-9">
          <div className="text-center mb-7">
            <h1 className="text-3xl font-bold text-[#102A43]">
              Welcome back
            </h1>
            <p className="text-slate-500 mt-2">
              Sign in to continue to CuraGuide.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="loginEmail"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Email address
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="loginEmail"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="loginPassword"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="loginPassword"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-12 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 text-red-700 p-3 text-sm"
              >
                {error}
              </p>
            )}

            {success && (
              <div
                role="status"
                className="rounded-lg bg-teal-50 text-teal-800 p-3 text-sm flex items-start gap-2"
              >
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#0D9488] hover:bg-teal-700 disabled:opacity-60 text-white font-bold py-3 transition-colors flex items-center justify-center gap-2"
            >
              {loading && <LoaderCircle className="w-5 h-5 animate-spin" />}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold text-teal-700 hover:text-teal-900"
            >
              Create account
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;




