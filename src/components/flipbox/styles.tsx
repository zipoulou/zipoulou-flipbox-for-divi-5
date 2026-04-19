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

      {elements.style({ attrName: 'frontTitle' })}
      {elements.style({ attrName: 'frontContent' })}
      {elements.style({ attrName: 'backTitle' })}
      {elements.style({ attrName: 'backContent' })}

      <CssStyle
        selector={orderClass}
        attr={attrs.css}
        cssFields={cssFields}
      />
    </StyleContainer>
  );
};
