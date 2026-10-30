
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HeartPulse,
  UserRound,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
} from 'lucide-react';

export const SignupPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess(false);

    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 8) {
      setError('Password must contain at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || 'Could not create account.');
        return;
      }

      // Save details only if signup API returns them.
      if (data.user) {
        localStorage.setItem('curaguide_user', JSON.stringify(data.user));
      }

      if (data.token) {
        localStorage.setItem('curaguide_token', data.token);
      }

      setSuccess(true);
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch {
      setError('Cannot connect to the server. Please check that the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F0FDFA] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-7 text-[#102A43]">
          <span className="bg-[#0D9488] text-white p-2 rounded-xl">
            <HeartPulse className="w-7 h-7" />
          </span>
          <span className="text-2xl font-bold">CuraGuide</span>
        </Link>

        <section className="bg-white rounded-3xl shadow-xl border border-teal-100 p-7 sm:p-9">
          <div className="text-center mb-7">
            <h1 className="text-3xl font-bold text-[#102A43]">Create your account</h1>
            <p className="text-slate-500 mt-2">
              Join CuraGuide for a simpler healthcare experience.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 mb-2">
                Full name
              </label>
              <div className="relative">
                <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                />
              </div>
            </div>

            <div>
              <label htmlFor="signupEmail" className="block text-sm font-semibold text-slate-700 mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="signupEmail"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                />
              </div>
            </div>

            <div>
              <label htmlFor="signupPassword" className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="signupPassword"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-12 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-700 mb-2">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Enter password again"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="rounded-lg bg-red-50 text-red-700 p-3 text-sm">
                {error}
              </p>
            )}

            {success && (
              <div role="status" className="rounded-lg bg-teal-50 text-teal-800 p-3 text-sm flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Account created successfully! You can now sign in.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#0D9488] hover:bg-teal-700 disabled:opacity-60 text-white font-bold py-3 transition-colors"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-teal-700 hover:text-teal-900">
              Sign in
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
};

export default SignupPage;
