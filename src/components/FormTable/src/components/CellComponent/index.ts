import type { FunctionalComponent, defineComponent } from 'vue';
import type { ComponentType } from '@/components/Table/src/types/componentType';
import { componentMap } from '@/components/Table/src/componentMap';

import { h } from 'vue';

export interface ComponentProps {
  component: ComponentType;
}

export const CellComponent: FunctionalComponent = (
  { component = 'NInput' }: ComponentProps,
  { attrs },
) => {
  const Comp = componentMap.get(component) as typeof defineComponent;
  const DefaultComp = h(Comp, attrs);
  return DefaultComp;
};
