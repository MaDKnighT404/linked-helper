import { Element, NestedElement } from '../types';

// функция применяет заданное действие (action) ко всем элементам во вложенном массиве (elements), принимая во внимание, что элементы могут быть вложенными массивами.

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
