import { placeholderContent as placeholder } from '@divi/module-utils';

import { FlipboxAttrs } from './types';


export const placeholderContent: FlipboxAttrs = {
  frontTitle: {
    innerContent: {
      desktop: { value: placeholder.title },
    },
  },
  frontContent: {
    innerContent: {
      desktop: { value: placeholder.body },
    },
  },
  backTitle: {
    innerContent: {
      desktop: { value: placeholder.title },
    },
  },
  backContent: {
    innerContent: {
      desktop: { value: placeholder.body },
    },
  },
};
