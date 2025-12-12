/**
 * Component Renderer
 *
 * CLAUDE.md 규칙:
 * - UI 렌더링만 담당
 * - 비즈니스 로직 금지
 */

import { ComponentType, UIComponent } from '../types/component.types';
import { HeroComponent } from './HeroComponent';
import { CardComponent } from './CardComponent';
import { ListComponent } from './ListComponent';
import { BannerComponent } from './BannerComponent';
import { ButtonGroupComponent } from './ButtonGroupComponent';

/**
 * 타입 기반 컴포넌트 렌더링
 *
 * switch-case로 TypeScript가 자동으로 타입 추론
 * Exhaustive check로 모든 케이스 보장
 */
export const ComponentRenderer = ({
  component,
}: {
  component: UIComponent;
}) => {
  switch (component.type) {
    case ComponentType.HERO:
      return <HeroComponent component={component} />;

    case ComponentType.CARD:
      return <CardComponent component={component} />;

    case ComponentType.LIST:
      return <ListComponent component={component} />;

    case ComponentType.BANNER:
      return <BannerComponent component={component} />;

    case ComponentType.BUTTON_GROUP:
      return <ButtonGroupComponent component={component} />;

    default: {
      const _exhaustive: never = component;
      return null;
    }
  }
};
