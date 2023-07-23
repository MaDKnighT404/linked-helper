import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Element, NestedElement } from '../types';

const recursiveAdjustment = (elements: NestedElement[], targetDeepLevel: number, targetCount: number, decrementLevelFrom: number): NestedElement[] => {
  return elements.reduce((acc: NestedElement[], element: NestedElement) => {
    if (Array.isArray(element)) {
      const newNestedArray = recursiveAdjustment(element, targetDeepLevel, targetCount, decrementLevelFrom);
      acc.push(newNestedArray);
    } else {
      const elementData = element as Element;
      if (!(elementData.deepLevel === targetDeepLevel && elementData.count === targetCount && elementData.status !== 'status - start')) {
        if (elementData.deepLevel > decrementLevelFrom) {
          elementData.deepLevel -= 1;
        }
        acc.push(elementData);
      }
    }
    return acc;
  }, []);
};

const useEditorHooks = () => {
  const [focusedElementId, setFocusedElementId] = useState<string | null>(null);
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [editorStructure, setEditorStructure] = useState<NestedElement[]>([
    [{ text: 'start', id: nanoid(), deepLevel: 1, count: 1, status: 'status - start' }],
    [
      { text: 'if 1-1', id: nanoid(), deepLevel: 1, count: 1, status: 'if' },
      { text: 'then 1-1', id: nanoid(), deepLevel: 1, count: 1, status: 'then' },
      [
        { text: 'if 2-1', id: nanoid(), deepLevel: 2, count: 1, status: 'if' },
        { text: 'then 2-1', id: nanoid(), deepLevel: 2, count: 1, status: 'then' },
        [
          { text: 'if 3-1', id: nanoid(), deepLevel: 3, count: 1, status: 'if' },
          { text: 'then 3-1', id: nanoid(), deepLevel: 3, count: 1, status: 'then' },
          [
            { text: 'if 4-1', id: nanoid(), deepLevel: 4, count: 1, status: 'if' },
            { text: 'then 4-1', id: nanoid(), deepLevel: 4, count: 1, status: 'then' },
            { text: 'else 4-1', id: nanoid(), deepLevel: 4, count: 1, status: 'else' },
            { text: 'end 4-1', id: nanoid(), deepLevel: 4, count: 1, status: 'status - end' },
          ],
          { text: 'else 3-1', id: nanoid(), deepLevel: 3, count: 1, status: 'else' },
          { text: 'end 3-1', id: nanoid(), deepLevel: 3, count: 1, status: 'status - end' },
        ],
        { text: 'else 2-1', id: nanoid(), deepLevel: 2, count: 1, status: 'else' },
        { text: 'end 2-1', id: nanoid(), deepLevel: 2, count: 1, status: 'status - end' },
      ],
      { text: 'else 1-1', id: nanoid(), deepLevel: 1, count: 1, status: 'else' },
      [
        { text: 'if 2-2', id: nanoid(), deepLevel: 2, count: 2, status: 'if' },
        { text: 'then 2-2', id: nanoid(), deepLevel: 2, count: 2, status: 'then' },
        { text: 'else 2-2', id: nanoid(), deepLevel: 2, count: 2, status: 'else' },
        { text: 'end 2-2', id: nanoid(), deepLevel: 2, count: 2, status: 'status - end' },
      ],
      { text: 'end 1-1', id: nanoid(), deepLevel: 1, count: 1, status: 'status - end' },
    ],
  ]);

  const handleSetFocus = (e: HTMLTextAreaElement) => {
    setFocusedElementId(e.id);
  };

  const handleDeleteButtonClick = (deepLevel: number, count: number) => {
    const newEditorStructure = recursiveAdjustment(editorStructure, deepLevel, count, deepLevel);
    setEditorStructure(newEditorStructure);
  };

  const handleTextareaChange = (id: string, value: string) => {
    const updateTextInNestedArray = (elements: NestedElement[]): NestedElement[] => {
      return elements.map((element) => {
        if (Array.isArray(element)) {
          return updateTextInNestedArray(element);
        } else {
          const elementData = element as Element;
          if (elementData.id === id) {
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
    const updateTextInNestedArray = (elements: NestedElement[]): NestedElement[] => {
      return elements.map((element) => {
        if (Array.isArray(element)) {
          return updateTextInNestedArray(element);
        } else {
          const elementData = element as Element;
          if (elementData.id === focusedElementId) {
            const newText = [elementData.text.slice(0, cursorPosition), variableText, elementData.text.slice(cursorPosition)].join('');
            return { ...elementData, text: newText };
          }
          return elementData;
        }
      });
    };
    setCursorPosition(0);
    const newEditorStructure = updateTextInNestedArray(editorStructure);
    setEditorStructure(newEditorStructure);
  };

  const handleCursorPositionChange = (position: number) => {
    setCursorPosition(position);
  };

  return {
    focusedElementId,
    cursorPosition,
    editorStructure,
    handleSetFocus,
    handleDeleteButtonClick,
    handleTextareaChange,
    handleVariableButtonClick,
    handleCursorPositionChange
  };
};

export default useEditorHooks;
