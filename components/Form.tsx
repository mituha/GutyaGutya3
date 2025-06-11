import React, { useState, useEffect } from "react";
import Help from "./Help";

// --- Class Definition ---
class RoundRange {
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
const RoundRanges = [
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
  new RoundRange("デーヴァナーガリー", 0x0900, 0x097F),
];

const RoundRangeOptions = RoundRanges.map((range) => {
  return (
    <option value={range.Name} key={range.Key}>
      {range.Name === "選択しない" ? range.Name : `${range.Name} : ${String.fromCodePoint(range.Minimum)} - ${String.fromCodePoint(range.Maximum)}`}
    </option>
  );
});

// --- Helper Functions ---
const isSeparator = (c: string): boolean => {
  const pattern = /^([\s]|　)+?$/u;
  if (c.match(pattern)) { return true; }
  if ("\r\n,.、。・;:'\"\\".includes(c)) { return true; }
  if ("|《》".includes(c)) { return true; }
  if ("「」[]《》【】()（）『』〚〛".includes(c)) { return true; }
  if ("―…?？!！".includes(c)) { return true; }
  return false;
};

const isNumber = (c: string): boolean => {
  if ("0123456789０１２３４５６７８９".includes(c)) { return true; }
  return false;
};

const isSkipChar = (c: string): boolean => {
  if (isSeparator(c)) { return true; }
  if (isNumber(c)) { return true; }
  const patternUnassigned = /^\p{C}$/u;
  if (c.match(patternUnassigned)) { return true; }
  return false;
};

const getNextChar = (c: string, inc: number, currentRoundRange: RoundRange): string => {
  if (isSkipChar(c)) { return c; }
  let charToProcess = c;
  try {
    let n = charToProcess.codePointAt(0)!;
    n += inc;
    if (currentRoundRange.Minimum !== 0 && currentRoundRange.Range > 0) {
      n = currentRoundRange.Minimum + ((n % currentRoundRange.Range) + currentRoundRange.Range) % currentRoundRange.Range;
    }
    charToProcess = String.fromCodePoint(n);
    if (isSkipChar(charToProcess) && c !== charToProcess) {
       let temp_n = charToProcess.codePointAt(0)! + 1;
       if (currentRoundRange.Minimum !== 0 && currentRoundRange.Range > 0) {
          temp_n = currentRoundRange.Minimum + ((temp_n % currentRoundRange.Range) + currentRoundRange.Range) % currentRoundRange.Range;
       }
       charToProcess = String.fromCodePoint(temp_n);
       if(isSkipChar(charToProcess)) return c;
    }
  } catch (e) {
    console.error("Error in getNextChar:", e, "char:", c, "codePoint:", c.codePointAt(0));
    return c;
  }
  return charToProcess;
};

const Split = (line: string): [string, boolean][] => {
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

const strReverse = (s: string): string => {
  return Array.from(s).reverse().join("");
};

const strSwap = (s: string): string => {
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

const Execute = (execLevel: number, line: string, currentRoundRange: RoundRange): string => {
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

const Convert = (text: string, currentLevel: number, currentRoundRange: RoundRange): string => {
  let results: string[] = [];
  for (const t of Split(text)) {
    const [word, isSep] = t;
    if (isSep) {
      results.push(word);
    } else {
      results.push(Execute(currentLevel, word, currentRoundRange));
    }
  }
  return results.join("");
};

// --- Form Component ---
const Form: React.FC = () => {
  const [srcText, setSrcText] = useState("ここに入力");
  const [level, setLevel] = useState(5);
  const [roundRange, setRoundRange] = useState(RoundRanges[0]);
  const [dstText, setDstText] = useState("");

  const handleConvert = (currentSrcText: string, currentLevel: number, currentRoundRange: RoundRange) => {
    setDstText(Convert(currentSrcText, currentLevel, currentRoundRange));
  };
  
  useEffect(() => {
    handleConvert(srcText, level, roundRange);
  }, [srcText, level, roundRange]);

  const handleSrcTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSrcText(e.target.value);
  };

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel(Number(e.target.value));
  };
  
  const handleRoundRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRange = RoundRanges.find(range => range.Name === e.target.value);
    if (selectedRange) {
      setRoundRange(selectedRange);
    }
  };

  const handleUpdateButtonClick = () => {
    handleConvert(srcText, level, roundRange);
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="srcText" className="block text-sm font-medium text-slate-300 mb-1">
          入力テキスト
        </label>
        <textarea
          id="srcText"
          name="srcText"
          rows={4}
          className="w-full p-3 bg-slate-800/70 text-slate-200 border border-slate-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-150 ease-in-out resize-none shadow-sm"
          onChange={handleSrcTextChange}
          value={srcText}
          aria-label="変換元のテキスト"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
        <div>
          <label htmlFor="level-select" className="block text-sm font-medium text-slate-300 mb-1">
            変換レベル
          </label>
          <select
            id="level-select"
            className="w-full p-3 bg-slate-800/70 text-slate-200 border border-slate-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-150 ease-in-out shadow-sm"
            value={level}
            onChange={handleLevelChange}
            aria-label="変換レベルを選択"
          >
            {[1, 2, 3, 4, 5].map(l => <option key={l} value={l}>Lv.{l}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="round-range-select" className="block text-sm font-medium text-slate-300 mb-1">
            文字種 (Lv.3+)
          </label>
          <select
            id="round-range-select"
            className="w-full p-3 bg-slate-800/70 text-slate-200 border border-slate-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-150 ease-in-out shadow-sm"
            value={roundRange.Name}
            onChange={handleRoundRangeChange}
            aria-label="文字種を選択 (レベル3以上で適用)"
          >
            {RoundRangeOptions}
          </select>
        </div>
        
        <button
          type="button"
          className="w-full lg:col-start-3 p-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-sm"
          onClick={handleUpdateButtonClick}
        >
          変換実行
        </button>
      </div>

      <div className="my-3 text-center text-slate-400 text-sm">
        現在の設定: Lv.{level} {roundRange.Name !== "選択しない" ? ` / ${roundRange.Name}` : ""}
      </div>

      <div>
        <label htmlFor="dstText" className="block text-sm font-medium text-slate-300 mb-1">
          変換後テキスト
        </label>
        <textarea
          id="dstText"
          name="dstText"
          rows={4}
          className="w-full p-3 bg-slate-800/70 text-slate-200 border border-slate-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-150 ease-in-out resize-none shadow-sm"
          value={dstText}
          readOnly
          aria-label="変換後のテキスト"
        />
      </div>
      <Help />
    </div>
  );
};

export default Form;
