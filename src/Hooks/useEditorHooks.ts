import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Element, NestedElement } from '../types';
import { insertBlockAfterFocused, recursiveAdjustment, updateFocusedElementText } from '../helpers';

const useEditorHooks = () => {
  const [focusedElementId, setFocusedElementId] = useState<string | null>(null);
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [editorStructure, setEditorStructure] = useState<NestedElement[]>([[{ text: 'start', id: nanoid(), deepLevel: 1, count: 1, status: 'start' }]]);
  const [deepLevelCounts, setDeepLevelCounts] = useState<{ [key: number]: number }>({ 1: 1 });

  const handleSetFocus = (element: HTMLTextAreaElement) => {
    setFocusedElementId(element.id);
  };

  const handleDeleteButtonClick = (deepLevel: number, count: number) => {
    const newEditorStructure = recursiveAdjustment(editorStructure, deepLevel, count, deepLevel);
    setEditorStructure(newEditorStructure);
  };

  const handleTextareaChange = (value: string) => {
    if (!focusedElementId) return;
    const rawId = focusedElementId.split('|')[1];
    const updateTextInNestedArray = (elements: NestedElement[]): NestedElement[] => {
      return elements.map((element) => {
        if (Array.isArray(element)) {
          return updateTextInNestedArray(element);
        } else {
          const elementData = element as Element;
          if (elementData.id === rawId) {
            return { ...elementData, text: value };
          }
          return elementData;
        }
      });
    };

    const newEditorStructure = updateTextInNestedArray(editorStructure);
    setEditorStructure(newEditorStructure);
  };

  const handleVariableButtonClick = (variableText: string) => {
    if (!focusedElementId) return;
    const rawId = focusedElementId.split('|')[1];

    const updateTextInNestedArray = (elements: NestedElement[]): NestedElement[] => {
      return elements.map((element) => {
        if (Array.isArray(element)) {
          return updateTextInNestedArray(element);
        } else {
          const elementData = element as Element;
          if (elementData.id === rawId) {
            const newText = [elementData.text.slice(0, cursorPosition), variableText, elementData.text.slice(cursorPosition)].join('');
            return { ...elementData, text: newText };
          }
          return elementData;
        }
      });
    };
    setFocusedElementId(null);
    const newEditorStructure = updateTextInNestedArray(editorStructure);
    setEditorStructure(newEditorStructure);
  };

  const handleCursorPositionChange = (position: number) => {
    setCursorPosition(position);
  };

  const handleAddNewBlock = () => {
    if (!focusedElementId || cursorPosition === null) return;

    const infoSection = focusedElementId.split('|')[0];
    const rawId = focusedElementId.split('|')[1];

    const cleanedInfo = infoSection.substring(1, infoSection.length - 1);
    const [deepLevelStr, count, status] = cleanedInfo.split(')(');
    console.log(status);
    let currentDeepLevel = parseInt(deepLevelStr);

    if (status !== 'start') {
      currentDeepLevel += 1;
    }

    const newBlockCount = (deepLevelCounts[currentDeepLevel] || 0) + 1;
    setDeepLevelCounts({ ...deepLevelCounts, [currentDeepLevel]: newBlockCount });

    const [editorStructureWithUpdatedText, focusedElementText] = updateFocusedElementText(editorStructure, rawId, cursorPosition);
    const textAfterCursorSplit = focusedElementText.slice(cursorPosition);

    const newBlock = [
      { text: '', id: nanoid(), deepLevel: currentDeepLevel, count: newBlockCount, status: 'if' },
      { text: '', id: nanoid(), deepLevel: currentDeepLevel, count: newBlockCount, status: 'then' },
      { text: '', id: nanoid(), deepLevel: currentDeepLevel, count: newBlockCount, status: 'else' },
      { text: textAfterCursorSplit, id: nanoid(), deepLevel: currentDeepLevel, count: newBlockCount, status: 'end' },
    ];

    const newEditorStructure = insertBlockAfterFocused(editorStructureWithUpdatedText, newBlock, rawId);
    setFocusedElementId(null);
    setEditorStructure(newEditorStructure);
  };

  return {
    focusedElementId,
    cursorPosition,
    editorStructure,
    handleSetFocus,
    handleDeleteButtonClick,
    handleTextareaChange,
    handleVariableButtonClick,
    handleCursorPositionChange,
    handleAddNewBlock,
  };
};

export default useEditorHooks;
