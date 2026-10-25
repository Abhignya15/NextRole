import { supabase } from '../../../services/supabase';

const TABLE_NAME = 'prep_plans';
const ENABLE_LOCAL_TEST_BYPASS = import.meta.env.DEV && import.meta.env.VITE_ENABLE_LOCAL_AUTH_BYPASS === 'true';

const isMissingAuthError = (error) => {
  if (!error) {
    return false;
  }

  return (
    error?.name === 'AuthSessionMissingError' ||
    /Auth session missing/i.test(error?.message || '')
  );
};

const normalizeTopics = (topics = []) => {
  if (!Array.isArray(topics)) {
    return [];
  }

  return topics.map((topic) => ({
    id: topic.id ?? `${topic.name || 'topic'}-${Date.now()}`,
    name: topic.name ?? '',
    weight: Number(topic.weight ?? 0),
    confidence: topic.confidence ?? 'Medium',
    subtopics: topic.subtopics ?? '',
    notes: topic.notes ?? '',
  }));
};

export const mapPlanRowToFormShape = (row = {}) => {
  const planData = row.plan_data && typeof row.plan_data === 'object' ? row.plan_data : {};

  return {
    id: row.id ?? planData.id ?? null,
    goal: planData.goal ?? 'Technical job interview',
    planName: row.plan_name ?? planData.planName ?? '',
    targetRole: row.target_role ?? planData.targetRole ?? '',
    companyName: planData.companyName ?? '',
    interviewDate: row.interview_date ?? planData.interviewDate ?? '',
    experienceYears: planData.experienceYears ?? '',
    currentJobTitle: planData.currentJobTitle ?? '',
    experienceLevel: planData.experienceLevel ?? 'Intermediate',
    difficulty: planData.difficulty ?? 'Adaptive',
    dailyMinutes: Number(row.daily_minutes ?? planData.dailyMinutes ?? 45),
    questionsPerSession: Number(planData.questionsPerSession ?? 12),
    mode: planData.mode ?? 'Both',
    responseMode: planData.responseMode ?? 'Both',
    questionTypes: Array.isArray(planData.questionTypes) ? planData.questionTypes : [],
    topics: normalizeTopics(planData.topics ?? []),
    createdAt: row.created_at ?? planData.createdAt ?? new Date().toISOString(),
  };
};

export const getCurrentUserId = async () => {
  if (!supabase) {
    return null;
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      if (isMissingAuthError(error)) {
        return null;
      }

      throw error;
    }

    return user?.id ?? null;
  } catch (error) {
    if (isMissingAuthError(error)) {
      return null;
    }

    throw error;
  }
};

export const savePrepPlan = async (plan) => {
  if (!supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to your .env file.');
  }

  const userId = await getCurrentUserId();

  if (!userId && !ENABLE_LOCAL_TEST_BYPASS) {
    throw new Error('You must sign in before saving a prep plan.');
  }

  const payload = {
    plan_name: plan.planName || null,
    target_role: plan.targetRole || null,
    interview_date: plan.interviewDate || null,
    daily_minutes: Number(plan.dailyMinutes) || 0,
    user_id: userId ?? '00000000-0000-0000-0000-000000000000',
    plan_data: {
      goal: plan.goal,
      companyName: plan.companyName ?? '',
      experienceYears: plan.experienceYears ?? '',
      currentJobTitle: plan.currentJobTitle ?? '',
      experienceLevel: plan.experienceLevel ?? 'Intermediate',
      difficulty: plan.difficulty ?? 'Adaptive',
      questionsPerSession: Number(plan.questionsPerSession ?? 12),
      mode: plan.mode ?? 'Both',
      responseMode: plan.responseMode ?? 'Both',
      questionTypes: Array.isArray(plan.questionTypes) ? plan.questionTypes : [],
      topics: normalizeTopics(plan.topics ?? []),
      createdAt: plan.createdAt ?? new Date().toISOString(),
    },
  };

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([payload])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapPlanRowToFormShape(data);
};

export const fetchLatestPrepPlan = async () => {
  if (!supabase) {
    return null;
  }

  const userId = await getCurrentUserId();

  if (!userId) {
    return null;
  }

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1);

  if (error) {
    throw error;
  }

  const row = data?.[0];

  return row ? mapPlanRowToFormShape(row) : null;
};
