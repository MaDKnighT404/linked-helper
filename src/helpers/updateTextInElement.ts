import updateNestedArray from './updateNestedArray';
import { Element, NestedElement } from '../types';

// обновляет текст в заданном элементе структуры редактора.
const updateTextInElement = (
  editorStructure: NestedElement[],
  setEditorStructure: (structure: NestedElement[]) => void,
  focusedElementId: string | null,
  newTextAction: (elementData: Element) => Element
) => {
  if (!focusedElementId) return;
  const rawId = focusedElementId.split('|')[1];

  const action = (elementData: Element) => {
    // применяем функцию newTextAction к тем элементам, у которых совпадают id
    if (elementData.id === rawId) {
      return newTextAction(elementData);
    }
    //или ничего не делаем
    return elementData;
  };

  const newEditorStructure = updateNestedArray(editorStructure, action);
  setEditorStructure(newEditorStructure);
};

export default updateTextInElement;
