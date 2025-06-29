import { Button, Flex, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import Link from 'next/link';
import { useMemo } from 'react';
import { generatePath } from 'react-router-dom';

import { useStartGameMutation } from '@/apis/mutation';
import GameStatusTag from '@/components/atoms/game-status-tag';
import CardPanel from '@/components/molecules/card-panel';
import ROUTE from '@/constants/route';
import type { Game } from '@/schema/game';

export interface GameCardPanelProps {
  game: Game;
  index: number;
  postStartGame: (id: string) => void;
  setIsLoading: (flag: boolean) => void;
}

const GameCardPanel = ({
  game,
  index,
  postStartGame,
  setIsLoading,
}: GameCardPanelProps) => {
  const { mutateAsync: startGame } = useStartGameMutation();

  const dataList = useMemo(
    () => [
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
            {game.startedAt
              ? format(new Date(game.startedAt), 'yyyy-MM-dd hh:mm:ss')
              : ''}
          </Text>
        ),
      },
      {
        label: 'プレイヤー',
        data: (
          <Flex flexWrap="wrap" w="min">
            {Object.values(game.players).map((player) => (
              <Text key={player.name} isTruncated textStyle="normal.md">
                {player.name}
              </Text>
            ))}
          </Flex>
        ),
      },
      {
        label: 'ラウンド数',
        data: (
          <Text textStyle="normal.md">
            {game.totalRound.toLocaleString()}round
          </Text>
        ),
      },
      // {
      //   label: '初期ポイント',
      //   data: (
      //     <Text textStyle="normal.md">
      //       {game.initialPoint.toLocaleString()}pt
      //     </Text>
      //   ),
      // },
      // {
      //   label: '参加フィー',
      //   data: <Text textStyle="normal.md">{game.fee.toLocaleString()}pt</Text>,
      // },
    ],
    [game]
  );

  return (
    <CardPanel number={Number(game.id)} index={index}>
      <Flex direction="column" justify="space-between" h="full">
        <Flex direction="column" align="center" w="full">
          {dataList.map((item) => (
            <Flex
              key={item.label}
              justify="space-between"
              alignItems="center"
              w="full"
              borderBottomColor="brand100.800"
              borderBottomStyle="solid"
              borderBottomWidth={1}
              px={2.5}
              py={1}
              _last={{
                borderBottomWidth: 0,
              }}
            >
              <Text textStyle="bold.md">{item.label}</Text>
              {item.data}
            </Flex>
          ))}
        </Flex>
        {game.status === 'new' && (
          <Button
            size="sm"
            variant="outline"
            colorScheme="red"
            borderColor="brand100.300"
            color="brand100.300"
            onClick={async () => {
              setIsLoading(true);
              const res = await startGame(game.id);
              postStartGame(res.id);
            }}
            mt="auto"
          >
            開始
          </Button>
        )}
        {game.status !== 'new' && (
          <Button
            size="sm"
            variant="outline"
            colorScheme="blue"
            borderColor={
              game.status === 'finished' ? 'brand100.200' : 'brand100.600'
            }
            color={game.status === 'finished' ? 'brand100.200' : 'brand100.600'}
            isDisabled={game.status === 'progress'}
            as={Link}
            href={
              game.status === 'progress'
                ? ''
                : generatePath(ROUTE.S_B01_002, { id: game.id })
            }
            w="full"
          >
            {game.status === 'finished' ? '詳細' : '進行中'}
          </Button>
        )}
      </Flex>
    </CardPanel>
  );
};

export default GameCardPanel;
