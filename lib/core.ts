import { RoundRange } from "./roundrange";

// --- Helper Functions ---
export const isSeparator = (c: string): boolean => {
  const pattern = /^([\s]|　)+?$/u;
  if (c.match(pattern)) { return true; }
  if ("\r\n,.、。・;:'\"\\".includes(c)) { return true; }
  if ("|《》".includes(c)) { return true; }
  if ("「」[]《》【】()（）『』〚〛".includes(c)) { return true; }
  if ("―…?？！！".includes(c)) { return true; }
  return false;
};

export const isNumber = (c: string): boolean => {
  if ("0123456789０１２３４５６７８９".includes(c)) { return true; }
  return false;
};

export const isSkipChar = (c: string): boolean => {
  if (isSeparator(c)) { return true; }
  if (isNumber(c)) { return true; }
  const patternUnassigned = /^\p{C}$/u;
  if (c.match(patternUnassigned)) { return true; }
  return false;
};

export const getNextChar = (c: string, inc: number, currentRoundRange: RoundRange | null): string => {
  //cは与える段階で１文字を想定しています
  if (isSkipChar(c)) { return c; }
  let charToProcess = c;
  try {
    do{
      //最初の文字を取り出す
      let n = charToProcess.codePointAt(0)!;
      //文字コードをずらすことで暗号化
      n += inc;
      if (currentRoundRange !== null && currentRoundRange.Minimum !== 0 && currentRoundRange.Range > 0) {
        //RoundRangeの範囲内に収めることで特殊な文字へと変換
        n = currentRoundRange.Minimum + (n % currentRoundRange.Range);
      }
      //文字コードから文字を取得
      charToProcess = String.fromCodePoint(n);
    } while (isSkipChar(charToProcess) && charToProcess !== c);
  } catch (e) {
    console.error("Error in getNextChar:", e, "char:", c, "codePoint:", c.codePointAt(0));
    return c;
  }
  return charToProcess;
};

export const Split = (line: string): [string, boolean][] => {
  let results: [string, boolean][] = [];
  let stack: string[] = [];
  for (const c of line.split("")) {
    if (isSeparator(c)) {
      if (stack.length > 0) {
        results.push([stack.join(""), false]);
        stack = [];
      }
      results.push([c, true]);
    } else {
      stack.push(c);
    }
  }
  if (stack.length > 0) {
    results.push([stack.join(""), false]);
  }
  return results;
};

export const strReverse = (s: string): string => {
  return Array.from(s).reverse().join("");
};

export const strSwap = (s: string): string => {
  let results: string[] = [];
  let stack: string[] = [];
  const chars = Array.from(s);
  for (const c of chars) {
    stack.push(c);
    if (stack.length === 2) {
      results.push(stack.pop()!);
      results.push(stack.pop()!);
    }
  }
  if (stack.length > 0) {
    results.push(stack.pop()!);
  }
  return results.join("");
};

export const Execute = (execLevel: number, line: string, currentRoundRange: RoundRange | null): string => {
  let s = line;
  if (execLevel === 1) {
    s = strSwap(s);
  } else if (execLevel === 2) {
    s = Execute(1, strReverse(s), currentRoundRange);
  } else {
    const inc: number = (execLevel - 3) + line.length;
    const rounded = RoundString(line, inc, currentRoundRange);
    //RoundRangeは１度のみ適用
    s = Execute(2, rounded, null);
  }
  return s;
};
export const RoundString = (line: string, inc: number, currentRoundRange: RoundRange | null): string => {
  if (inc === 0 && (currentRoundRange === null || currentRoundRange.Minimum === 0)) {
    return line; // 選択しない場合はそのまま返す
  }
  let conv: string[] = [];
  for (const c of line.split("")) {
      conv.push(getNextChar(c, inc, currentRoundRange));
  }
  return conv.join("");
};

export const Convert = (text: string, currentLevel: number, currentRoundRange: RoundRange): string => {
  let results: string[] = [];
  for (const t of Split(text)) {
    const [word, isSep] = t;
    if (isSep) {
      results.push(word);
    }
    else {
      results.push(Execute(currentLevel, word, currentRoundRange));
    }
  }
  return results.join("");
};
