import {
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { Fragment, useCallback, useMemo } from 'react';

import type { Game } from '@/schema/game';
import type { Log } from '@/schema/log';
import type { Player } from '@/schema/player';

import GameStatusTag from '../atoms/game-status-tag';

export interface GameInformationProps {
  id: string;
  game: Game;
  list: { round: number; logs: Log[] }[];
  winRound: {
    [key: string]: number;
  };
}

const GameInformation = ({
  id,
  game,
  list,
  winRound,
}: GameInformationProps) => {
  const winner = useMemo(() => {
    return Object.values(game.players).sort((a, b) => b.point - a.point)[0];
  }, [game.players]);

  const gameInfo = useMemo(
    () => [
      {
        label: 'ID',
        data: <Text textStyle="normal.md">{id}</Text>,
      },
      {
        label: 'ラウンド',
        data: (
          <Text textStyle="normal.md">
            {list.length} / {game.totalRound}
          </Text>
        ),
      },
      {
        label: '初期ポイント',
        data: (
          <Text textStyle="normal.md">
            {game.initialPoint.toLocaleString()}pt
          </Text>
        ),
      },
      {
        label: '参加フィー',
        data: <Text textStyle="normal.md">{game.fee.toLocaleString()}pt</Text>,
      },
      {
        label: 'ステータス',
        data: <GameStatusTag status={game.status} />,
      },
      {
        label: '作成日時',
        data: (
          <Text textStyle="normal.md">
            {format(new Date(game.createdAt), 'yyyy-MM-dd hh:mm:ss')}
          </Text>
        ),
      },
      {
        label: '開始日時',
        data: (
          <Text textStyle="normal.md">
            {game.startedAt &&
              format(new Date(game.startedAt), 'yyyy-MM-dd hh:mm:ss')}
          </Text>
        ),
      },
    ],
    [
      game.createdAt,
      game.fee,
      game.initialPoint,
      game.startedAt,
      game.status,
      game.totalRound,
      id,
      list.length,
    ]
  );

  const bgColor = useCallback(
    (player: Player) =>
      player.name === winner?.name ? 'inherit' : 'brand100.600',
    [game, winner]
  );

  return (
    <Flex direction="column" px={5} py={2.5} bgColor="white">
      <Flex
        columnGap={5}
        rowGap={1}
        wrap="wrap"
        maxW="2xl"
        py={2.5}
        borderBottomColor="brand100.800"
        borderBottomStyle="solid"
        borderBottomWidth={1}
      >
        {gameInfo.map((item) => (
          <Flex key={item.label} alignItems="center" gap={1}>
            <Text textStyle="bold.md">{item.label}</Text>
            {item.data}
          </Flex>
        ))}
      </Flex>
      <Box>
        <Table>
          <Thead>
            <Tr>
              <Th>NAME</Th>
              {game.seatingOrder.map((name) => (
                <Fragment key={name}>
                  {game.players[name] && (
                    <Th bgColor={bgColor(game.players[name])}>{name}</Th>
                  )}
                </Fragment>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Th>POINT</Th>
              {game.seatingOrder.map((name) => (
                <Fragment key={name}>
                  {game.players[name] && (
                    <Td bgColor={bgColor(game.players[name])}>
                      {game.players[name]?.point.toLocaleString()}pt
                    </Td>
                  )}
                </Fragment>
              ))}
            </Tr>
            <Tr>
              <Th>WIN ROUND</Th>
              {game.seatingOrder.map((name) => (
                <Fragment key={name}>
                  {game.players[name] && (
                    <Td bgColor={bgColor(game.players[name])}>
                      {winRound[name]?.toLocaleString()}round
                    </Td>
                  )}
                </Fragment>
              ))}
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
};

export default GameInformation;
