/**
 * Zod Schemas for UI Domain
 *
 * 공통 스키마를 재사용하여 중복 제거
 */

import { z } from 'zod';

/**
 * Common Schemas
 */
const BaseComponentSchema = z.object({
  id: z.string(),
});

/**
 * Component Type Schemas
 */
export const HeroComponentSchema = BaseComponentSchema.extend({
  type: z.literal('hero'),
  data: z.object({
    title: z.string(),
    subtitle: z.string(),
    imageUrl: z.string(),
    ctaText: z.string().optional(),
    ctaUrl: z.string().optional(),
  }),
});

export const CardComponentSchema = BaseComponentSchema.extend({
  type: z.literal('card'),
  data: z.object({
    title: z.string(),
    description: z.string(),
    imageUrl: z.string().optional(),
    badges: z.array(z.string()).optional(),
    link: z.string().optional(),
  }),
});

export const ListComponentSchema = BaseComponentSchema.extend({
  type: z.literal('list'),
  data: z.object({
    title: z.string(),
    items: z.array(
      z.object({
        id: z.string(),
        text: z.string(),
        icon: z.string().optional(),
      })
    ),
  }),
});

export const BannerComponentSchema = BaseComponentSchema.extend({
  type: z.literal('banner'),
  data: z.object({
    message: z.string(),
    variant: z.enum(['info', 'warning', 'success', 'error']),
    dismissible: z.boolean(),
  }),
});

export const ButtonGroupComponentSchema = BaseComponentSchema.extend({
  type: z.literal('button_group'),
  data: z.object({
    buttons: z.array(
      z.object({
        id: z.string(),
        label: z.string(),
        variant: z.enum(['primary', 'secondary', 'outline']),
        url: z.string().optional(),
        action: z.string().optional(),
      })
    ),
  }),
});

/**
 * Union Schema
 */
export const UIComponentSchema = z.discriminatedUnion('type', [
  HeroComponentSchema,
  CardComponentSchema,
  ListComponentSchema,
  BannerComponentSchema,
  ButtonGroupComponentSchema,
]);

/**
 * Screen Response Schema
 */
export const UIScreenResponseSchema = z.object({
  screenId: z.string(),
  title: z.string(),
  components: z.array(UIComponentSchema),
});
