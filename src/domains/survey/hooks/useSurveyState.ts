"use client";

import { useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { StepResponse, SurveySubmission } from "../types/survey.types";
import { surveyApi } from "../api/surveyApi";

export const useSurveyState = (surveyId: string, totalSteps: number) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Map<string, StepResponse>>(
    new Map(),
  );

  const submitMutation = useMutation({
    mutationFn: (submission: SurveySubmission) =>
      surveyApi.submitSurvey(submission),
    onSuccess: () => {
      console.log("Survey submitted successfully");
    },
  });

  const saveResponse = useCallback((response: StepResponse) => {
    setResponses((prev) => {
      const next = new Map(prev);
      next.set(response.stepId, response);
      return next;
    });
  }, []);

  const goToNext = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, totalSteps]);

  const goToPrevious = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const submit = useCallback(async () => {
    const submission: SurveySubmission = {
      surveyId,
      responses: Array.from(responses.values()),
      completedAt: new Date().toISOString(),
    };

    try {
      await submitMutation.mutateAsync(submission);
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        alert('응답 데이터 형식이 올바르지 않습니다.');
        console.error('Validation Error:', error);
        return;
      }

      throw error;
    }
  }, [surveyId, responses, submitMutation]);

  return {
    currentStep,
    responses,
    saveResponse,
    goToNext,
    goToPrevious,
    submit,
    isSubmitting: submitMutation.isPending,
    isSubmitted: submitMutation.isSuccess,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === totalSteps - 1,
  };
};
