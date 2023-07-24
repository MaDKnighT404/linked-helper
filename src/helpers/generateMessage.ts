import interpolateVariables from './interpolateVariables';
import { Element, NestedElement } from '../types';

// Функция генерации сообщения используется для генерации сообщения на основе заданного шаблона и набора значений. Шаблон представляет собой вложенную структуру, каждый элемент которой может содержать текстовый шаблон и статус, а также вспомогательные данные. Значения используются для замены переменных в текстовых шаблонах.

const generateMessage = (template: NestedElement[], values: Record<string, string>, arrVarNames: string[]) => {
  
  let result = '';

  const recursiveParse = (nestedArr: NestedElement[]): string => {
    let recursiveString = '';

    for (let i = 0; i < nestedArr.length; i++) { // вызывается для каждого элемента в шаблоне
      const element = nestedArr[i];
      if (Array.isArray(element)) {
        recursiveString += recursiveParse(element); // Если массив, функция вызывается рекурсивно для этого массива
      } else {
        const elementData = element as Element; // если не массив, а объект

        if (elementData.text !== undefined) { 
          const processedText = interpolateVariables(elementData.text, arrVarNames, values); // если есть текст у объекта, то проверям текст на наличие переменных

          if (elementData.status === 'start') { // если это начальный элемент
            recursiveString += processedText + ' '; // добавляем к нему строку из processedText и ставим пробел
          } else if (elementData.status === 'if') { // рассматриваем первый блок в массиве. Это блок IF
            const condition = processedText.trim(); // убираем лишние пробелы
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
