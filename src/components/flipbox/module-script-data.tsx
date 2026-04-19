import React, { Fragment, ReactElement } from 'react';

import { ModuleScriptDataProps } from '@divi/module';

import { FlipboxAttrs } from './types';


export const ModuleScriptData = ({
  elements,
}: ModuleScriptDataProps<FlipboxAttrs>): ReactElement => (
  <Fragment>
    {elements.scriptData({ attrName: 'module' })}
  </Fragment>
);
