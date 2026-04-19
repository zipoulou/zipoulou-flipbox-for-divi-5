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

export type FlipboxAnimationType =
  | 'flip'
  | 'slide'
  | 'fade'
  | 'zoomIn'
  | 'zoomOut'
  | 'blur';

export type FlipboxPreset =
  | 'classic'
  | 'minimal'
  | 'badge'
  | 'stats'
  | 'profile'
  | 'split'
  | 'gallery'
  | 'showcase';

export interface FlipboxSettingsInner {
  trigger?: 'hover' | 'click' | 'auto';
  type?: FlipboxAnimationType;
  direction?: 'right' | 'left' | 'up' | 'down';
  duration?: string;
  autoInterval?: string;
  preset?: FlipboxPreset;
  layout?: 'content' | 'textOnly' | 'mediaOnly' | 'imageCover';
  sizeMode?: 'minHeight' | 'aspect' | 'fixed';
  aspectRatio?: '1/1' | '10/11' | '4/3' | '3/2' | '16/9' | '2/1';
  minHeight?: string;
  fixedHeight?: string;
}

export interface FlipboxAttrs extends InternalAttrs {
  css?: FlipboxCssGroupAttr;

  flipbox?: {
    innerContent?: FormatBreakpointStateAttr<FlipboxSettingsInner>;
  };

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
      fit?: FormatBreakpointStateAttr<'cover' | 'contain'>;
      zoom?: FormatBreakpointStateAttr<string>;
      objectPosition?: FormatBreakpointStateAttr<string>;
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
