import type { Card, CardSet, RankCard } from '@/schema/card';
import { CardNumberRank, SuitRank } from '@/schema/card';
import type { Hand } from '@/schema/game';

/**
 * 手札カードをランク別に集計
 * ex.) { CardNumberRank.Ace: 2, CardNumberRank.Two: 1, CardNumberRank.Five: 1, CardNumberRank.Eleven: 1 }
 * @param cards
 * @returns
 */
export const countRanks = (cards: RankCard[]): Map<CardNumberRank, number> => {
  const rankCounts = new Map<CardNumberRank, number>();
  cards.forEach((card) => {
    rankCounts.set(card.number, (rankCounts.get(card.number) || 0) + 1);
  });
  return rankCounts;
};

/**
 * カードをランク集計用フォーマットに変換する
 * @param card
 * @returns
 */
export const convertRankCard = (card: Card): RankCard => {
  return {
    suit: SuitRank[card.suit],
    number:
      card.number === 1 ? CardNumberRank.Ace : (card.number as CardNumberRank),
  };
};

/**
 * 手札の組み合わせがFlushに該当するか
 * @param cards
 * @returns
 */
export const isFlush = (cards: RankCard[]): boolean => {
  const firstSuit = cards[0]?.suit;
  return cards.every((card) => card.suit === firstSuit);
};

/**
 * 手札の組み合わせがStraightに該当するか
 * @param cards
 * @returns
 */
export const isStraight = (cards: RankCard[]): boolean => {
  const sortedRanks = cards.map((card) => card.number).sort((a, b) => a - b);
  const high = sortedRanks[4];
  const low = sortedRanks[0];
  if (!high || !low) return false;
  return high - low === 4 && new Set(sortedRanks).size === 5;
};

/**
 * 手札を評価し、役を確定する
 * @param cards
 * @returns
 */
export const evaluateHand = (cards: CardSet<Card>): Hand => {
  const rankCards = cards.map((card) => convertRankCard(card));
  const rankCounts = countRanks(rankCards); // 手札カードを数字のランク別に集計

  const distinctRanks = Array.from(rankCounts.keys()); // 手札カードのランクリスト
  const numDistinctRanks = distinctRanks.length; // 手札カードの数字のバリエーション数

  // 手札の数字が5種類ある = 同じ数字のカードが無い
  if (numDistinctRanks === 5) {
    if (isFlush(rankCards) && isStraight(rankCards)) {
      return rankCounts.get(CardNumberRank.Ace) ? 10 : 9; // Royal Straight Flush or Straight Flush
    }
    if (isFlush(rankCards)) {
      return 6; // Flush
    }
    if (isStraight(rankCards)) {
      return 5; // Straight
    }
    return 1; // High Card
  }

  // 手札の数字が4種類ある = 同じ数字のカードが2枚ある
  if (numDistinctRanks === 4) {
    return 2; // One Pair
  }

  // 手札の数字が3種類ある = 同じ数字のカードが3枚ある or 同じ数字のカードが2枚×2ある
  if (numDistinctRanks === 3) {
    // 手札カードのランク別集計で最大枚数所持しているカード枚数3である場合、a×3, b×1, c×1の組み合わせ
    if (
      Math.max(...distinctRanks.map((rank) => rankCounts.get(rank) ?? 0)) === 3
    ) {
      return 4; // Three of a Kind
    }

    // 手札カードのランク別集計で最大枚数所持しているカード枚数が3ではない場合、a×2, b×2, c×1の組み合わせ
    return 3; // Two Pair
  }

  // 手札の数字が2種類ある = 同じ数字のカードが4枚ある or 同じ数字のカードが3枚×1と2枚×1ある
  if (numDistinctRanks === 2) {
    // 手札カードのランク別集計で最大枚数所持しているカード枚数4である場合、a×4, b×1の組み合わせ
    if (
      Math.max(...distinctRanks.map((rank) => rankCounts.get(rank) ?? 0)) === 4
    ) {
      return 8; // Four of a Kind
    }

    // 手札カードのランク別集計で最大枚数所持しているカード枚数が4ではない場合、a×3, b×2の組み合わせ
    return 7; // Full House
  }

  // カードを所持していない = drop or out状態
  return 0;
};
