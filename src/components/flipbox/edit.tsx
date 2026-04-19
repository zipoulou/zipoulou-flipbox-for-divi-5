import React, { ReactElement } from 'react';

import { ModuleContainer } from '@divi/module';
import { getAttrByMode } from '@divi/module-utils';

import { FlipboxEditProps } from './types';
import { ModuleStyles } from './styles';
import { moduleClassnames } from './module-classnames';
import { ModuleScriptData } from './module-script-data';


export const FlipboxEdit = (props: FlipboxEditProps): ReactElement => {
  const { attrs, elements, id, name } = props;

  const mediaAttr   = getAttrByMode(attrs?.frontMedia?.innerContent);
  const isUsingIcon = 'on' === (mediaAttr?.useIcon ?? 'off');
  const hasMediaSrc = Boolean(mediaAttr?.src);
  const hasIcon     = Boolean(mediaAttr?.icon);
  const showIcon    = isUsingIcon && hasIcon;
  const showImage   = !isUsingIcon && hasMediaSrc;

  const buttonAttr   = getAttrByMode(attrs?.backButton?.innerContent);
  const buttonText   = buttonAttr?.text ?? '';
  const buttonUrl    = buttonAttr?.url ?? '#';
  const buttonTarget = 'on' === buttonAttr?.target ? '_blank' : undefined;

  const flipboxAttr = getAttrByMode(attrs?.flipbox?.innerContent);
  const trigger     = flipboxAttr?.trigger ?? 'hover';
  const direction   = flipboxAttr?.direction ?? 'right';
  const duration    = flipboxAttr?.duration ?? '600ms';

  const innerStyle = { ['--tmd-duration' as any]: duration } as React.CSSProperties;

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
      <div
        className="tmd5_flipbox__inner"
        data-tmd-trigger={trigger}
        data-tmd-direction={direction}
        style={innerStyle}
      >
        <div className="tmd5_flipbox__front">
          {(showIcon || showImage) && (
            <div className="tmd5_flipbox__front-media">
              {showIcon && elements.render({
                attrName: 'frontMedia',
                tagName: 'span',
                skipChildren: true,
                className: 'et-pb-icon',
              })}
              {showImage && elements.render({
                attrName: 'frontMedia',
                elementType: 'image',
              })}
            </div>
          )}
          {elements.render({ attrName: 'frontSubtitle' })}
          {elements.render({ attrName: 'frontTitle' })}
          {elements.render({ attrName: 'frontContent' })}
        </div>
        <div className="tmd5_flipbox__back">
          {elements.render({ attrName: 'backSubtitle' })}
          {elements.render({ attrName: 'backTitle' })}
          {elements.render({ attrName: 'backContent' })}
          {buttonText && (
            <a
              className="tmd5_flipbox__back-button"
              href={buttonUrl}
              target={buttonTarget}
              rel={buttonTarget ? 'noopener noreferrer' : undefined}
            >
              {buttonText}
            </a>
          )}
        </div>
      </div>
    </ModuleContainer>
  );
};
