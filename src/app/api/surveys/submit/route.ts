import { NextRequest, NextResponse } from 'next/server';
import { SurveySubmission } from '@/domains/survey/types/survey.types';

/**
 * POST /api/surveys/submit
 *
 * 설문조사 응답 제출
 */
export async function POST(request: NextRequest) {
  try {
    const body: SurveySubmission = await request.json();

    // Validate
    if (!body.surveyId || !body.responses || !Array.isArray(body.responses)) {
      return NextResponse.json(
        { message: 'Invalid submission data' },
        { status: 400 }
      );
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock success response
    return NextResponse.json({
      success: true,
      submissionId: `sub_${Date.now()}`,
      surveyId: body.surveyId,
      message: 'Survey submitted successfully',
      submittedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to submit survey' },
      { status: 500 }
    );
  }
}
