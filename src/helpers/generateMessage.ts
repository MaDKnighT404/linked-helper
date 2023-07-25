import interpolateVariables from './interpolateVariables';
import { Element, NestedElement } from '../types';

// Функция генерации сообщения используется для генерации сообщения на основе заданного шаблона и набора значений. Шаблон представляет собой вложенную структуру, каждый элемент которой может содержать текстовый шаблон и статус, а также вспомогательные данные. Значения используются для замены переменных в текстовых шаблонах.

const generateMessage = (
  template: NestedElement[],
  values: Record<string, string>,
  arrVarNames: string[]
) => {
  let result = '';

  const recursiveParse = (nestedArr: NestedElement[]): string => {
    let recursiveString = '';

    for (let i = 0; i < nestedArr.length; i++) {
      const element = nestedArr[i];

      if (Array.isArray(element)) {
        recursiveString += recursiveParse(element);
        continue;
      }

      const elementData = element as Element;
      const processedText = interpolateVariables(elementData.text, arrVarNames, values);

      switch (elementData.status) {
        case 'start':
        case 'end':
          recursiveString += processedText + '\n';
          break;
        case 'if':
          let thenBlock = null;
          let elseBlock = null;

          // Find then and else blocks
          for (let j = i + 1; j < nestedArr.length; j++) {
            const nextElement = nestedArr[j];
            if (Array.isArray(nextElement)) {
              continue;
            }

            if ((nextElement as Element).status === 'then') {
              thenBlock = nextElement;
            }
            if ((nextElement as Element).status === 'else') {
              elseBlock = nextElement;
              break;
            }
          }

          let thenText = '';
          let elseText = '';

          // Process 'then' block
          if (Array.isArray(thenBlock)) {
            thenText = recursiveParse(thenBlock);
          } else if (thenBlock) {
            thenText = interpolateVariables((thenBlock as Element).text, arrVarNames, values);
          }

          // Check for 'else' block and process it
          if (elseBlock) {
            if (Array.isArray(elseBlock)) {
              elseText = recursiveParse(elseBlock);
            } else {
              elseText = interpolateVariables((elseBlock as Element).text, arrVarNames, values);
            }
          }

          // Add 'then' or 'else' text to the recursiveString based on 'if' condition
          if (processedText.trim()) {
            recursiveString += thenText + '\n';
          } else if (elseBlock) {
            recursiveString += elseText + '\n';
          }

          break;
        default:
          break;
      }
    }
    return recursiveString;
  };

  result = recursiveParse(template);
  return result.trim();
};

export default generateMessage;
