
import { describe, it, expect } from 'vitest';
import { Convert, RoundRange, strSwap, strReverse } from './core';

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
