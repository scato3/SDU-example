import { NextRequest, NextResponse } from 'next/server';
import { UIScreenResponse } from '@/domains/ui/types/component.types';

/**
 * Mock Data for Server-Driven UI Screens
 */
const mockScreens: Record<string, UIScreenResponse> = {
  home: {
    screenId: 'home',
    title: 'Home Screen',
    components: [
      {
        id: 'hero-1',
        type: 'hero',
        data: {
          title: 'Welcome to Server-Driven UI',
          subtitle: 'Build dynamic interfaces with type-safe components',
          imageUrl: 'https://picsum.photos/800/400',
          ctaText: 'Get Started',
          ctaUrl: '/explore',
        },
      },
      {
        id: 'banner-1',
        type: 'banner',
        data: {
          message: 'New features available! Check out our latest updates.',
          variant: 'info',
          dismissible: true,
        },
      },
      {
        id: 'button-group-1',
        type: 'button_group',
        data: {
          buttons: [
            {
              id: 'btn-1',
              label: 'Primary Action',
              variant: 'primary',
              url: '/action',
            },
            {
              id: 'btn-2',
              label: 'Secondary Action',
              variant: 'secondary',
              url: '/secondary',
            },
          ],
        },
      },
    ],
  },
  explore: {
    screenId: 'explore',
    title: 'Explore',
    components: [
      {
        id: 'card-1',
        type: 'card',
        data: {
          title: 'Featured Content',
          description: 'Discover amazing content curated just for you',
          imageUrl: 'https://picsum.photos/400/300',
          badges: ['New', 'Popular'],
          link: '/details/1',
        },
      },
      {
        id: 'card-2',
        type: 'card',
        data: {
          title: 'Trending Now',
          description: 'See what everyone is talking about',
          imageUrl: 'https://picsum.photos/400/301',
          badges: ['Trending'],
          link: '/details/2',
        },
      },
      {
        id: 'list-1',
        type: 'list',
        data: {
          title: 'Quick Links',
          items: [
            { id: '1', text: 'Documentation', icon: '📚' },
            { id: '2', text: 'API Reference', icon: '🔧' },
            { id: '3', text: 'Examples', icon: '💡' },
            { id: '4', text: 'Community', icon: '👥' },
          ],
        },
      },
    ],
  },
  settings: {
    screenId: 'settings',
    title: 'Settings',
    components: [
      {
        id: 'banner-2',
        type: 'banner',
        data: {
          message: 'Your changes will be saved automatically',
          variant: 'success',
          dismissible: false,
        },
      },
      {
        id: 'list-2',
        type: 'list',
        data: {
          title: 'Preferences',
          items: [
            { id: '1', text: 'Account Settings', icon: '⚙️' },
            { id: '2', text: 'Privacy', icon: '🔒' },
            { id: '3', text: 'Notifications', icon: '🔔' },
            { id: '4', text: 'Language', icon: '🌐' },
          ],
        },
      },
    ],
  },
  error: {
    screenId: 'error',
    title: 'Error Screen',
    components: [
      {
        id: 'banner-3',
        type: 'banner',
        data: {
          message: 'This screen is designed to trigger an error for testing',
          variant: 'error',
          dismissible: true,
        },
      },
    ],
  },
};

/**
 * GET /api/screens/[screenId]
 *
 * 서버드리븐 UI 데이터를 반환하는 API
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ screenId: string }> }
) {
  const { screenId } = await params;

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Special case: simulate error
  if (screenId === 'error-500') {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }

  // Special case: simulate unauthorized
  if (screenId === 'error-401') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // Special case: simulate forbidden
  if (screenId === 'error-403') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  const screen = mockScreens[screenId];

  if (!screen) {
    return NextResponse.json({ message: 'Screen not found' }, { status: 404 });
  }

  return NextResponse.json(screen);
}
