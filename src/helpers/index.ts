// helper.ts
import { NestedElement, Element } from '../types';

export const updateFocusedElementText = (elements: NestedElement[], rawId: string, cursorPosition: number): [NestedElement[], string] => {
  let updatedText = '';
  const updatedElements = elements.map((element) => {
    if (Array.isArray(element)) {
      const [updatedNestedElements, nestedUpdatedText] = updateFocusedElementText(element, rawId, cursorPosition);
      updatedText = nestedUpdatedText;
      return updatedNestedElements;
    } else {
      const elementData = element as Element;
      if (elementData.id === rawId) {
        updatedText = elementData.text;
        const textBeforeCursorSplit = elementData.text.slice(0, cursorPosition);
        return { ...elementData, text: textBeforeCursorSplit };
      }
      return elementData;
    }
  });
  return [updatedElements, updatedText];
};

export const insertBlockAfterFocused = (elements: NestedElement[], newBlock: Element[], rawId: string): NestedElement[] => {
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

export const recursiveAdjustment = (elements: NestedElement[], targetDeepLevel: number, targetCount: number, decrementLevelFrom: number): NestedElement[] => {
  return elements.reduce((acc: NestedElement[], element: NestedElement) => {
    if (Array.isArray(element)) {
      const newNestedArray = recursiveAdjustment(element, targetDeepLevel, targetCount, decrementLevelFrom);
      if (newNestedArray.length > 0) {
        acc.push(newNestedArray);
      }
    } else {
      const elementData = element as Element;
      if (!(elementData.deepLevel === targetDeepLevel && elementData.count === targetCount && elementData.status !== 'start')) {
        if (elementData.deepLevel > decrementLevelFrom) {
          elementData.deepLevel -= 1;
        }
        acc.push(elementData);
      }
    }
    return acc;
  }, []);
};

export const concatenateTexts = (elements: NestedElement[]): string => {
  return elements.reduce((acc: string, element: NestedElement) => {
    if (Array.isArray(element)) {
      return acc + concatenateTexts(element);
    } else {
      const elementData = element as Element;
      return acc + `${elementData.status} ${elementData.text} \n`;
    }
  }, '');
};
