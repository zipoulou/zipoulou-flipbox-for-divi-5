import { addFilter } from '@wordpress/hooks';

import { moduleFlipbox } from './icons';

// Register Tangible module icons in the Divi icon library.
addFilter('divi.iconLibrary.icon.map', 'tangibleModules', (icons: Record<string, unknown>) => ({
  ...icons,
  [moduleFlipbox.name]: moduleFlipbox,
}));
