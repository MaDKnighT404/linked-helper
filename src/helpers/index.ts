// helper.ts
import { NestedElement, Element } from '../types';

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

export function messageGenerator(template: string, values: Record<string, string>): string {
  const regex = /\{([^}]+)\}/g;

  const generatedMessage = template.replace(regex, (_, variable: string) => values[variable] || '');

  return generatedMessage;
}


export const recursiveAdjustment = (elements: NestedElement[], targetDeepLevel: number, targetCount: number, decrementLevelFrom: number): NestedElement[] => {
  return elements.reduce((acc: NestedElement[], element: NestedElement) => {
    if (Array.isArray(element)) {
      const newNestedArray = recursiveAdjustment(element, targetDeepLevel, targetCount, decrementLevelFrom);
      acc.push(newNestedArray);
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
