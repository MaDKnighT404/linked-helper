export function adjustTextareaHeight (textareaRef: React.RefObject<HTMLTextAreaElement>) {
  const textarea = textareaRef.current;
  if (!textarea) return;

  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;
};
