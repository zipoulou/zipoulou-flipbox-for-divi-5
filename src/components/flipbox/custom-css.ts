import { __ } from '@wordpress/i18n';

import metadata from './module.json';


const customCssFields = metadata.customCssFields as Record<
  | 'inner' | 'front' | 'back'
  | 'frontMedia' | 'frontSubtitle' | 'frontTitle' | 'frontContent'
  | 'backSubtitle' | 'backTitle' | 'backContent' | 'backButton',
  { subName: string; selector?: string; selectorSuffix: string; label: string }
>;

customCssFields.inner.label         = __('Inner Wrapper', 'tangible-modules-divi5');
customCssFields.front.label         = __('Front Side', 'tangible-modules-divi5');
customCssFields.back.label          = __('Back Side', 'tangible-modules-divi5');
customCssFields.frontMedia.label    = __('Front Icon / Image', 'tangible-modules-divi5');
customCssFields.frontSubtitle.label = __('Front Subtitle', 'tangible-modules-divi5');
customCssFields.frontTitle.label    = __('Front Title', 'tangible-modules-divi5');
customCssFields.frontContent.label  = __('Front Content', 'tangible-modules-divi5');
customCssFields.backSubtitle.label  = __('Back Subtitle', 'tangible-modules-divi5');
customCssFields.backTitle.label     = __('Back Title', 'tangible-modules-divi5');
customCssFields.backContent.label   = __('Back Content', 'tangible-modules-divi5');
customCssFields.backButton.label    = __('Back Button', 'tangible-modules-divi5');

export const cssFields = { ...customCssFields };
