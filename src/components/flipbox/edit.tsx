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
  const buttonText   = (buttonAttr?.text ?? '').trim();
  const buttonUrl    = buttonAttr?.url ?? '#';
  const buttonTarget = 'on' === buttonAttr?.target ? '_blank' : undefined;

  const flipboxAttr   = getAttrByMode(attrs?.flipbox?.innerContent);
  const trigger       = flipboxAttr?.trigger      ?? 'hover';
  const animType      = flipboxAttr?.type         ?? 'flip';
  const direction     = flipboxAttr?.direction    ?? 'right';
  const duration      = flipboxAttr?.duration     ?? '600ms';
  const autoInterval  = flipboxAttr?.autoInterval ?? '4s';
  const preset        = flipboxAttr?.preset       ?? 'classic';
  const layout        = flipboxAttr?.layout       ?? 'content';
  const sizeMode     = flipboxAttr?.sizeMode     ?? 'minHeight';
  const aspectRatio  = flipboxAttr?.aspectRatio  ?? '4/3';
  const minHeight    = flipboxAttr?.minHeight    ?? '320px';
  const fixedHeight  = flipboxAttr?.fixedHeight  ?? '320px';
  const hintEnabled  = (flipboxAttr?.hintEnabled  ?? 'on') === 'on';
  const hintPosition = flipboxAttr?.hintPosition ?? 'bottomRight';
  const hintIconRaw  = flipboxAttr?.hintIcon     ?? '';
  const wobbleEnabled = (flipboxAttr?.wobbleEnabled ?? 'on') === 'on';
  const fitRaw       = getAttrByMode(attrs?.frontMedia?.advanced?.fit);
  const fit          = (typeof fitRaw === 'string' ? fitRaw : 'cover') || 'cover';
  const zoomRaw      = getAttrByMode(attrs?.frontMedia?.advanced?.zoom);
  const zoom         = (typeof zoomRaw === 'string' ? zoomRaw : '100%') || '100%';
  const objPosRaw    = getAttrByMode(attrs?.frontMedia?.advanced?.objectPosition);
  const objectPosition = (typeof objPosRaw === 'string' ? objPosRaw : 'center center') || 'center center';

  const zoomScale = (() => {
    const m = String(zoom).match(/^(\d+(?:\.\d+)?)/);
    const pct = m ? parseFloat(m[1]) : 100;
    return (pct / 100).toString();
  })();

  const innerStyle: React.CSSProperties & Record<string, string> = {
    '--tmd-duration':        duration,
    '--tmd-aspect-ratio':    aspectRatio,
    '--tmd-min-height':      minHeight,
    '--tmd-fixed-height':    fixedHeight,
    '--tmd-media-fit':       fit,
    '--tmd-media-zoom':      zoomScale,
    '--tmd-media-position':  objectPosition,
  };

  const showMedia = layout !== 'textOnly' && (showIcon || showImage);
  const showText  = layout !== 'mediaOnly';

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
        data-tmd-type={animType}
        data-tmd-direction={direction}
        data-tmd-preset={preset}
        data-tmd-layout={layout}
        data-tmd-size-mode={sizeMode}
        data-tmd-auto-interval={autoInterval}
        data-tmd-wobble={wobbleEnabled ? '1' : '0'}
        style={innerStyle}
      >
        <div className="tmd5_flipbox__front">
          {showMedia && (
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
          {showText && elements.render({ attrName: 'frontSubtitle' })}
          {showText && elements.render({ attrName: 'frontTitle' })}
          {showText && elements.render({ attrName: 'frontContent' })}
          {hintEnabled && (
            <span
              className={`tmd5_flipbox__hint tmd5_flipbox__hint--${hintPosition}`}
              aria-hidden="true"
            >
              {hintIconRaw ? (
                <span
                  className="et-pb-icon"
                  data-icon={hintIconRaw.split('||')[0]}
                >
                  {String.fromCodePoint(parseInt(
                    (hintIconRaw.split('||')[0] || '').replace(/^&#x/, '').replace(/;$/, '') || '0',
                    16,
                  ) || 0) || ''}
                </span>
              ) : (
                <svg className="tmd5_flipbox__hint-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 12a8 8 0 1 1-2.34-5.66M20 4v5h-5"
                  />
                </svg>
              )}
            </span>
          )}
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
