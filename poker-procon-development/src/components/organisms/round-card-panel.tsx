import { Flex, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { generatePath } from 'react-router-dom';

import CardPanel from '@/components/molecules/card-panel';
import ROUTE from '@/constants/route';
import type { Log } from '@/schema/log';
import type { ChangeNum } from '@/schema/style';

import RoundePlayerResult from '../molecules/round-player-result';

export interface RoundCardPanelProps {
  id: string;
  round: number;
  logs: Log[];
  index: number;
}

const RoundCardPanel = ({ id, round, logs, index }: RoundCardPanelProps) => {
  const startLog = useMemo(
    () => logs.find((item) => item.phase === 'start'),
    [logs]
  );

  // ログからフェーズごとの交換枚数を抽出し、プレイヤーごとのMapを返す
  const changeNums = useMemo(() => {
    const changeLogs = logs.filter(
      (item) => item.phase === 'draw-1' || item.phase === 'draw-2'
    );

    const obj: {
      [key: string]: { first?: ChangeNum; second?: ChangeNum };
    } = {};
    for (let i = 0; i < changeLogs.length; i += 1) {
      const log = changeLogs[i];
      if (log?.content.type === 'draw') {
        obj[log.player] = obj[log.player] ?? {};

        if (log.phase === 'draw-1') {
          obj[log.player] = {
            ...obj[log.player],
            first: log.content.exchange.filter((item) => item === true)
              .length as ChangeNum,
          };
        }

        if (log.phase === 'draw-2') {
          obj[log.player] = {
            ...obj[log.player],
            second: log.content.exchange.filter((item) => item === true)
              .length as ChangeNum,
          };
        }
      }
    }

    return obj;
  }, [logs]);

  const finishLog = useMemo(
    () => logs.find((item) => item.phase === 'finished'),
    [logs]
  );

  const pot = useMemo(
    () => finishLog?.content.type === 'finished' && finishLog.content.pot,
    [finishLog?.game.players]
  );

  if (!finishLog) return null;

  return (
    <CardPanel
      size="md"
      number={Number(round)}
      index={index}
      href={generatePath(ROUTE.S_B01_003, { id, round })}
    >
      <Flex direction="column" align="center" w="full">
        <Flex
          justify="space-between"
          alignItems="center"
          w="full"
          borderBottomColor="brand100.800"
          borderBottomStyle="solid"
          borderBottomWidth={1}
          px={2.5}
          py={1}
        >
          <Text textStyle="bold.md">Pot</Text>
          <Text textStyle="normal.md">{Number(pot).toLocaleString()}pt</Text>
        </Flex>
        <Flex direction="column" gap={1} w="full" px={2.5} py={1}>
          {startLog &&
            finishLog &&
            finishLog.game.seatingOrder.map((name) => {
              if (!finishLog.game.players[name]) return null;

              return (
                <RoundePlayerResult
                  key={name}
                  player={finishLog.game.players[name]}
                  change={changeNums[name]}
                  point={{
                    before:
                      Number(startLog.game.players[name]?.point) +
                      Number(startLog.game.fee),
                    after: Number(finishLog.game.players[name]?.point),
                  }}
                  winner={
                    finishLog.content.type === 'finished' &&
                    finishLog.content.winner === name
                  }
                  isPlay={startLog.game.players[name]?.status === 'active'}
                  out={finishLog.game.players[name]?.point < finishLog.game.fee}
                />
              );
            })}
        </Flex>
      </Flex>
    </CardPanel>
  );
};

export default RoundCardPanel;
