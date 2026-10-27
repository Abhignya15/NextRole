import { supabase } from "./supabase";

const ensureSupabase = () => {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to your .env file.",
    );
  }
};

const normalizeAuthError = (error) => {
  const rawMessage =
    error?.message ||
    error?.error_description ||
    error?.details ||
    "Unable to continue right now.";
  const lowerMessage = rawMessage.toLowerCase();

  if (lowerMessage.includes("invalid login credentials")) {
    return "Invalid login credentials. Please check your email and password.";
  }

  if (
    lowerMessage.includes("email rate limit exceeded") ||
    lowerMessage.includes("rate limit exceeded") ||
    lowerMessage.includes("too many requests")
  ) {
    return "Too many attempts. Please wait a few minutes and try again.";
  }

  if (
    lowerMessage.includes("already registered") ||
    lowerMessage.includes("user already exists")
  ) {
    return "An account with this email already exists. Please log in instead.";
  }

  if (
    lowerMessage.includes("signups are disabled") ||
    lowerMessage.includes("signup is disabled")
  ) {
    return "Email sign-up is currently disabled for this project.";
  }

  if (
    lowerMessage.includes("invalid email") ||
    lowerMessage.includes("valid email") ||
    lowerMessage.includes("email format")
  ) {
    return "Please enter a valid email address.";
  }

  if (lowerMessage.includes("password")) {
    return "Password is invalid or too short. Please use a stronger password.";
  }

  return rawMessage;
};

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((email || "").trim());

export const authService = {
  login: async ({ email, password }) => {
    ensureSupabase();

    const trimmedEmail = (email || "").trim();

    if (!trimmedEmail || !isValidEmail(trimmedEmail)) {
      throw new Error("Please enter a valid email address.");
    }

    if (!password) {
      throw new Error("Please enter your password.");
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: trimmedEmail,
      password,
    });

    if (error) {
      throw new Error(normalizeAuthError(error));
    }

    return { success: true, user: data.user, session: data.session };
  },

  signup: async ({ email, password, fullName }) => {
    ensureSupabase();

    const trimmedEmail = (email || "").trim();
    const trimmedName = (fullName || "").trim();

    if (!trimmedName) {
      throw new Error("Please enter your full name.");
    }

    if (!trimmedEmail || !isValidEmail(trimmedEmail)) {
      throw new Error("Please enter a valid email address.");
    }

    if (!password || password.length < 6) {
      throw new Error("Password must be at least 6 characters long.");
    }

    const { data, error } = await supabase.auth.signUp({
      email: trimmedEmail,
      password,
      options: {
        data: {
          full_name: trimmedName,
        },
      },
    });

    if (error) {
      throw new Error(normalizeAuthError(error));
    }

    return { success: true, user: data.user, session: data.session };
  },

  loginWithGoogle: async () => {
    ensureSupabase();

    // Hardcoded to the single canonical domain. Using window.location.origin
    // here is unsafe if Vercel redirects between apex/www domains, since the
    // PKCE code_verifier is stored in localStorage on whichever origin initiated
    // the login, and a post-auth domain bounce breaks that lookup
    // (bad_oauth_state / "OAuth state not found or expired").
    const redirectUrl = "https://www.nextrole.space";

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectUrl,
      },
    });

    if (error) {
      throw new Error(normalizeAuthError(error));
    }

    return { success: true, data };
  },

  signOut: async () => {
    ensureSupabase();

    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    return { success: true };
  },
};
