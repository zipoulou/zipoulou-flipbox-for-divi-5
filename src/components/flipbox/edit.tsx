import React, { ReactElement } from 'react';

import { ModuleContainer } from '@divi/module';

import { FlipboxEditProps } from './types';
import { ModuleStyles } from './styles';
import { moduleClassnames } from './module-classnames';
import { ModuleScriptData } from './module-script-data';


export const FlipboxEdit = (props: FlipboxEditProps): ReactElement => {
  const { attrs, elements, id, name } = props;

  return (
    <ModuleContainer
      attrs={attrs}
      elements={elements}
      id={id}
      name={name}
      stylesComponent={ModuleStyles}
      classnamesFunction={moduleClassnames}
      scriptDataComponent={ModuleScriptData}
    >
      {elements.styleComponents({ attrName: 'module' })}
      <div className="tmd5_flipbox__inner">
        <div className="tmd5_flipbox__front">
          {elements.render({ attrName: 'frontTitle' })}
          <div className="tmd5_flipbox__front-content-wrap">
            {elements.render({ attrName: 'frontContent' })}
          </div>
        </div>
        <div className="tmd5_flipbox__back">
          {elements.render({ attrName: 'backTitle' })}
          <div className="tmd5_flipbox__back-content-wrap">
            {elements.render({ attrName: 'backContent' })}
          </div>
        </div>
      </div>
    </ModuleContainer>
  );
};
