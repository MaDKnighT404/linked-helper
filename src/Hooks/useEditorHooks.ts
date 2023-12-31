import { useState } from 'react';
import { nanoid } from 'nanoid';
import { template } from '../components/Main/Main';
import { Element, NestedElement } from '../types';
import { insertBlockAfterFocused, updateTextInElement, recursiveAdjustment } from '../helpers';

//кастомный хук, который предназначен для работы компонента Editor. Он управляет состоянием, относящимся к структуре редактора, текущему элементу, на котором находится фокус, и позиции курсора. Он также предоставляет несколько функций обработчиков, которые можно использовать для обновления этих состояний

// так как хук получился очень большой практически вся логика его работы находится во вспомогательных функциях внутри папки helpers

const useEditorHooks = () => {
  const startFocusedId = '(1)(start)|START-TEXT-AREA';
  const [editorStructure, setEditorStructure] = useState<NestedElement[]>(template);
  const [focusedElementId, setFocusedElementId] = useState<string | null>(startFocusedId);
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [deepLevelCounts, setDeepLevelCounts] = useState<{ [key: number]: number }>({ 1: 1 });
  const [canAddBlock, setCanAddBlock] = useState(false);

  const handleSetFocus = (element: HTMLTextAreaElement) => {
    setFocusedElementId(element.id);
    setCanAddBlock(true);
  };

  const handleCursorPositionChange = (position: number) => {
    setCursorPosition(position);
  };

  const handleDeleteButtonClick = (deepLevel: number, count: number) => {
    let endBlockText = '';

    // Find the END block text
    const findEndBlockText = (elements: NestedElement[]) => {
      for (let element of elements) {
        if (Array.isArray(element)) {
          findEndBlockText(element);
        } else if (
          element.deepLevel === deepLevel &&
          element.count === count &&
          element.status === 'end'
        ) {
          endBlockText = element.text;
          break;
        }
      }
    };

    findEndBlockText(editorStructure);

    const newEditorStructure = recursiveAdjustment(editorStructure, deepLevel, count, deepLevel);

    // Append the END block text to the last non-empty block
    const appendEndBlockText = (elements: NestedElement[]) => {
      for (let i = elements.length - 1; i >= 0; i--) {
        let element = elements[i];
        if (Array.isArray(element)) {
          appendEndBlockText(element);
        } else {
          element.text += endBlockText;
          break;
        }
      }
    };

    appendEndBlockText(newEditorStructure);
    setEditorStructure(newEditorStructure);
  };

  const handleTextareaChange = (value: string) => {
    updateTextInElement(editorStructure, setEditorStructure, focusedElementId, (elementData) => ({
      ...elementData,
      text: value,
    }));
  };

  const handleVariableButtonClick = (variableText: string) => {
    updateTextInElement(editorStructure, setEditorStructure, focusedElementId, (elementData) => {
      const newText = [
        elementData.text.slice(0, cursorPosition),
        variableText,
        elementData.text.slice(cursorPosition),
      ].join('');
      setCursorPosition((prevPosition) => prevPosition + variableText.length);
      return { ...elementData, text: newText };
    });
  };

  const handleAddNewBlock = () => {
    if (!focusedElementId || !canAddBlock) return;

    const infoSection = focusedElementId.split('|')[0];
    const rawId = focusedElementId.split('|')[1];

    const cleanedInfo = infoSection.substring(1, infoSection.length - 1);
    const [deepLevelStr, status] = cleanedInfo.split(')(');

    let currentDeepLevel = parseInt(deepLevelStr);

    if (status !== 'start') {
      currentDeepLevel += 1;
    }

    const newBlockCount = (deepLevelCounts[currentDeepLevel] || 0) + 1;
    setDeepLevelCounts({ ...deepLevelCounts, [currentDeepLevel]: newBlockCount });

    let focusedElementText = '';

    const updateFocusedElementText = (elements: NestedElement[]): NestedElement[] => {
      return elements.map((element) => {
        if (Array.isArray(element)) {
          return updateFocusedElementText(element);
        } else {
          const elementData = element as Element;
          if (elementData.id === rawId) {
            focusedElementText = elementData.text;
            const textBeforeCursorSplit = elementData.text.slice(0, cursorPosition);
            return { ...elementData, text: textBeforeCursorSplit };
          }
          return elementData;
        }
      });
    };

    const editorStructureWithUpdatedText = updateFocusedElementText(editorStructure);
    const textAfterCursorSplit = focusedElementText.slice(cursorPosition);

    const newBlock = [
      { text: '', id: nanoid(), deepLevel: currentDeepLevel, count: newBlockCount, status: 'if' },
      {
        text: '',
        id: nanoid(),
        deepLevel: currentDeepLevel,
        count: newBlockCount,
        status: 'then',
      },
      {
        text: '',
        id: nanoid(),
        deepLevel: currentDeepLevel,
        count: newBlockCount,
        status: 'else',
      },
      {
        text: textAfterCursorSplit,
        id: nanoid(),
        deepLevel: currentDeepLevel,
        count: newBlockCount,
        status: 'end',
      },
    ];

    const newEditorStructure = insertBlockAfterFocused(
      editorStructureWithUpdatedText,
      newBlock,
      rawId
    );
    const newBlockid = `(${newBlock[0].deepLevel})(if)|${newBlock[0].id}`;
    setCanAddBlock(false);
    setFocusedElementId(newBlockid);
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
