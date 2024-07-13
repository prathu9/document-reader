export const documentToParts = (text: string, maxPartLength: number) => {
  const parts = [];
  let remainingText = text;
  console.log("doc", text.length, calculateWords(text))
  while (remainingText.length > 0) {
    let part = remainingText.slice(0, maxPartLength);
    const lastFullStopIndex = part.lastIndexOf('.');
    if (lastFullStopIndex !== -1) {
      part = part.slice(0, lastFullStopIndex + 1);
    }
    parts.push(part);
    
    remainingText = remainingText.slice(part.length).trim();
  }

  parts.forEach((part: string) => {
    partsToPara(part)
  })

  return parts;
};

export const partsToPara = (part: string) => {
  const paras: string[] = part.split("\n\r");

  return paras;
}

const calculateWords = (para: string) => {
  const words = para.split(" ");
  return words.length;
}

export const getWordBoundaries = (text: string) => {
  const boundaries: number[] = [];
  const words = text.split(' ');
  // console.log(words)
  let index = 0;

  words.forEach((word) => {
    index += word.length + 1;
    boundaries.push(index);
  })

  return boundaries;
}

