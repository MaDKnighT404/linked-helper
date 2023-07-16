export function createNewTemplate(
  textareaRef: React.RefObject<HTMLTextAreaElement>,
  template: string,
  variable: string
): string {
  const textarea = textareaRef.current;
  if (!textarea) return '';

  const startPos = textarea.selectionStart || 0;
  const endPos = textarea.selectionEnd || 0;

  const newTemplate =
    template.substring(0, startPos) + `{${variable}}` + template.substring(endPos, template.length);

  textarea.blur();
  textarea.value = newTemplate;

  return newTemplate;
}
