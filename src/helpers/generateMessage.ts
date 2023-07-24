import interpolateVariables from './interpolateVariables';
import { Element, NestedElement } from '../types';

// Функция генерации сообщения
const generateMessage = (template: NestedElement[], values: Record<string, string>, arrVarNames: string[]) => {
  
  let result = '';

  const recursiveParse = (nestedArr: NestedElement[]): string => {
    let recursiveString = '';

    for (let i = 0; i < nestedArr.length; i++) {
      const element = nestedArr[i];
      if (Array.isArray(element)) {
        recursiveString += recursiveParse(element);
      } else {
        const elementData = element as Element;

        if (elementData.text !== undefined) {
          const processedText = interpolateVariables(elementData.text, arrVarNames, values);

          if (elementData.status === 'start') {
            recursiveString += processedText + ' ';
          } else if (elementData.status === 'if') {
            const condition = processedText.trim();
            if (condition !== '') {
              // Обрабатываем блок "THEN"
              i++;
              const thenElement = nestedArr[i] as Element;
              const thenText = interpolateVariables(thenElement.text, arrVarNames, values);
              recursiveString += thenText + ' ';
            } else {
              // Пропускаем блок "THEN"
              i++;
              // Обрабатываем блок "ELSE"
              i++;
              const elseElement = nestedArr[i] as Element;
              const elseText = interpolateVariables(elseElement.text, arrVarNames, values);
              recursiveString += elseText + ' ';
            }
          } else if (elementData.status === 'end') {
            const endText = interpolateVariables(elementData.text, arrVarNames, values);
            recursiveString += endText + ' ';
          }
        }
      }
    }
    return recursiveString;
  };

  result = recursiveParse(template);
  return result;
};

export default generateMessage;
