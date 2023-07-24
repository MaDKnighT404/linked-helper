import { Element, NestedElement } from '../types';

const updateNestedArray = (
  elements: NestedElement[],
  action: (element: Element) => Element
): NestedElement[] => {
  return elements.map((element) => {
    if (Array.isArray(element)) {
      return updateNestedArray(element, action);
    } else {
      const elementData = element as Element;
      return action(elementData);
    }
  });
};

export default updateNestedArray;
