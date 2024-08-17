
import Analytics from '../models/Analytics';

export const trackUserAction = async (telegramId: string, action: string, metadata: any) => {
  try {
    const analyticsEntry = new Analytics({
      telegramId,
      action,
      metadata,
      timestamp: new Date()
    });
    await analyticsEntry.save();
  } catch (error) {
    console.error('Error tracking user action:', error);
  }
};

export const getActionAnalytics = async (action: string, startDate: Date, endDate: Date) => {
  try {
    const analytics = await Analytics.find({
      action,
      timestamp: { $gte: startDate, $lte: endDate }
    });
    return analytics;
  } catch (error) {
    console.error('Error fetching action analytics:', error);
    return [];
  }
};