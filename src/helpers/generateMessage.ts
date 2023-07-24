import { Element, NestedElement } from '../types';
import { arrVarNames } from '../components/Main/Main';
// Функция генерации сообщения
export const generateMessage = (array: NestedElement[], values: Record<string, string>) => {
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

  result = recursiveParse(array);
  return result;
};

//заменяет в переданной строке переменные в виде {variable} на их соответствующие значения.
export function interpolateVariables(template: string, arrVarNames: string[], values: Record<string, string>): string {
  if (template === undefined) {
    return '';
  }

  const regex = /\{([^}]+)\}/g;

  const generatedMessage = template.replace(regex, (_, variable: string) => {
    // Заменяем только переменные, которые присутствуют в arrVarNames
    if (arrVarNames.includes(variable)) {
      return values[variable] || '';
    }
    // В противном случае оставляем переменную в тексте без изменений
    return `{${variable}}`;
  });

  return generatedMessage;
}
