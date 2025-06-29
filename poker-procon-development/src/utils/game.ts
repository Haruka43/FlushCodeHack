import { SuitRank } from '@/schema/card';
import { Hand } from '@/schema/game';
import type { Player } from '@/schema/player';

import { convertRankCard, countRanks } from './hand';

/**
 * ランダムな数字を生成する
 * @param num パターン数
 * @returns
 */
export const randomByNumber = (num: number) => Math.floor(Math.random() * num);

/**
 * 配列をシャッフルする
 * @param array
 * @returns
 */
export const shuffleArray = (array: any[]) => {
  const cloneArray = [...array];

  for (let i = cloneArray.length - 1; i >= 0; i -= 1) {
    const rand = randomByNumber(i + 1);
    const tmpStorage = cloneArray[i];
    cloneArray[i] = cloneArray[rand];
    cloneArray[rand] = tmpStorage;
  }

  return cloneArray;
};

/**
 * 宣言するアクションを追加するポイントで決定する
 * @param point 所持ポイント
 * @param minBetPoint 最低賭けポイント
 * @param myBetPoint 既に支払ったポイント
 * @param amount 追加で賭けるポイント
 * @returns
 */
export const callActionByPoint = (
  point: number,
  minBetPoint: number,
  myBetPoint: number,
  amount: number
) => {
  const difference = minBetPoint - myBetPoint; // コールするために支払う必要があるポイント
  const stack = point - difference; // ドロップしなかった場合に使用できるポイント

  // 追加で賭けるポイントが所持ポイント以上であれば、all-in ※以後、dropできない
  if (amount >= stack) {
    return 'all-in';
  }

  // 追加で賭けるポイントが0の場合、callとする
  if (amount === 0) {
    return minBetPoint ? 'call' : 'check';
  }

  // 追加で賭けるポインを負の値で指定した場合、dropとする
  if (amount < 0) {
    return 'drop';
  }

  // 追加で賭けるポイントが正の値の場合、raiseとする
  return minBetPoint ? 'raise' : 'bet';
};

/**
 * 手札を比較し勝者を決める
 * 1. 役のランクが高いほうが優位
 * 2. 数字（のランク）が高い方が優位
 * 3. スート（のランク）が高いほうが優位
 * @param players
 * @returns
 */
