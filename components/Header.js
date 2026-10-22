'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';

// Shown on every page. When logged in it always carries the `logout` button.
export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await getSupabase().auth.signOut();
    router.replace('/');
    router.refresh();
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="AskList home">
          <span className="brand-mark" aria-hidden="true">?</span>
          AskList
        </Link>
        <nav className="header-nav" aria-label="Account">
          {ready && user && (
            <>
              <Link href="/app" className="nav-link hide-xs">
                My questions
              </Link>
              <button type="button" className="btn btn-ghost" data-testid="logout" onClick={handleLogout}>
                Log out
              </button>
            </>
          )}
          {ready && !user && (
            <>
              <Link href="/login" className="nav-link">
                Log in
              </Link>
              <Link href="/signup" className="btn btn-primary btn-sm">
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
