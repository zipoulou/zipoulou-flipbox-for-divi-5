import { omit } from 'lodash';

import { addAction } from '@wordpress/hooks';

import { registerModule } from '@divi/module-library';

import { flipbox } from './components/flipbox';

import './module-icons';

// Register Tangible modules with Divi 5 Module Library.
addAction(
  'divi.moduleLibrary.registerModuleLibraryStore.after',
  'tangibleModules',
  () => {
    registerModule(flipbox.metadata, omit(flipbox, 'metadata'));
  }
);
