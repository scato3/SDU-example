/**
 * Step Validation Schemas
 */

import { z } from 'zod';

/**
 * 별점 검증
 */
export const RatingSchema = z.object({
  value: z.number().min(1, 'Please select a rating').max(5),
});

/**
 * 텍스트 검증
 */
export const TextSchema = z.object({
  value: z.string().min(1, 'Please enter your feedback'),
});

/**
 * 다중 선택 검증
 */
export const MultiSelectSchema = z.object({
  value: z.array(z.string()).min(1, 'Please select at least one option'),
});

/**
 * 컴포넌트 타입별 검증
 */
export const validateStepValue = (
  componentType: string,
  value: unknown
): { valid: boolean; error?: string } => {
  try {
    switch (componentType) {
      case 'hero':
      case 'banner':
        // 입력 불필요 - 항상 통과
        return { valid: true };

      case 'card': {
        // 숫자면 별점, 문자열이면 텍스트
        if (typeof value === 'number') {
          RatingSchema.parse({ value });
        } else {
          TextSchema.parse({ value });
        }
        return { valid: true };
      }

      case 'list': {
        MultiSelectSchema.parse({ value });
        return { valid: true };
      }

      default:
        return { valid: true };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { valid: false, error: error.issues[0]?.message };
    }
    return { valid: false, error: 'Invalid input' };
  }
};
