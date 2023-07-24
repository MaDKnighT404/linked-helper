import { Element, NestedElement } from '../types';
import updateNestedArray from './updateNestedArray';


const updateTextInElement = (
  editorStructure: NestedElement[],
  setEditorStructure: (structure: NestedElement[]) => void,
  focusedElementId: string | null,
  newTextAction: (elementData: Element) => Element
) => {
  if (!focusedElementId) return;
  const rawId = focusedElementId.split('|')[1];

  const action = (elementData: Element) => {
    if (elementData.id === rawId) {
      return newTextAction(elementData);
    }
    return elementData;
  };

  const newEditorStructure = updateNestedArray(editorStructure, action);
  setEditorStructure(newEditorStructure);
};

export default updateTextInElement;