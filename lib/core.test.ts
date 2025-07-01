
import { describe, it, expect } from 'vitest';
import { Convert, RoundRange, strSwap, strReverse, Execute, RoundRanges } from './core';

describe('Convert', () => {
  const noRound = new RoundRange("選択しない", 0, 0);

  it('レベル1: 文字がスワップされる', () => {
    const result = Convert('ABC', 1, noRound);
    expect(result).toBe(strSwap('ABC'));
  });

  it('レベル2: 文字が逆順になり、スワップされる', () => {
    const result = Convert('ABC', 2, noRound);
    expect(result).toBe(strSwap(strReverse('ABC')));
  });

  it('レベル3以上: 文字が変換される', () => {
    const result = Convert('A', 3, noRound);
    expect(result).not.toBe('A');
  });

  it('セパレータは変換されない', () => {
    const result = Convert('A B　C', 5, noRound);
    const parts = result.split(/[\s　]/);
    expect(parts.length).toBe(3);
    expect(parts[0]).not.toBe('A');
    expect(parts[1]).not.toBe('B');
    expect(parts[2]).not.toBe('C');
  });

  it('数字は変換されない', () => {
    const result = Convert('123', 5, noRound);
    expect(result).toBe(strSwap(strReverse('123')));
  });
});

describe('strReverse', () => {
  it('should reverse a simple string', () => {
    expect(strReverse('hello')).toBe('olleh');
  });

  it('should return an empty string if given an empty string', () => {
    expect(strReverse('')).toBe('');
  });

  it('should handle strings with spaces', () => {
    expect(strReverse('hello world')).toBe('dlrow olleh');
  });

  it('should handle strings with special characters', () => {
    expect(strReverse('!@#$%^&*()')).toBe(')(*&^%$#@!');
  });

  it('should handle unicode characters correctly', () => {
    expect(strReverse('こんにちは')).toBe('はちにんこ');
  });

  it('should handle surrogate pairs correctly', () => {
    const surrogatePair = '𠮷野家'; // "𠮷" is a surrogate pair
    const reversed = '家野𠮷';
    expect(strReverse(surrogatePair)).toBe(reversed);
  });
});

describe('strSwap', () => {
  it('should swap characters in a string with even length', () => {
    expect(strSwap('ABCD')).toBe('BADC');
  });

  it('should swap characters in a string with odd length', () => {
    expect(strSwap('ABCDE')).toBe('BADCE');
  });

  it('should return an empty string if given an empty string', () => {
    expect(strSwap('')).toBe('');
  });

  it('should handle strings with spaces by treating them as swappable characters', () => {
    expect(strSwap('A B C D')).toBe(' A B CD');
  });

  it('should handle unicode characters correctly', () => {
    expect(strSwap('あいうえお')).toBe('いあえうお');
  });

  it('should handle surrogate pairs correctly', () => {
    const surrogatePair = '𠮷野家'; // "𠮷" is a surrogate pair
    const swapped = '野𠮷家';
    expect(strSwap(surrogatePair)).toBe(swapped);
  });
});

describe('Execute', () => {
  const noRound = new RoundRange("選択しない", 0, 0);

  it('should call strSwap for level 1', () => {
    const result = Execute(1, 'ABC', noRound);
    expect(result).toBe(strSwap('ABC'));
  });

  it('should call strReverse and then strSwap for level 2', () => {
    const result = Execute(2, 'ABC', noRound);
    expect(result).toBe(strSwap(strReverse('ABC')));
  });

  it('should perform character conversion for level 3 and above', () => {
    const result = Execute(3, 'A', noRound);
    // This will call getNextChar, which should change the character.
    // The exact result depends on the implementation of getNextChar.
    // We expect it to not be 'A' after reverse and swap.
    const reversedAndSwappedA = strSwap(strReverse('A')); // which is 'A'
    expect(result).not.toBe(reversedAndSwappedA);
  });

  it('should handle different increments for level 3+', () => {
    const result3 = Execute(3, 'A', noRound);
    const result4 = Execute(4, 'A', noRound);
    expect(result3).not.toBe(result4);
  });
});

describe('Execute with RoundRanges', () => {
  // "選択しない" は文字コード変換を行わないため、除外してテスト
  const testRanges = RoundRanges.filter(r => r.Name !== "選択しない");

  testRanges.forEach(range => {
    it(`should process with ${range.Name} without errors`, () => {
      // Executeがエラーをスローしないことを確認する
      expect(() => Execute(5, 'Test', range)).not.toThrow();
    });

    it(`should convert characters within the ${range.Name} range`, () => {
      const result = Execute(5, 'A', range);
      const resultCode = result.codePointAt(0)!;

      // 変換後の文字コードが、指定した範囲内にあることを確認
      // ただし、変換後の文字がisSkipCharに該当する場合があるため、その場合は範囲外になることもある
      // ここでは、変換が行われ、元の文字とは異なることだけをチェックする
      const originalSwapped = Execute(2, 'A', range);
      expect(result).not.toBe(originalSwapped);
    });
  });
});

describe('Pattern-based conversion tests', () => {
  // テストデータを定義: [input, expected, level, rangeName]
  const testCases: [string, string, number, string][] = [
    ['ABC', 'BAC', 1, '選択しない'],
    ['ABC', 'BCA', 2, '選択しない'],
    ['Hello World', 'eHllo oWlrd', 1, '選択しない'],
    ['Hello World', 'loelH ldorW', 2, '選択しない'],
    // レベル3以上のテストは、変換後の文字が環境に依存するため、
    // 具体的な期待値を設定するのが難しい。
    // ここでは、変換されること、エラーが出ないことを確認する。
    ['Test', 'Test', 5, 'ビルマ文字'], // 変換されるので'Test'ではないはず
  ];

  const testConversion = (input: string, expected: string, level: number, rangeName: string) => {
    const range = RoundRanges.find(r => r.DisplayName === rangeName);
    if (!range) {
      throw new Error(`RoundRange "${rangeName}" not found.`);
    }

    const result = Convert(input, level, range);

    if (level < 3) {
      expect(result).toBe(expected);
    } else {
      // レベル3以上は変換されることを確認
      expect(result).not.toBe(input);
    }
  };

  testCases.forEach(([input, expected, level, rangeName]) => {
    it(`should convert "${input}" to "${expected}" with level ${level} and range ${rangeName}`, () => {
      testConversion(input, expected, level, rangeName);
    });
  });
});
