import { Tag } from '@chakra-ui/react';

import { GAME_STATUS } from '@/constants/game';
import type { GameStatus } from '@/schema/game';

export type GameStatusTagProps = {
  status: GameStatus;
};

const GameStatusTag = ({ status }: GameStatusTagProps) => (
  <Tag bgColor={GAME_STATUS[status].color} variant="solid" size="sm">
    {GAME_STATUS[status].label}
  </Tag>
);

export default GameStatusTag;