export const compareCards = (players: { [name: string]: Player }): string => {
  // 全プレイヤーの役の中で一番高いランクを取得
  const maxHandRank = Math.max(
    ...Object.values(players).map((player) => player.round.hand ?? 0)
  );

  // 一番高いランクに該当するプレイヤーの一覧を取得
  const maxHandRankPlayers = Object.values(players)
    .filter((player) => player.round.cards.length)
    .filter((player) => player.round.hand === maxHandRank);

  // 一番高いランクに該当するプレイヤーが1人の場合、勝者として確定
  if (maxHandRankPlayers.length === 1) return maxHandRankPlayers[0]?.name ?? '';

  // 以下、最高ランクの役が揃ったプレイヤーが複数いる場合の処理
  // 同ランクの役の場合、役を形成するカードのスート・ランクの高さで勝者を決める
  switch (maxHandRank) {
    // ロイヤルストレートフラッシュ同士の比較
    case Hand.RoyalStraightFlush:
      return (
        maxHandRankPlayers.sort((a, b) => {
          return (
            (b.round.cards[4] ? convertRankCard(b.round.cards[4]).suit : 0) -
            (a.round.cards[4] ? convertRankCard(a.round.cards[4]).suit : 0)
          );
        })[0]?.name ?? ''
      );

    // ストレートフラッシュ同士, フラッシュ同士, ストーレート同士, ハイカード同士の比較
    case Hand.StraightFlush:
    case Hand.Flush:
    case Hand.Straight:
    case Hand.HighCard:
      return (
        maxHandRankPlayers.sort((a, b) => {
          const rankCardA =
            a.round.cards[4] && convertRankCard(a.round.cards[4]); // 5枚目のカードを比較用フォーマットに変換
          const rankCardB =
            b.round.cards[4] && convertRankCard(b.round.cards[4]); // 5枚目のカードを比較用フォーマットに変換

          if (!rankCardA || !rankCardB) return 0;

          // 互いの一番ランクの高いカードが同ランク場合、スートの強さで勝者を決める
          if (rankCardA.number !== rankCardB?.number)
            return rankCardB.number - rankCardA.number;

          // 互いの一番ランクの高いカードが異なるランク場合、数字の強さで勝者を決める
          return rankCardB.suit - rankCardA.suit;
        })[0]?.name ?? ''
      );

    // フォーカード同士の比較
    case Hand.FourOfAKind:
      return (
        maxHandRankPlayers.sort((a, b) => {
          const rankCountsA = countRanks(
            a.round.cards.map((card) => convertRankCard(card))
          ); // 手札カードを数字のランク別に集計
          let manyRankA;
          rankCountsA.forEach((value, key) => {
            if (value === 4) {
              manyRankA = key;
            }
          }); // 一番枚数の多いカードの数字ランク

          const rankCountsB = countRanks(
            b.round.cards.map((card) => convertRankCard(card))
          ); // 手札カードを数字のランク別に集計
          let manyRankB;
          rankCountsB.forEach((value, key) => {
            if (value === 4) {
              manyRankB = key;
            }
          }); // 一番枚数の多いカードの数字ランク

          if (!manyRankA || !manyRankB) return 0;

          // 互いの4枚あるカード数字の強さで勝者を決める
          return manyRankB - manyRankA;
        })[0]?.name ?? ''
      );

    // フルハウス同士, スリーカード同士の比較
    case Hand.FullHouse:
    case Hand.ThreeOfAKind:
      return (
        maxHandRankPlayers.sort((a, b) => {
          const rankCountsA = countRanks(
            a.round.cards.map((card) => convertRankCard(card))
          ); // 手札カードを数字のランク別に集計
          let manyRankA;
          rankCountsA.forEach((value, key) => {
            if (value === 3) {
              manyRankA = key;
            }
          }); // 一番枚数の多いカードの数字ランク

          const rankCountsB = countRanks(
            b.round.cards.map((card) => convertRankCard(card))
          ); // 手札カードを数字のランク別に集計
          let manyRankB;
          rankCountsB.forEach((value, key) => {
            if (value === 3) {
              manyRankB = key;
            }
          }); // 一番枚数の多いカードの数字ランク

          if (!manyRankA || !manyRankB) return 0;

          // 互いの3枚あるカード数字の強さで勝者を決める
          return manyRankB - manyRankA;
        })[0]?.name ?? ''
      );

    // ツーペア同士, ワンペア同士の比較
    default:
      return (
        maxHandRankPlayers.sort((a, b) => {
          const rankCountsA = countRanks(
            a.round.cards.map((card) => convertRankCard(card))
          ); // 手札カードを数字のランク別に集計
          const manyRankA: number[] = [];
          rankCountsA.forEach((value, key) => {
            if (value === 2) {
              manyRankA.push(Number(key));
            }
          }); // 2枚保持しているカードの数字ランク

          const rankCountsB = countRanks(
            b.round.cards.map((card) => convertRankCard(card))
          ); // 手札カードを数字のランク別に集計
          const manyRankB: number[] = [];
          rankCountsB.forEach((value, key) => {
            if (value === 2) {
              manyRankB.push(Number(key));
            }
          }); // 2枚保持しているカードの数字ランク

          if (!manyRankA.length || !manyRankB.length) return 0;

          // 互いの2枚あるカード数字の強さで勝者を決める
          const maxRankA = Math.max(...manyRankB);
          const maxRankB = Math.max(...manyRankA);
          if (maxRankA !== maxRankB) return maxRankA - maxRankB;

          // 互いの一番ランクの高いカードが異なるランク場合、スートの強さで勝者を決める（スペードのカードを持っているプレイヤーの勝利）
          if (
            a.round.cards.find((card) => {
              const rankCard = convertRankCard(card);
              return (
                rankCard.suit === SuitRank.Spades &&
                rankCard.number === maxRankA
              );
            })
          )
            return -1;
          if (
            b.round.cards.find((card) => {
              const rankCard = convertRankCard(card);
              return (
                rankCard.suit === SuitRank.Spades &&
                rankCard.number === maxRankA
              );
            })
          )
            return 1;

          return 0;
        })[0]?.name ?? ''
      );
  }
};
