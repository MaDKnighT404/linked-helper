export type CompletedTemplateItem = {
  start?: string;
  if: string;
  then: string;
  else: string;
  end: string;
};

export type FocusedItem = {
  focusedTextaria: HTMLTextAreaElement;
  deepLevel: number;
};
