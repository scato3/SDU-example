import { NextRequest, NextResponse } from 'next/server';
import { SurveyScreenResponse } from '@/domains/survey/types/survey.types';

/**
 * Mock Survey Data
 */
const mockSurveys: Record<string, SurveyScreenResponse> = {
  'survey-1': {
    surveyId: 'survey-1',
    title: 'Customer Satisfaction Survey',
    steps: [
      {
        stepId: 'step-1',
        title: 'Welcome',
        description: 'Thank you for participating in our survey',
        component: {
          id: 'hero-1',
          type: 'hero',
          data: {
            title: 'Customer Satisfaction Survey',
            subtitle: 'Help us improve our service',
            imageUrl: 'https://picsum.photos/800/400?random=1',
            ctaText: 'Start Survey',
          },
        },
      },
      {
        stepId: 'step-2',
        title: 'Service Quality',
        description: 'Rate our service quality',
        component: {
          id: 'card-1',
          type: 'card',
          data: {
            title: 'How satisfied are you with our service?',
            description: 'Please rate from 1 to 5',
            badges: ['Required'],
          },
        },
      },
      {
        stepId: 'step-3',
        title: 'Feature Preferences',
        description: 'Select your preferred features',
        component: {
          id: 'list-1',
          type: 'list',
          data: {
            title: 'Which features do you use most?',
            items: [
              { id: '1', text: 'Dashboard', icon: '📊' },
              { id: '2', text: 'Reports', icon: '📈' },
              { id: '3', text: 'Analytics', icon: '📉' },
              { id: '4', text: 'Settings', icon: '⚙️' },
            ],
          },
        },
      },
      {
        stepId: 'step-4',
        title: 'Feedback',
        description: 'Share your thoughts',
        component: {
          id: 'card-2',
          type: 'card',
          data: {
            title: 'Additional Feedback',
            description: 'Tell us what we can improve',
          },
        },
      },
      {
        stepId: 'step-5',
        title: 'Complete',
        description: 'Thank you for your time',
        component: {
          id: 'banner-1',
          type: 'banner',
          data: {
            message: 'You are almost done! Click submit to finish.',
            variant: 'success',
            dismissible: false,
          },
        },
      },
    ],
  },
};

/**
 * GET /api/surveys/[surveyId]
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ surveyId: string }> }
) {
  const { surveyId } = await params;

  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const survey = mockSurveys[surveyId];

  if (!survey) {
    return NextResponse.json({ message: 'Survey not found' }, { status: 404 });
  }

  return NextResponse.json(survey);
}
