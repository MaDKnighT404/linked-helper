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
      if (!(elementData.deepLevel === targetDeepLevel && elementData.count === targetCount && elementData.status !== 'start')) {
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
  const [editorStructure, setEditorStructure] = useState<NestedElement[]>([[{ text: 'start', id: nanoid(), deepLevel: 1, count: 1, status: 'start' }]]);

  const handleSetFocus = (e: HTMLTextAreaElement) => {
    setFocusedElementId(e.id);
  };

  const handleDeleteButtonClick = (deepLevel: number, count: number) => {
    const newEditorStructure = recursiveAdjustment(editorStructure, deepLevel, count, deepLevel);
    setEditorStructure(newEditorStructure);
  };

  const handleTextareaChange = (id: string, value: string) => {
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
    const [deepLevelStr, countStr, status] = cleanedInfo.split(')(');

    let currentDeepLevel = parseInt(deepLevelStr);
    const currentCount = parseInt(countStr);

    if (status !== 'start') {
      currentDeepLevel += 1;
    }

    const newBlockCount = currentCount + 1;

    let focusedElementText = '';

    const updateFocusedElementText = (elements: NestedElement[]): NestedElement[] => {
      return elements.map((element) => {
        if (Array.isArray(element)) {
          return updateFocusedElementText(element);
        } else {
          const elementData = element as Element;
          if (elementData.id === rawId) {
            focusedElementText = elementData.text;
            return { ...elementData, text: elementData.text.slice(0, cursorPosition) };
          }
          return elementData;
        }
      });
    };

    const editorStructureWithUpdatedText = updateFocusedElementText(editorStructure);

    const newBlock = [
      { text: `if ${currentDeepLevel}-${newBlockCount}`, id: nanoid(), deepLevel: currentDeepLevel, count: newBlockCount, status: 'if' },
      { text: `then ${currentDeepLevel}-${newBlockCount}`, id: nanoid(), deepLevel: currentDeepLevel, count: newBlockCount, status: 'then' },
      { text: `else ${currentDeepLevel}-${newBlockCount}`, id: nanoid(), deepLevel: currentDeepLevel, count: newBlockCount, status: 'else' },
      { text: focusedElementText.slice(cursorPosition), id: nanoid(), deepLevel: currentDeepLevel, count: newBlockCount, status: 'end' },
    ];

    const insertBlockAfterFocused = (elements: NestedElement[]): NestedElement[] => {
      let insert = false;

      return elements.reduce((acc: NestedElement[], element: NestedElement) => {
        if (Array.isArray(element)) {
          acc.push(insertBlockAfterFocused(element));
        } else {
          const elementData = element as Element;
          acc.push(elementData);
          if (elementData.id === rawId) {
            insert = true;
          }
        }

        if (insert) {
          acc.push(newBlock);
          insert = false;
        }

        return acc;
      }, []);
    };

    const newEditorStructure = insertBlockAfterFocused(editorStructureWithUpdatedText);
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
