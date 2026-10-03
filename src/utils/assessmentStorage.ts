import { AssessmentRecord, QuestionUserAttempt } from '../types/assessment.ts';

const STORAGE_PREFIX = 'maths_master_assessment_';

export function createDefaultAssessmentRecord(topicId: string): AssessmentRecord {
  return {
    topicId,
    score: 0,
    totalQuestions: 25,
    percentage: 0,
    wrongQuestionIds: [],
    questionAttempts: {},
    attempts: {},
  };
}

export function getAssessmentRecord(topicId: string): AssessmentRecord {
  if (typeof window === 'undefined') return createDefaultAssessmentRecord(topicId);
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + topicId);
    if (!raw) return createDefaultAssessmentRecord(topicId);
    const parsed = JSON.parse(raw);
    return {
      topicId,
      score: parsed.score || 0,
      totalQuestions: parsed.totalQuestions || 25,
      percentage: parsed.percentage || 0,
      wrongQuestionIds: parsed.wrongQuestionIds || [],
      questionAttempts: parsed.questionAttempts || parsed.attempts || {},
      attempts: parsed.attempts || parsed.questionAttempts || {},
      completedAt: parsed.completedAt,
    };
  } catch {
    return createDefaultAssessmentRecord(topicId);
  }
}

export function saveAssessmentRecord(topicIdOrRecord: string | AssessmentRecord, optionalRecord?: AssessmentRecord): void {
  if (typeof window === 'undefined') return;
  try {
    let topicId: string;
    let record: AssessmentRecord;

    if (typeof topicIdOrRecord === 'string') {
      topicId = topicIdOrRecord;
      record = optionalRecord || createDefaultAssessmentRecord(topicId);
    } else {
      record = topicIdOrRecord;
      topicId = record.topicId;
    }

    // Ensure attempts & questionAttempts stay in sync
    if (!record.attempts) record.attempts = record.questionAttempts || {};
    if (!record.questionAttempts) record.questionAttempts = record.attempts;

    localStorage.setItem(STORAGE_PREFIX + topicId, JSON.stringify(record));

    // Also update completed index
    const indexKey = STORAGE_PREFIX + 'completed_index';
    const existing = getCompletedAssessmentTopicIds();
    if (!existing.includes(topicId)) {
      existing.push(topicId);
      localStorage.setItem(indexKey, JSON.stringify(existing));
    }
  } catch (err) {
    console.warn('Failed to save assessment record', err);
  }
}

export function saveQuestionAttempt(topicId: string, attempt: QuestionUserAttempt): AssessmentRecord {
  const current = getAssessmentRecord(topicId);
  const updatedAttempts = {
    ...current.attempts,
    [attempt.questionId]: attempt,
  };

  const correctCount = Object.values(updatedAttempts).filter((a) => a.isCorrect).length;
  const wrongIds = Object.values(updatedAttempts)
    .filter((a) => !a.isCorrect)
    .map((a) => a.questionId);

  const updated: AssessmentRecord = {
    ...current,
    attempts: updatedAttempts,
    questionAttempts: updatedAttempts,
    score: correctCount,
    wrongQuestionIds: wrongIds,
    percentage: Math.round((correctCount / 25) * 100),
    completedAt: new Date().toISOString(),
  };

  saveAssessmentRecord(topicId, updated);
  return updated;
}

export function resetAssessmentRecord(topicId: string): AssessmentRecord {
  const fresh = createDefaultAssessmentRecord(topicId);
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_PREFIX + topicId);
    } catch {
      // safe fallback
    }
  }
  return fresh;
}

export function clearAssessmentRecord(topicId: string): void {
  resetAssessmentRecord(topicId);
}

export function getCompletedAssessmentTopicIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + 'completed_index');
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function calculateAssessmentStats(topicId: string, customRecord?: AssessmentRecord) {
  const record = customRecord || getAssessmentRecord(topicId);
  const attempts = Object.values(record.attempts || {});
  const totalQuestions = record.totalQuestions || 25;
  const completedCount = attempts.length;
  const correctCount = attempts.filter((a) => a.isCorrect).length;
  const progressPercentage = Math.round((completedCount / totalQuestions) * 100);
  const accuracyPercentage = completedCount > 0 ? Math.round((correctCount / completedCount) * 100) : 0;

  return {
    totalQuestions,
    completedCount,
    correctCount,
    progressPercentage,
    accuracyPercentage,
  };
}
