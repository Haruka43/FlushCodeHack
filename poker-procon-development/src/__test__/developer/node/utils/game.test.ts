import { testCards } from '@/__test__/developer/jsdom/data/cards';
import type { Card, CardSet } from '@/schema/card';
import { Hand } from '@/schema/game';
import type { Player } from '@/schema/player';
import {
  callActionByPoint,
  compareCards,
  randomByNumber,
  shuffleArray,
} from '@/utils/game';

describe('game utils', () => {
  describe('randomByNumber function', () => {
    test('引数に2を与えると0か1の値が返却される', () => {
      const rand = randomByNumber(2);
      expect(rand).toBeGreaterThanOrEqual(0);
      expect(rand).toBeLessThanOrEqual(1);
    });

    test('引数に5を与えると0〜4の値が返却される', () => {
      const rand = randomByNumber(2);
      expect(rand).toBeGreaterThanOrEqual(0);
      expect(rand).toBeLessThanOrEqual(4);
    });

    test('引数に10を与えると0〜9の値が返却される', () => {
      const rand = randomByNumber(2);
      expect(rand).toBeGreaterThanOrEqual(0);
      expect(rand).toBeLessThanOrEqual(9);
    });
  });

  describe('shuffleArray function', () => {
    test('arrayをシャッフルしている', () => {
      const array = shuffleArray([1, 2, 3, 4, 5]);
      expect(array.length).toBe(5);
    });
  });

  describe('callActionByPoint function', () => {
    test('[001] 所持 = 20,000pt | 最低ベット = 0pt | 払い済み = 0pt | 追加 = 0pt の時、宣言は「check」', () => {
      const action = callActionByPoint(20000, 0, 0, 0);
      expect(action).toBe('check');
    });

    test('[002] 所持 = 20,000pt | 最低ベット = 0pt | 払い済み = 0pt | 追加 = 500pt の時、宣言は「bet」', () => {
      const action = callActionByPoint(20000, 0, 0, 500);
      expect(action).toBe('bet');
    });

    test('[003] 所持 = 20,000pt | 最低ベット = 0pt | 払い済み = 0pt | 追加 = -1pt の時、宣言は「drop」', () => {
      const action = callActionByPoint(20000, 0, 0, -1);
      expect(action).toBe('drop');
    });

    test('[004] 所持 = 20,000pt | 最低ベット = 0pt | 払い済み = 0pt | 追加 = 20,0001pt の時、宣言は「all-in」', () => {
      const action = callActionByPoint(20000, 0, 0, 20000);
      expect(action).toBe('all-in');
    });

    test('[005] 所持 = 20,000pt | 最低ベット = 0pt | 払い済み = 0pt | 追加 = 20,0001pt の時、宣言は「all-in」', () => {
      const action = callActionByPoint(20000, 0, 0, 20001);
      expect(action).toBe('all-in');
    });

    test('[006] 所持 = 20,000pt | 最低ベット = 500pt | 払い済み = 0pt | 追加 = 0pt の時、宣言は「call」', () => {
      const action = callActionByPoint(20000, 500, 0, 0);
      expect(action).toBe('call');
    });

    test('[007] 所持 = 20,000pt | 最低ベット = 500pt | 払い済み = 0pt | 追加 = 1pt の時、宣言は「raise」', () => {
      const action = callActionByPoint(20000, 500, 0, 1);
      expect(action).toBe('raise');
    });

    test('[008] 所持 = 20,000pt | 最低ベット = 500pt | 払い済み = 0pt | 追加 = 19,500pt の時、宣言は「all-in」', () => {
      const action = callActionByPoint(20000, 500, 0, 19500);
      expect(action).toBe('all-in');
    });

    test('[009] 所持 = 20,000pt | 最低ベット = 500pt | 払い済み = 0pt | 追加 = 19,501pt の時、宣言は「all-in」', () => {
      const action = callActionByPoint(20000, 500, 0, 19501);
      expect(action).toBe('all-in');
    });

    test('[010] 所持 = 20,000pt | 最低ベット = 500pt | 払い済み = 0pt | 追加 = 0pt の時、宣言は「call」', () => {
      const action = callActionByPoint(20000, 500, 0, 0);
      expect(action).toBe('call');
    });

    test('[011] 所持 = 20,000pt | 最低ベット = 500pt | 払い済み = 0pt | 追加 = -1pt の時、宣言は「drop」', () => {
      const action = callActionByPoint(20000, 500, 0, -1);
      expect(action).toBe('drop');
    });

    test('[012] 所持 = 500pt | 最低ベット = 1,000pt | 払い済み = 500pt | 追加 = 0pt の時、宣言は「all-in」', () => {
      const action = callActionByPoint(500, 1000, 500, 0);
      expect(action).toBe('all-in');
    });

    test('[013] 所持 = 500pt | 最低ベット = 1,000pt | 払い済み = 500pt | 追加 = 1pt の時、宣言は「all-in」', () => {
      const action = callActionByPoint(500, 1000, 500, 1);
      expect(action).toBe('all-in');
    });

    test('[014] 所持 = 500pt | 最低ベット = 1,000pt | 払い済み = 500pt | 追加 = -1pt の時、宣言は「drop」', () => {
      const action = callActionByPoint(500, 1000, 500, -1);
      expect(action).toBe('drop');
    });

    test('[015] 所持 = 19,500pt | 最低ベット = 1,000pt | 払い済み = 500pt | 追加 = 0pt の時、宣言は「call」', () => {
      const action = callActionByPoint(19500, 1000, 500, 0);
      expect(action).toBe('call');
    });

    test('[016] 所持 = 19,500pt | 最低ベット = 1,000pt | 払い済み = 500pt | 追加 = 1pt の時、宣言は「raise」', () => {
      const action = callActionByPoint(19500, 1000, 500, 1);
      expect(action).toBe('raise');
    });

    test('[017] 所持 = 19,500pt | 最低ベット = 1,000pt | 払い済み = 500pt | 追加 = -1pt の時、宣言は「drop」', () => {
      const action = callActionByPoint(19500, 1000, 500, -1);
      expect(action).toBe('drop');
    });
  });

  describe('compareCards function', () => {
    const createActivePlayer = (
      name: string,
      cards: CardSet<Card>,
      hand: Hand
    ): Player => ({
      name,
      status: 'active',
      point: 20000,
      round: {
        betPoint: 200,
        cards,
        action: 'call',
        hand,
      },
    });
    const createOutPlayer = (name: string): Player => ({
      name,
      status: 'out',
      point: 0,
      round: {
        betPoint: 0,
        cards: [],
        action: null,
      },
    });

    test('[Result-2] ロイヤルストレートフラッシュ vs ロイヤルストレートフラッシュ | スートが強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.RoyalStraightFlush].A,
          Hand.RoyalStraightFlush
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.RoyalStraightFlush].B1,
          Hand.RoyalStraightFlush
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-3] ロイヤルストレートフラッシュ vs ストレートフラッシュ | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.RoyalStraightFlush].A,
          Hand.RoyalStraightFlush
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.StraightFlush].B1,
          Hand.StraightFlush
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-4] ロイヤルストレートフラッシュ vs フォーカード | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.RoyalStraightFlush].A,
          Hand.RoyalStraightFlush
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.FourOfAKind].B1,
          Hand.FourOfAKind
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-5] ロイヤルストレートフラッシュ vs フルハウス | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.RoyalStraightFlush].A,
          Hand.RoyalStraightFlush
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.FullHouse].B1,
          Hand.FullHouse
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-6] ロイヤルストレートフラッシュ vs フラッシュ | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.RoyalStraightFlush].A,
          Hand.RoyalStraightFlush
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.Flush].B1,
          Hand.Flush
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-7] ロイヤルストレートフラッシュ vs ストーレート | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.RoyalStraightFlush].A,
          Hand.RoyalStraightFlush
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.Straight].B1,
          Hand.Straight
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-8] ロイヤルストレートフラッシュ vs スリーカード | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.RoyalStraightFlush].A,
          Hand.RoyalStraightFlush
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.ThreeOfAKind].B1,
          Hand.ThreeOfAKind
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-9] ロイヤルストレートフラッシュ vs ツーペア | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.RoyalStraightFlush].A,
          Hand.RoyalStraightFlush
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.TwoPair].B1,
          Hand.TwoPair
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-10] ロイヤルストレートフラッシュ vs ワンペア | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.RoyalStraightFlush].A,
          Hand.RoyalStraightFlush
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.OnePair].B1,
          Hand.OnePair
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-11] ロイヤルストレートフラッシュ vs ハイカード | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.RoyalStraightFlush].A,
          Hand.RoyalStraightFlush
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-12] ストレートフラッシュ vs ストレートフラッシュ | 数字が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.StraightFlush].A,
          Hand.StraightFlush
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.StraightFlush].B1,
          Hand.StraightFlush
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-13] ストレートフラッシュ vs ストレートフラッシュ | スートが強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.StraightFlush].A,
          Hand.StraightFlush
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.StraightFlush].B2,
          Hand.StraightFlush
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-14] ストレートフラッシュ vs フォーカード | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.StraightFlush].A,
          Hand.StraightFlush
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.FourOfAKind].B1,
          Hand.FourOfAKind
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-15] ストレートフラッシュ vs フルハウス | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.StraightFlush].A,
          Hand.StraightFlush
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.FullHouse].B1,
          Hand.FullHouse
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-16] ストレートフラッシュ vs フラッシュ | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.StraightFlush].A,
          Hand.StraightFlush
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.Flush].B1,
          Hand.Flush
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-17] ストレートフラッシュ vs ストーレート | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.StraightFlush].A,
          Hand.StraightFlush
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.Straight].B1,
          Hand.Straight
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-18] ストレートフラッシュ vs スリーカード | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.StraightFlush].A,
          Hand.StraightFlush
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.ThreeOfAKind].B1,
          Hand.ThreeOfAKind
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-19] ストレートフラッシュ vs ツーペア | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.StraightFlush].A,
          Hand.StraightFlush
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.TwoPair].B1,
          Hand.TwoPair
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-20] ストレートフラッシュ vs ワンペア | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.StraightFlush].A,
          Hand.StraightFlush
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.OnePair].B1,
          Hand.OnePair
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-21] ストレートフラッシュ vs ハイカード | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.StraightFlush].A,
          Hand.StraightFlush
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-22] フォーカード vs フォーカード | 数字が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.FourOfAKind].A,
          Hand.FourOfAKind
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.FourOfAKind].B1,
          Hand.FourOfAKind
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-24] フォーカード vs フルハウス | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.FourOfAKind].A,
          Hand.FourOfAKind
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.FullHouse].B1,
          Hand.FullHouse
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-25] フォーカード vs フラッシュ | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.FourOfAKind].A,
          Hand.FourOfAKind
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.Flush].B1,
          Hand.Flush
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-26] フォーカード vs ストーレート | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.FourOfAKind].A,
          Hand.FourOfAKind
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.Straight].B1,
          Hand.Straight
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-27] フォーカード vs スリーカード | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.FourOfAKind].A,
          Hand.FourOfAKind
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.ThreeOfAKind].B1,
          Hand.ThreeOfAKind
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-28] フォーカード vs ツーペア | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.FourOfAKind].A,
          Hand.FourOfAKind
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.TwoPair].B1,
          Hand.TwoPair
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-29] フォーカード vs ワンペア | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.FourOfAKind].A,
          Hand.FourOfAKind
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.OnePair].B1,
          Hand.OnePair
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-30] フォーカード vs ハイカード | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.FourOfAKind].A,
          Hand.FourOfAKind
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-31] フルハウス vs フルハウス | 数字が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.FullHouse].A,
          Hand.FullHouse
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.FullHouse].B1,
          Hand.FullHouse
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-33] フルハウス vs フラッシュ | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.FullHouse].A,
          Hand.FullHouse
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.Flush].B1,
          Hand.Flush
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-34] フルハウス vs ストーレート | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.FullHouse].A,
          Hand.FullHouse
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.Straight].B1,
          Hand.Straight
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-35] フルハウス vs スリーカード | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.FullHouse].A,
          Hand.FullHouse
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.ThreeOfAKind].B1,
          Hand.ThreeOfAKind
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-36] フルハウス vs ツーペア | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.FullHouse].A,
          Hand.FullHouse
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.TwoPair].B1,
          Hand.TwoPair
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-37] フルハウス vs ワンペア | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.FullHouse].A,
          Hand.FullHouse
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.OnePair].B1,
          Hand.OnePair
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-38] フルハウス vs ハイカード | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.FullHouse].A,
          Hand.FullHouse
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-39] フラッシュ vs フラッシュ | 数字が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.Flush].A,
          Hand.Flush
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.Flush].B1,
          Hand.Flush
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-39] フラッシュ vs フラッシュ | スートが強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.Flush].A,
          Hand.Flush
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.Flush].B2,
          Hand.Flush
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-41] フラッシュ vs ストーレート | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.Flush].A,
          Hand.Flush
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.Straight].B1,
          Hand.Straight
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-42] フラッシュ vs スリーカード | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.Flush].A,
          Hand.Flush
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.ThreeOfAKind].B1,
          Hand.ThreeOfAKind
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-43] フラッシュ vs ツーペア | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.Flush].A,
          Hand.Flush
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.TwoPair].B1,
          Hand.TwoPair
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-44] フラッシュ vs ワンペア | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.Flush].A,
          Hand.Flush
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.OnePair].B1,
          Hand.OnePair
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-45] フラッシュ vs ハイカード | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.Flush].A,
          Hand.Flush
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-46] ストーレート vs ストーレート | 数字が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.Straight].A,
          Hand.Straight
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.Straight].B1,
          Hand.Straight
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-47] ストーレート vs ストーレート | スートが強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.Straight].A,
          Hand.Straight
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.Straight].B2,
          Hand.Straight
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-48] ストーレート vs スリーカード | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.Straight].A,
          Hand.Straight
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.ThreeOfAKind].B1,
          Hand.ThreeOfAKind
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-49] ストーレート vs ツーペア | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.Straight].A,
          Hand.Straight
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.TwoPair].B1,
          Hand.TwoPair
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-50] ストーレート vs ワンペア | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.Straight].A,
          Hand.Straight
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.OnePair].B1,
          Hand.OnePair
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-51] ストーレート vs ハイカード | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.Straight].A,
          Hand.Straight
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-52] スリーカード vs スリーカード | 数字が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.ThreeOfAKind].A,
          Hand.ThreeOfAKind
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.ThreeOfAKind].B1,
          Hand.ThreeOfAKind
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-54] スリーカード vs ツーペア | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.ThreeOfAKind].A,
          Hand.ThreeOfAKind
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.TwoPair].B1,
          Hand.TwoPair
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-55] スリーカード vs ワンペア | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.ThreeOfAKind].A,
          Hand.ThreeOfAKind
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.OnePair].B1,
          Hand.OnePair
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-56] スリーカード vs ハイカード | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.ThreeOfAKind].A,
          Hand.ThreeOfAKind
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-57] ツーペア vs ツーペア | 数字が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.TwoPair].A,
          Hand.TwoPair
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.TwoPair].B1,
          Hand.TwoPair
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-58] ツーペア vs ツーペア | スートが強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.TwoPair].A,
          Hand.TwoPair
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.TwoPair].B2,
          Hand.TwoPair
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-59] ツーペア vs ワンペア | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.TwoPair].A,
          Hand.TwoPair
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.OnePair].B1,
          Hand.OnePair
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-60] ツーペア vs ハイカード | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.TwoPair].A,
          Hand.TwoPair
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-61] ワンペア vs ワンペア | 数字が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.OnePair].A,
          Hand.OnePair
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.OnePair].B1,
          Hand.OnePair
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-62] ワンペア vs ワンペア | スートが強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.OnePair].A,
          Hand.OnePair
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.OnePair].B2,
          Hand.OnePair
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-63] ワンペア vs ハイカード | 役が強いPlayer1の勝利', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.OnePair].A,
          Hand.OnePair
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-64] ハイカード vs ハイカード | 数字が強いPlayer1の勝利 A vs K', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.HighCard].A,
          Hand.HighCard
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-65] ハイカード vs ハイカード | 数字が強いPlayer1の勝利 A vs Q', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.HighCard].A,
          Hand.HighCard
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1.splice(3, 4, {
            suit: 'Spades',
            number: 12,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-66] ハイカード vs ハイカード | 数字が強いPlayer1の勝利 A vs J', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.HighCard].A,
          Hand.HighCard
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1.splice(3, 4, {
            suit: 'Spades',
            number: 11,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-67] ハイカード vs ハイカード | 数字が強いPlayer1の勝利 A vs 10', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.HighCard].A,
          Hand.HighCard
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1.splice(3, 4, {
            suit: 'Spades',
            number: 10,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-68] ハイカード vs ハイカード | 数字が強いPlayer1の勝利 A vs 9', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.HighCard].A,
          Hand.HighCard
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1.splice(3, 4, {
            suit: 'Spades',
            number: 9,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-69] ハイカード vs ハイカード | 数字が強いPlayer1の勝利 A vs 8', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.HighCard].A,
          Hand.HighCard
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1.splice(3, 4, {
            suit: 'Spades',
            number: 8,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-70] ハイカード vs ハイカード | 数字が強いPlayer1の勝利 A vs 7', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.HighCard].A,
          Hand.HighCard
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1.splice(3, 4, {
            suit: 'Spades',
            number: 7,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-71] ハイカード vs ハイカード | 数字が強いPlayer1の勝利 K vs Q', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.HighCard].A.splice(3, 4, {
            suit: 'Spades',
            number: 13,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1.splice(3, 4, {
            suit: 'Spades',
            number: 12,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-72] ハイカード vs ハイカード | 数字が強いPlayer1の勝利 K vs J', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.HighCard].A.splice(3, 4, {
            suit: 'Spades',
            number: 13,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1.splice(3, 4, {
            suit: 'Spades',
            number: 11,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-73] ハイカード vs ハイカード | 数字が強いPlayer1の勝利 K vs 10', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.HighCard].A.splice(3, 4, {
            suit: 'Spades',
            number: 13,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1.splice(3, 4, {
            suit: 'Spades',
            number: 10,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-74] ハイカード vs ハイカード | 数字が強いPlayer1の勝利 K vs 9', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.HighCard].A.splice(3, 4, {
            suit: 'Spades',
            number: 13,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1.splice(3, 4, {
            suit: 'Spades',
            number: 9,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-75] ハイカード vs ハイカード | 数字が強いPlayer1の勝利 K vs 8', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.HighCard].A.splice(3, 4, {
            suit: 'Spades',
            number: 13,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1.splice(3, 4, {
            suit: 'Spades',
            number: 8,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-76] ハイカード vs ハイカード | 数字が強いPlayer1の勝利 K vs 7', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.HighCard].A.splice(3, 4, {
            suit: 'Spades',
            number: 13,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1.splice(3, 4, {
            suit: 'Spades',
            number: 7,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-77] ハイカード vs ハイカード | 数字が強いPlayer1の勝利 Q vs J', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.HighCard].A.splice(3, 4, {
            suit: 'Spades',
            number: 12,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1.splice(3, 4, {
            suit: 'Spades',
            number: 11,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-78] ハイカード vs ハイカード | 数字が強いPlayer1の勝利 Q vs 10', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.HighCard].A.splice(3, 4, {
            suit: 'Spades',
            number: 12,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1.splice(3, 4, {
            suit: 'Spades',
            number: 10,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-79] ハイカード vs ハイカード | 数字が強いPlayer1の勝利 Q vs 9', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.HighCard].A.splice(3, 4, {
            suit: 'Spades',
            number: 12,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1.splice(3, 4, {
            suit: 'Spades',
            number: 9,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-80] ハイカード vs ハイカード | 数字が強いPlayer1の勝利 Q vs 8', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.HighCard].A.splice(3, 4, {
            suit: 'Spades',
            number: 12,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1.splice(3, 4, {
            suit: 'Spades',
            number: 8,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-81] ハイカード vs ハイカード | 数字が強いPlayer1の勝利 Q vs 7', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.HighCard].A.splice(3, 4, {
            suit: 'Spades',
            number: 12,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1.splice(3, 4, {
            suit: 'Spades',
            number: 7,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-82] ハイカード vs ハイカード | 数字が強いPlayer1の勝利 J vs 10', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.HighCard].A.splice(3, 4, {
            suit: 'Spades',
            number: 11,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1.splice(3, 4, {
            suit: 'Spades',
            number: 10,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-83] ハイカード vs ハイカード | 数字が強いPlayer1の勝利 J vs 9', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.HighCard].A.splice(3, 4, {
            suit: 'Spades',
            number: 11,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1.splice(3, 4, {
            suit: 'Spades',
            number: 9,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-84] ハイカード vs ハイカード | 数字が強いPlayer1の勝利 J vs 8', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.HighCard].A.splice(3, 4, {
            suit: 'Spades',
            number: 11,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1.splice(3, 4, {
            suit: 'Spades',
            number: 8,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-85] ハイカード vs ハイカード | 数字が強いPlayer1の勝利 J vs 7', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.HighCard].A.splice(3, 4, {
            suit: 'Spades',
            number: 11,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1.splice(3, 4, {
            suit: 'Spades',
            number: 7,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-86] ハイカード vs ハイカード | 数字が強いPlayer1の勝利 10 vs 9', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.HighCard].A.splice(3, 4, {
            suit: 'Spades',
            number: 10,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1.splice(3, 4, {
            suit: 'Spades',
            number: 9,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-87] ハイカード vs ハイカード | 数字が強いPlayer1の勝利 10 vs 8', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.HighCard].A.splice(3, 4, {
            suit: 'Spades',
            number: 10,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1.splice(3, 4, {
            suit: 'Spades',
            number: 8,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-88] ハイカード vs ハイカード | 数字が強いPlayer1の勝利 10 vs 7', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.HighCard].A.splice(3, 4, {
            suit: 'Spades',
            number: 10,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1.splice(3, 4, {
            suit: 'Spades',
            number: 7,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-89] ハイカード vs ハイカード | 数字が強いPlayer1の勝利 9 vs 8', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.HighCard].A.splice(3, 4, {
            suit: 'Spades',
            number: 9,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1.splice(3, 4, {
            suit: 'Spades',
            number: 8,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-90] ハイカード vs ハイカード | 数字が強いPlayer1の勝利 9 vs 7', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.HighCard].A.splice(3, 4, {
            suit: 'Spades',
            number: 9,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1.splice(3, 4, {
            suit: 'Spades',
            number: 7,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-91] ハイカード vs ハイカード | 数字が強いPlayer1の勝利 8 vs 7', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.HighCard].A.splice(3, 4, {
            suit: 'Spades',
            number: 8,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1.splice(3, 4, {
            suit: 'Spades',
            number: 7,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-92] ハイカード vs ハイカード | スートが強いPlayer1の勝利 スペード vs ハート', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.HighCard].A,
          Hand.HighCard
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1.splice(3, 4, {
            suit: 'Hearts',
            number: 1,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-93] ハイカード vs ハイカード | スートが強いPlayer1の勝利 スペード vs ダイヤ', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.HighCard].A,
          Hand.HighCard
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1.splice(3, 4, {
            suit: 'Diamonds',
            number: 1,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-94] ハイカード vs ハイカード | スートが強いPlayer1の勝利 スペード vs クラブ', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.HighCard].A,
          Hand.HighCard
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1.splice(3, 4, {
            suit: 'Clubs',
            number: 1,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-95] ハイカード vs ハイカード | スートが強いPlayer1の勝利 ハート vs ダイヤ', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.HighCard].A.splice(3, 4, {
            suit: 'Hearts',
            number: 1,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1.splice(3, 4, {
            suit: 'Diamonds',
            number: 1,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-96] ハイカード vs ハイカード | スートが強いPlayer1の勝利 ハート vs クラブ', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.HighCard].A.splice(3, 4, {
            suit: 'Hearts',
            number: 1,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1.splice(3, 4, {
            suit: 'Clubs',
            number: 1,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });

    test('[Result-97] ハイカード vs ハイカード | スートが強いPlayer1の勝利 ダイヤ vs クラブ', () => {
      const winner = compareCards({
        Player1: createActivePlayer(
          'Player1',
          testCards[Hand.HighCard].A.splice(3, 4, {
            suit: 'Diamonds',
            number: 1,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player2: createActivePlayer(
          'Player2',
          testCards[Hand.HighCard].B1.splice(3, 4, {
            suit: 'Clubs',
            number: 1,
          }) as CardSet<Card>,
          Hand.HighCard
        ),
        Player3: createOutPlayer('Player3'),
        Player4: createOutPlayer('Player4'),
      });
      expect(winner).toBe('Player1');
    });
  });
});
