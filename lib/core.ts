// --- Class Definition ---
export class RoundRange {
  Name: string;
  DisplayName: string;
  Minimum: number;
  Maximum: number;
  Range: number;
  Key: string;

  constructor(name: string, min: number, max: number) {
    this.Name = name;
    if (min === 0) {
      this.DisplayName = name;
    } else {
      this.DisplayName = name;
    }
    this.Minimum = min;
    this.Maximum = max;
    this.Range = max - min + 1;
    this.Key = min.toString() + "-" + max.toString();
  }
}

// --- Constants and Derived Data ---
export const RoundRanges = [
  new RoundRange("選択しない", 0, 0),
  new RoundRange("ビルマ文字", 0x1000, 0x109F),
  new RoundRange("アラビア文字", 0x0600, 0x06FF),
  new RoundRange("ルーン文字", 0x16A0, 0x16F0),
  new RoundRange("ルーン文字+", 0x16A0, 0x16F8),
  new RoundRange("タイ文字", 0x0E01, 0x0E5B),
  new RoundRange("グルジア文字", 0x10A0, 0x10FF),
  new RoundRange("シンハラ文字", 0x0D80, 0x0DF4),
  new RoundRange("テルグ文字", 0x0C00, 0x0C7F),
  new RoundRange("カンナダ文字", 0x0C80, 0x0CF3),
  new RoundRange("マラヤーラム文字", 0x0D00, 0x0D7F),
  new RoundRange("ヒエログリフ", 0x13000, 0x1342F),
  new RoundRange("パスパ文字", 0xA840, 0xA87E),
  new RoundRange("ブラーフミー文字", 0x11000, 0x1107F),
  new RoundRange("ヴァイ文字", 0xA500, 0xA62B),
  new RoundRange("デーヴァナーガリー", 0x0900, 0x097F)
];

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

export const getNextChar = (c: string, inc: number, currentRoundRange: RoundRange): string => {
  //cは与える段階で１文字を想定しています
  if (isSkipChar(c)) { return c; }
  let charToProcess = c;
  try {
    do{
      //最初の文字を取り出す
      let n = charToProcess.codePointAt(0)!;
      //文字コードをずらすことで暗号化
      n += inc;
      if (currentRoundRange.Minimum !== 0 && currentRoundRange.Range > 0) {
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

export const Execute = (execLevel: number, line: string, currentRoundRange: RoundRange): string => {
  let s = line;
  if (execLevel === 1) {
    s = strSwap(s);
  } else if (execLevel === 2) {
    s = Execute(1, strReverse(s), currentRoundRange);
  } else {
    const inc: number = (execLevel - 3) + line.length;
    let conv: string[] = [];
    for (const c of line.split("")) {
      conv.push(getNextChar(c, inc, currentRoundRange));
    }
    s = Execute(2, conv.join(""), currentRoundRange);
  }
  return s;
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
