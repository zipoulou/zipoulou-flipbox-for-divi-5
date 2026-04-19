import { ModuleClassnamesParams, textOptionsClassnames } from '@divi/module';
import { FlipboxAttrs } from './types';


export const moduleClassnames = ({
  classnamesInstance,
  attrs,
}: ModuleClassnamesParams<FlipboxAttrs>): void => {
  classnamesInstance.add(textOptionsClassnames(attrs?.module?.advanced?.text));
};
