import { Element, NestedElement } from '../types';

//используется для вставки нового блока (newBlock) сразу после указанного элемента (rawId) во вложенной структуре (elements).


const insertBlockAfterFocused = (
  elements: NestedElement[],
  newBlock: Element[],
  rawId: string
): NestedElement[] => {
  let insert = false; // флаг для поиска момента, когда нужно вставлять новый блок

  return elements.reduce((acc: NestedElement[], element: NestedElement) => {
    if (Array.isArray(element)) {
      acc.push(insertBlockAfterFocused(element, newBlock, rawId)); // если массив, то рекурсивно ещё раз себя вызывает
    } else {
      const elementData = element as Element;
      acc.push(elementData); // если не массив - добавляем в аккумулятор
      if (elementData.id === rawId) {
        insert = true; // если не массив и совпадают id, то меняем флаг.
      }
    }

    if (insert) {  // ждем когда флаг станет true, после чего закидываем newBlock в аккумулирующий массив
      acc.push(newBlock);
      insert = false; // и сбрасываем фглаг сразу
    }

    return acc;
  }, []);
};

export default insertBlockAfterFocused;
