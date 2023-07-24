import { Element, NestedElement } from '../types';

// обновляет текст в элементе структуры редактора, который имеет идентификатор, равный rawId, и возвращает обновленную структуру редактора вместе с обновленным текстом. Делит текст на 'текст до курсора' и на 'текст послекурсора'. 
// 'Текст до курсора' сразу же присваивается в свойство text. А 'Текст после курсора' возвращается в массиве как второй элемент.

const updateFocusedElementText = (
  elements: NestedElement[],
  rawId: string,
  cursorPosition: number
): [NestedElement[], string] => {
  let updatedText = '';
  const updatedElements = elements.map((element) => {
    if (Array.isArray(element)) {
      const [updatedNestedElements, nestedUpdatedText] = updateFocusedElementText(
        element,
        rawId,
        cursorPosition
      );
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

export default updateFocusedElementText;
