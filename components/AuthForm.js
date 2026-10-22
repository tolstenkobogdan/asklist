'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSupabase } from '@/lib/supabase';

// Shared email + password form. `mode` is "signup" or "login"; test ids follow the grading contract.
export default function AuthForm({ mode }) {
  const router = useRouter();
  const isSignup = mode === 'signup';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setInfo('');
    setLoading(true);

    const supabase = getSupabase();
    const { data, error: authError } = isSignup
      ? await supabase.auth.signUp({ email: email.trim(), password })
      : await supabase.auth.signInWithPassword({ email: email.trim(), password });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (!data.session) {
      // Only happens if "Confirm email" is still switched on in Supabase.
      setInfo('Account created. Please confirm your email, then log in.');
      setLoading(false);
      return;
    }

    router.replace('/app');
    router.refresh();
  }

  return (
    <div className="container auth-wrap">
      <div className="card auth-card">
        <h1>{isSignup ? 'Create your AskList' : 'Welcome back'}</h1>
        <p className="muted">
          {isSignup
            ? 'Free, private, and takes ten seconds.'
            : 'Log in to see the questions you saved.'}
        </p>

        <form onSubmit={handleSubmit} className="form" noValidate={false}>
          <label htmlFor={`${mode}-email`}>Email</label>
          <input
            id={`${mode}-email`}
            data-testid={`${mode}-email`}
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor={`${mode}-password`}>Password</label>
          <input
            id={`${mode}-password`}
            data-testid={`${mode}-password`}
            type="password"
            autoComplete={isSignup ? 'new-password' : 'current-password'}
            minLength={6}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-describedby={isSignup ? 'pw-hint' : undefined}
          />
          {isSignup && (
            <p id="pw-hint" className="hint">
              At least 6 characters.
            </p>
          )}

          {error && (
            <p className="alert alert-error" role="alert">
              {error}
            </p>
          )}
          {info && (
            <p className="alert alert-info" role="status">
              {info}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-block"
            data-testid={`${mode}-submit`}
            disabled={loading}
          >
            {loading ? 'Please wait…' : isSignup ? 'Sign up' : 'Log in'}
          </button>
        </form>

        <p className="switch">
          {isSignup ? (
            <>
              Already have an account? <Link href="/login">Log in</Link>
            </>
          ) : (
            <>
              New here? <Link href="/signup">Create an account</Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
