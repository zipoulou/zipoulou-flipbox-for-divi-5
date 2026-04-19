import React, { ReactElement } from 'react';

import {
  StyleContainer,
  StylesProps,
  CssStyle,
} from '@divi/module';

import { FlipboxAttrs } from './types';
import { cssFields } from './custom-css';


export const ModuleStyles = ({
  attrs,
  elements,
  settings,
  orderClass,
  mode,
  state,
  noStyleTag,
}: StylesProps<FlipboxAttrs>): ReactElement => {
  const textSelector = `${orderClass} .tmd5_flipbox__inner`;

  return (
    <StyleContainer mode={mode} state={state} noStyleTag={noStyleTag}>
      {elements.style({
        attrName: 'module',
        styleProps: {
          disabledOn: {
            disabledModuleVisibility: settings?.disabledModuleVisibility,
          },
          advancedStyles: [
            {
              componentName: 'divi/text',
              props: {
                selector: textSelector,
                attr: attrs?.module?.advanced?.text,
              },
            },
          ],
        },
      })}

      {elements.style({
        attrName: 'frontMedia',
        styleProps: {
          advancedStyles: [
            {
              componentName: 'divi/common',
              props: {
                attr: attrs?.frontMedia?.advanced?.color,
                property: 'color',
                selector: `${orderClass} .tmd5_flipbox__front-media .et-pb-icon`,
              },
            },
          ],
        },
      })}

      {elements.style({ attrName: 'frontSubtitle' })}
      {elements.style({ attrName: 'frontTitle' })}
      {elements.style({ attrName: 'frontContent' })}
      {elements.style({ attrName: 'backSubtitle' })}
      {elements.style({ attrName: 'backTitle' })}
      {elements.style({ attrName: 'backContent' })}
      {elements.style({ attrName: 'backButton' })}

      <CssStyle
        selector={orderClass}
        attr={attrs.css}
        cssFields={cssFields}
      />
    </StyleContainer>
  );
};
