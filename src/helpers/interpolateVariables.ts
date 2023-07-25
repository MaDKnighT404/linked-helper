//заменяет в переданной строке переменные в виде {variable} на их соответствующие значения.
const interpolateVariables = (
  template: string | null,
  arrVarNames: string[],
  values: Record<string, string>
): string => {
  if (template === null || template === undefined) {
    return '';
  }

  const regex = /\{([^}]+)\}/g;

  const generatedMessage = template?.replace(regex, (_, variable: string) => {
    // Заменяем только переменные, которые присутствуют в arrVarNames
    if (arrVarNames.includes(variable)) {
      return values[variable] || '';
    }
    // В противном случае оставляем переменную в тексте без изменений
    return `{${variable}}`;
  });

  return generatedMessage;
};
export default interpolateVariables;
