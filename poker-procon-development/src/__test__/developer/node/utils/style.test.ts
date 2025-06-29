import { testLogBetAddPoint } from '@/__test__/developer/jsdom/data/log-bet-add-point';
import { testLogFinished } from '@/__test__/developer/jsdom/data/log-finished';
import {
  capitalize,
  generateCardPath,
  isEmphasizeGamePlayer,
} from '@/utils/style';

describe('style utils', () => {
  describe('capitalize function', () => {
    test('文字列の一文字を大文字にする', () => {
      const result = capitalize('abcde');
      expect(result).toBe('Abcde');
    });
  });

  describe('generateCardPath function', () => {
    test('rankが1のカード', () => {
      const result = generateCardPath({ suit: 'Spades', number: 1 });
      expect(result).toBe('/card/Spades-01.svg');
    });

    test('rankが10以上のカード', () => {
      const result = generateCardPath({ suit: 'Spades', number: 10 });
      expect(result).toBe('/card/Spades-10.svg');
    });
  });

  describe('isEmphasizeGamePlayer function', () => {
    test('自分のターン', () => {
      const result = isEmphasizeGamePlayer('Player1', testLogBetAddPoint);
      expect(result).toBeTruthy();
    });

    test('自分のターンではない', () => {
      const result = isEmphasizeGamePlayer('Player2', testLogBetAddPoint);
      expect(result).toBeFalsy();
    });

    test('終了フェーズ - winner', () => {
      const result = isEmphasizeGamePlayer('Player1', testLogFinished);
      expect(result).toBeTruthy();
    });

    test('終了フェーズ - loser', () => {
      const result = isEmphasizeGamePlayer('Player2', testLogFinished);
      expect(result).toBeFalsy();
    });
  });
});
