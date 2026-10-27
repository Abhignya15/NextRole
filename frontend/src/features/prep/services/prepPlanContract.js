export const PREP_PLANS_TABLE = 'prep_plans';

export const normalizeTopics = (topics = []) => {
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

export const buildPrepPlanPayload = (plan, userId) => ({
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
});
