
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
