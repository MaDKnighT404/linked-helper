export function messageGenerator(template: string, values: Record<string, string>): string {
  const regex = /\{([^}]+)\}/g;
  const generatedMessage = template.replace(
    regex,
    (_: string, variable: string) => values[variable] || ''
  );
  return generatedMessage;
}
