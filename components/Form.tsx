import React, { useState, useEffect, useMemo } from "react";
import Help from "./Help";
import { RoundRange, RoundRanges } from "../lib/roundrange";
import { Convert } from "../lib/core";

const RoundRangeOptions = RoundRanges.map((range) => {
  return (
    <option value={range.Name} key={range.Key}>
      {range.Name === "選択しない" ? range.Name : `${range.Name} : ${String.fromCodePoint(range.Minimum)} - ${String.fromCodePoint(range.Maximum)}`}
    </option>
  );
});

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

  const characterPreview = useMemo(() => {
    if (roundRange.Minimum === 0) return null;

    const chars = [];
    // パフォーマンスのため、最大500文字に制限
    const maxChars = 500;
    for (let i = roundRange.Minimum; i <= roundRange.Maximum && chars.length < maxChars; i++) {
      try {
        chars.push(String.fromCodePoint(i));
      } catch (e) {
        // 無効なコードポイントはスキップ
      }
    }
    
    return (
      <div className="mt-2 p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
        <p className="text-sm text-slate-400 mb-2">{roundRange.Name} 文字プレビュー ({roundRange.Range > maxChars ? `${maxChars}文字のみ表示` : `${roundRange.Range}文字`})</p>
        <div className="text-lg text-slate-200 break-words leading-relaxed" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
          {chars.join(" ")}
        </div>
      </div>
    );
  }, [roundRange]);

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

        <div className="md:col-span-2 lg:col-span-1">
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
      
      {characterPreview}

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
