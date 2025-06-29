import { Flex, Text } from '@chakra-ui/react';

import AllInTag from '@/components/atoms/all-in-tag';
import ChangeCardNum from '@/components/atoms/change-card-num';
import type { Player } from '@/schema/player';
import type { ChangeNum } from '@/schema/style';

import { HAND_RANK } from '../../constants/game';

export interface RoundePlayerResultProps {
  player: Player;
  change?: { first?: ChangeNum; second?: ChangeNum };
  point?: {
    before: number;
    after: number;
  };
  winner: boolean;
  isPlay: boolean;
  out: boolean;
}

const RoundePlayerResult = ({
  player,
  change,
  point,
  winner,
  isPlay,
  out,
}: RoundePlayerResultProps) => (
  <Flex
    h="4.5rem"
    direction="column"
    gap={0.5}
    pb={1}
    borderBottomColor="brand100.800"
    borderBottomStyle="dashed"
    borderBottomWidth={1}
    _last={{
      borderBottomWidth: 0,
    }}
  >
    <Text
      textStyle="bold.md"
      color={player.status === 'active' ? 'inherit' : 'brand100.600'}
      isTruncated
    >
      {player.name}
    </Text>
    {isPlay && (
      <>
        <Flex align="center" justify="space-between">
          {player.round.hand !== undefined && (
            <Flex>
              <Text
                textStyle={winner ? 'bold.md' : 'normal.md'}
                color={winner ? 'brand100.300' : 'inherit'}
              >
                {HAND_RANK[player.round.hand]}
              </Text>
            </Flex>
          )}
          {player.round.action === 'all-in' && <AllInTag />}
        </Flex>
        <Flex align="center" justify="space-between">
          {change?.first && !Number.isNaN(Number(change?.first)) ? (
            <ChangeCardNum num={change.first} times={2} />
          ) : (
            <></>
          )}
          {change?.second && !Number.isNaN(Number(change?.second)) ? (
            <ChangeCardNum num={change.second} times={1} />
          ) : (
            <></>
          )}
          {point && (
            <Flex
              justify="center"
              gap={1}
              flex={1}
              maxW={48}
              ml="auto"
              px={1}
              py={0.5}
              bgColor="brand100.800"
              borderRadius="base"
            >
              <Text textStyle="normal.sm">
                {point.before.toLocaleString()}pt
              </Text>
              <Text textStyle="normal.sm">→</Text>
              <Text
                textStyle={winner ? 'bold.sm' : 'normal.sm'}
                color={out ? 'brand100.300' : 'inherit'}
              >
                {point.after.toLocaleString()}pt
              </Text>
            </Flex>
          )}
        </Flex>
      </>
    )}
  </Flex>
);

export default RoundePlayerResult;
