import {
  type Metadata,
  type ModuleLibrary,
} from '@divi/types';

import metadata from './module.json';
import defaultRenderAttributes from './module-default-render-attributes.json';
import defaultPrintedStyleAttributes from './module-default-printed-style-attributes.json';
import { FlipboxEdit } from './edit';
import { FlipboxAttrs } from './types';
import { placeholderContent } from './placeholder-content';

import './style.scss';
import './module.scss';
import './presets.scss';


export const flipbox: ModuleLibrary.Module.RegisterDefinition<FlipboxAttrs> = {
  metadata:                 metadata as Metadata.Values<FlipboxAttrs>,
  defaultAttrs:             defaultRenderAttributes as Metadata.DefaultAttributes<FlipboxAttrs>,
  defaultPrintedStyleAttrs: defaultPrintedStyleAttributes as Metadata.DefaultAttributes<FlipboxAttrs>,
  placeholderContent,
  renderers: {
    edit: FlipboxEdit,
  },
};
