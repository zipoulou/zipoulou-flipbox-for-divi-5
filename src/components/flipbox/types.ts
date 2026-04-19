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
  frontMedia?: string;
  frontSubtitle?: string;
  frontTitle?: string;
  frontContent?: string;
  backSubtitle?: string;
  backTitle?: string;
  backContent?: string;
  backButton?: string;
}

export type FlipboxCssGroupAttr = FormatBreakpointStateAttr<FlipboxCssAttr>;

export interface FlipboxMediaInner {
  useIcon?: string;
  icon?: string;
  src?: string;
  id?: string;
  alt?: string;
  titleText?: string;
}

export interface FlipboxButtonInner {
  text?: string;
  url?: string;
  target?: string;
}

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
    > & { attributes?: any };
  };

  frontMedia?: {
    innerContent?: FormatBreakpointStateAttr<FlipboxMediaInner>;
    advanced?: {
      color?: Element.Decoration.Color.Attributes;
    };
  };

  frontSubtitle?: Element.Types.Title.Attributes;
  frontTitle?: Element.Types.Title.Attributes;
  frontContent?: Element.Types.Content.Attributes;

  backSubtitle?: Element.Types.Title.Attributes;
  backTitle?: Element.Types.Title.Attributes;
  backContent?: Element.Types.Content.Attributes;

  backButton?: {
    innerContent?: FormatBreakpointStateAttr<FlipboxButtonInner>;
    decoration?: {
      background?: Element.Decoration.Background.Attributes;
      border?: Element.Decoration.Border.Attributes;
      boxShadow?: Element.Decoration.BoxShadow.Attributes;
      spacing?: Element.Decoration.Spacing.Attributes;
      font?: Element.Decoration.Font.Attributes;
    };
  };
}

export type FlipboxEditProps = ModuleEditProps<FlipboxAttrs>;
