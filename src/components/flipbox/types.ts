// Divi dependencies.
import { ModuleEditProps } from '@divi/module-library';
import {
  FormatBreakpointStateAttr,
  InternalAttrs,
  type Element,
  type Module,
} from '@divi/types';


export interface FlipboxCssAttr extends Module.Css.AttributeValue {
  inner?: string;
  front?: string;
  back?: string;
  frontTitle?: string;
  frontContent?: string;
  backTitle?: string;
  backContent?: string;
}

export type FlipboxCssGroupAttr = FormatBreakpointStateAttr<FlipboxCssAttr>;

export interface FlipboxAttrs extends InternalAttrs {
  css?: FlipboxCssGroupAttr;

  module?: {
    meta?: Element.Meta.Attributes;
    advanced?: {
      link?: Element.Advanced.Link.Attributes;
      htmlAttributes?: Element.Advanced.IdClasses.Attributes;
      text?: Element.Advanced.Text.Attributes;
    };
    decoration?: Element.Decoration.PickedAttributes<
      | 'animation'
      | 'background'
      | 'border'
      | 'boxShadow'
      | 'disabledOn'
      | 'filters'
      | 'overflow'
      | 'position'
      | 'scroll'
      | 'sizing'
      | 'spacing'
      | 'sticky'
      | 'transform'
      | 'transition'
      | 'zIndex'
    > & {
      attributes?: any;
    };
  };

  frontTitle?: Element.Types.Title.Attributes;
  frontContent?: Element.Types.Content.Attributes;
  backTitle?: Element.Types.Title.Attributes;
  backContent?: Element.Types.Content.Attributes;
}

export type FlipboxEditProps = ModuleEditProps<FlipboxAttrs>;
