import { z } from 'zod';

export const RatingSchema = z.object({
  value: z.number().min(1, 'Please select a rating').max(5),
});

export const TextSchema = z.object({
  value: z.string().min(1, 'Please enter your feedback'),
});

export const MultiSelectSchema = z.object({
  value: z.array(z.string()).min(1, 'Please select at least one option'),
});

export const validateStepValue = (
  componentType: string,
  value: unknown
): { valid: boolean; error?: string } => {
  try {
    switch (componentType) {
      case 'hero':
      case 'banner':
        return { valid: true };

      case 'card': {
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
