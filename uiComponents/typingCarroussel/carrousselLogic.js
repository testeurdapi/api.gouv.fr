const directions = {
  FORWARD: 1,
  BACKWARD: -1,
  STOPPED: 0,
};

/**
 * Depending on the typing direction, returns a typing speed time
 * @param typingDirection
 */
const getTime = typingDirection => {
  // typing in
  if (typingDirection === directions.FORWARD) {
    return 150 - Math.random() * 100;
  }
  // deleting
  if (typingDirection === directions.BACKWARD) {
    // erasing is twice as fast
    return (150 - Math.random() * 100) / 2;
  }
  // end of sentence
  if (typingDirection === directions.STOPPED) {
    return 1100;
  }
};

/**
 * Generates every texts to be displayed
 * @param {} array
 */
const generateTextToType = sentences => {
  const text = [];
  let currText = '';

  const generateTextItem = (txt, index, letterCount, direction) => {
    const isLast = index === letterCount - 1;
    const time = getTime(isLast ? directions.STOPPED : direction);
    text.push({ value: txt, time });
  };

  sentences.forEach(sentence => {
    const letterCount = sentence.length;
    // type in
    for (let i = 0; i < letterCount; i++) {
      currText = currText + sentence[i];
      generateTextItem(currText, i, letterCount, directions.FORWARD);
    }

    // deleting
    for (let i = 0; i < letterCount; i++) {
      currText = currText.substring(0, currText.length - 1);
      generateTextItem(currText, i, letterCount, directions.BACKWARD);
    }
  });
  return text;
};

/**
 * Every time next() gets hit, it returns text to display and speed to use
 * @param array
 */
const typerIterator = sentences => {
  const text = generateTextToType(sentences);

  let i = 0;
  return {
    next: () => {
      if (i === text.length) {
        i = 0;
      }
      const t = text[i];
      i++;
      return t;
    },
  };
};

export default typerIterator;
