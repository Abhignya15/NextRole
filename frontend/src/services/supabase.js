import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY;

// Capture and immediately strip the OAuth `code` param from the URL before
// the Supabase client (or anything else) gets a chance to read it. The
// client's own built-in handling only cleans the URL *after* the token
// exchange network call finishes, which leaves the code visibly sitting in
// the address bar for the duration of that request. Stripping it here,
// synchronously, means it's gone before the page has even finished loading.
// detectSessionInUrl is disabled below so the client never tries to read it
// from the URL itself; the capture code is exchanged manually (see App.jsx).
const strippedUrl = new URL(window.location.href);
export const pendingOAuthCode = strippedUrl.searchParams.get('code');

if (pendingOAuthCode) {
  strippedUrl.searchParams.delete('code');
  window.history.replaceState(null, '', strippedUrl.pathname + strippedUrl.search + strippedUrl.hash);
}

// If this window is a popup opened by the main app (see authService.loginWithGoogle),
// hand the code back to the opener via postMessage and close immediately instead of
// completing the sign-in here. This keeps the Google/Supabase redirect chain confined
// to the popup so the main tab never navigates away.
if (pendingOAuthCode && window.opener && window.opener !== window) {
  window.opener.postMessage({ type: 'nextrole-oauth-code', code: pendingOAuthCode }, window.location.origin);
  window.close();
}

export const supabase = supabaseUrl && supabasePublishableKey
  ? createClient(supabaseUrl, supabasePublishableKey, {
      auth: {
        flowType: 'pkce',
        detectSessionInUrl: false,
      },
    })
  : null;