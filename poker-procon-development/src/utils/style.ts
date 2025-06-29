import { type Card } from '@/schema/card';
import type { Log } from '@/schema/log';

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const generateCardPath = (card: Card) => {
  const number = card.number < 10 ? `0${card.number}` : card.number;
  return `/card/${card.suit}-${number}.svg`;
};

export const isEmphasizeGamePlayer = (player: string, log: Log) => {
  return (
    log.player === log.game.players[player]?.name ||
    (log.content.type === 'finished' && log.content.winner === player)
  );
};
