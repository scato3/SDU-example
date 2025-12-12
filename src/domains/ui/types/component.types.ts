/**
 * Server-Driven UI Component Types
 */

export const ComponentType = {
  HERO: 'hero',
  CARD: 'card',
  LIST: 'list',
  BANNER: 'banner',
  BUTTON_GROUP: 'button_group',
} as const;

export type ComponentType = (typeof ComponentType)[keyof typeof ComponentType];

/**
 * Base Component
 */
export interface BaseComponent {
  id: string;
  type: ComponentType;
}

/**
 * Hero Component
 */
export interface HeroComponent extends BaseComponent {
  type: typeof ComponentType.HERO;
  data: {
    title: string;
    subtitle: string;
    imageUrl: string;
    ctaText?: string;
    ctaUrl?: string;
  };
}

/**
 * Card Component
 */
export interface CardComponent extends BaseComponent {
  type: typeof ComponentType.CARD;
  data: {
    title: string;
    description: string;
    imageUrl?: string;
    badges?: string[];
    link?: string;
  };
}

/**
 * List Component
 */
export interface ListComponent extends BaseComponent {
  type: typeof ComponentType.LIST;
  data: {
    title: string;
    items: Array<{
      id: string;
      text: string;
      icon?: string;
    }>;
  };
}

/**
 * Banner Component
 */
export interface BannerComponent extends BaseComponent {
  type: typeof ComponentType.BANNER;
  data: {
    message: string;
    variant: 'info' | 'warning' | 'success' | 'error';
    dismissible: boolean;
  };
}

/**
 * Button Group Component
 */
export interface ButtonGroupComponent extends BaseComponent {
  type: typeof ComponentType.BUTTON_GROUP;
  data: {
    buttons: Array<{
      id: string;
      label: string;
      variant: 'primary' | 'secondary' | 'outline';
      url?: string;
      action?: string;
    }>;
  };
}

/**
 * Union type for all components
 */
export type UIComponent =
  | HeroComponent
  | CardComponent
  | ListComponent
  | BannerComponent
  | ButtonGroupComponent;

/**
 * Server Response
 */
export interface UIScreenResponse {
  screenId: string;
  title: string;
  components: UIComponent[];
}
