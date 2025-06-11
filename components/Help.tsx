import React from 'react';

function Help() {
    return (
      <div className="mt-8 p-5 sm:p-6 bg-slate-800/60 border border-slate-700 rounded-lg text-slate-300 text-sm leading-relaxed shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold text-sky-400 mb-3">
          使用方法
        </h2>
        <ol className="list-decimal list-inside space-y-2 mb-4">
          <li>一番上のテキストボックスに変換したい文章を入力します。</li>
          <li>変換レベルを選択します。（数字が大きいほど複雑になります）</li>
          <li>
            特定の文字種に変換したい場合は「文字種」を選択します。（レベル3以上で適用）<br />
            <span className="text-xs text-slate-400">例: ルーン文字を選ぶと呪文風になります。</span>
          </li>
          <li>「変換実行」ボタンを押すと、下のテキストボックスに結果が表示されます。</li>
        </ol>

        <h3 className="text-md sm:text-lg font-semibold text-sky-400 mb-2 mt-4">
            レベル詳細:
        </h3>
        <ul className="list-disc list-inside space-y-1 text-slate-300">
            <li><strong className="text-slate-200">Lv.1:</strong> 隣り合う2文字を入れ替えます。</li>
            <li><strong className="text-slate-200">Lv.2:</strong> 文字列全体を反転後、Lv.1の処理を適用します。</li>
            <li><strong className="text-slate-200">Lv.3以上:</strong> 文字コードをずらしてからLv.2の処理を適用します。選択した文字種もこのレベルから反映されます。レベルが上がるほど、文字コードのずらし幅が大きくなります。</li>
        </ul>
        <p className="mt-4 text-xs text-slate-400">
          ※一部の特殊文字や記号、数字は変換対象外となることがあります。
        </p>
      </div>
    );
  }
  
  export default Help;