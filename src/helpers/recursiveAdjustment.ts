import { Element, NestedElement } from '../types';

const recursiveAdjustment = (
  elements: NestedElement[],
  targetDeepLevel: number,
  targetCount: number,
  decrementLevelFrom: number
): NestedElement[] => {
  return elements.reduce((acc: NestedElement[], element: NestedElement) => {
    if (Array.isArray(element)) {
      const newNestedArray = recursiveAdjustment(
        element,
        targetDeepLevel,
        targetCount,
        decrementLevelFrom
      );
      if (newNestedArray.length > 0) {
        acc.push(newNestedArray);
      }
    } else {
      const elementData = element as Element;
      if (
        !(
          elementData.deepLevel === targetDeepLevel &&
          elementData.count === targetCount &&
          elementData.status !== 'start'
        )
      ) {
        if (elementData.deepLevel > decrementLevelFrom) {
          elementData.deepLevel -= 1;
        }
        acc.push(elementData);
      }
    }
    return acc;
  }, []);
};

export default recursiveAdjustment;
