import { __ } from '@wordpress/i18n';

import metadata from './module.json';


const customCssFields = metadata.customCssFields as Record<
  'inner' | 'front' | 'back' | 'frontTitle' | 'frontContent' | 'backTitle' | 'backContent',
  { subName: string; selector?: string; selectorSuffix: string; label: string }
>;

customCssFields.inner.label        = __('Inner Wrapper', 'tangible-modules-divi5');
customCssFields.front.label        = __('Front Side', 'tangible-modules-divi5');
customCssFields.back.label         = __('Back Side', 'tangible-modules-divi5');
customCssFields.frontTitle.label   = __('Front Title', 'tangible-modules-divi5');
customCssFields.frontContent.label = __('Front Content', 'tangible-modules-divi5');
customCssFields.backTitle.label    = __('Back Title', 'tangible-modules-divi5');
customCssFields.backContent.label  = __('Back Content', 'tangible-modules-divi5');

export const cssFields = { ...customCssFields };
