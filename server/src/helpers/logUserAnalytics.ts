// server/src/helpers/logUserAnalytics.ts

import { UserAnalytics } from '../database/models/UserAnalytics.js';

interface LogAnalyticsOptions {
  userId: string;
  action: 'search' | 'favorite';
  query?: string;
  jobId?: string;
  title?: string;
  location?: string;
  company?: string;
  salaryMin?: number;
  salaryMax?: number;
}

export const logUserAnalytics = async (data: LogAnalyticsOptions): Promise<void> => {
  try {
    await UserAnalytics.create({
      ...data,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('❌ Failed to log user analytics:', error);
  }
};
