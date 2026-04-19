import { placeholderContent as placeholder } from '@divi/module-utils';

import { FlipboxAttrs } from './types';


export const placeholderContent: FlipboxAttrs = {
  flipbox: {
    innerContent: {
      desktop: {
        value: {
          trigger: 'hover',
          type: 'flip',
          direction: 'right',
          duration: '600ms',
          autoInterval: '4s',
          preset: 'classic',
          layout: 'content',
          sizeMode: 'minHeight',
          aspectRatio: '4/3',
          minHeight: '320px',
          fixedHeight: '320px',
        },
      },
    },
  },
  frontMedia: {
    innerContent: {
      desktop: {
        value: {
          useIcon: 'on',
          icon: '&#x21;||divi||400',
        },
      },
    },
  },
  frontSubtitle: {
    innerContent: { desktop: { value: 'Front Subtitle' } },
  },
  frontTitle: {
    innerContent: { desktop: { value: placeholder.title } },
  },
  frontContent: {
    innerContent: { desktop: { value: placeholder.body } },
  },
  backSubtitle: {
    innerContent: { desktop: { value: 'Back Subtitle' } },
  },
  backTitle: {
    innerContent: { desktop: { value: placeholder.title } },
  },
  backContent: {
    innerContent: { desktop: { value: placeholder.body } },
  },
  backButton: {
    innerContent: {
      desktop: {
        value: {
          text: 'Learn More',
          url: '#',
          target: 'off',
        },
      },
    },
  },
};
