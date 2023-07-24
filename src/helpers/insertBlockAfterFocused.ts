import { Element, NestedElement } from '../types';

const insertBlockAfterFocused = (
  elements: NestedElement[],
  newBlock: Element[],
  rawId: string
): NestedElement[] => {
  let insert = false;

  return elements.reduce((acc: NestedElement[], element: NestedElement) => {
    if (Array.isArray(element)) {
      acc.push(insertBlockAfterFocused(element, newBlock, rawId));
    } else {
      const elementData = element as Element;
      acc.push(elementData);
      if (elementData.id === rawId) {
        insert = true;
      }
    }

    if (insert) {
      acc.push(newBlock);
      insert = false;
    }

    return acc;
  }, []);
};

export default insertBlockAfterFocused;
