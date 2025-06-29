import type { BoxProps } from '@chakra-ui/react';
import { Box, Flex, Image } from '@chakra-ui/react';
import { useMemo } from 'react';

import ActionLabel from '@/components/atoms/action-label';
import LogPayPoint from '@/components/molecules/log-pay-point';
import LogPlayerInformation from '@/components/molecules/log-player-information';
import PlayerCards from '@/components/molecules/player-cards';
import type { Log } from '@/schema/log';
import type { Player } from '@/schema/player';
import { margin8, margin16 } from '@/styles';
import { isEmphasizeGamePlayer } from '@/utils/style';

import HandLabel from '../atoms/hand-label';

export interface LogPlayerAreaProps extends BoxProps {
  player: Player;
  log: Log;
}

const LogPlayerArea = ({ player, log, ...rest }: LogPlayerAreaProps) => {
  const actionTagLabel = useMemo(() => {
    // 既にoutになっている
    if (log.game.players[player.name]?.status === 'out') return 'out';

    if (log.player === player.name) {
      // 自分のターンのログ

      if (log.content.type === 'bet') return player.round.action; // ベットフェーズ
      if (log.content.type === 'draw')
        return `Exchange ${
          log.content.exchange.filter((discard) => discard).length
        } cards`; // ドローフェーズ
    }

    return '';
  }, [log, player.name, player.round.action]);

  const isActive = useMemo(
    () => player.status !== 'active' || player.round.action !== 'drop',
    [player]
  );

  return (
    <Flex direction="column" align="center" {...rest}>
      {log.content.type === 'finished' &&
        log.content.winner === player.name && (
          <Image
            src="/win.svg"
            alt="win"
            position="absolute"
            top={0}
            left="50%"
            zIndex={1}
            transform="translateX(-50%)"
            h={[24, 24, 36, 36, 48]}
          />
        )}
      <Box position="relative">
        <PlayerCards cards={player.round.cards} />
        <LogPlayerInformation
          player={player}
          isEmphasize={isEmphasizeGamePlayer(player.name, log)}
          log={log}
          isActive={isActive}
        />
      </Box>
      {(log.phase !== 'finished' || actionTagLabel === 'out') && (
        <ActionLabel
          label={actionTagLabel}
          add={log.content.type === 'bet' ? log.content.amount : 0}
          mt={margin16}
        />
      )}
      {log.phase === 'finished' &&
        log.game.players[player.name]?.status === 'active' && (
          <>
            {player.round.hand !== undefined && (
              <HandLabel
                hand={player.round.hand}
                isEmphasize={isEmphasizeGamePlayer(player.name, log)}
                mt={margin16}
              />
            )}
          </>
        )}
      {log.game.players[player.name]?.status === 'active' && (
        <LogPayPoint
          fee={log.game.fee}
          first={player.round.first}
          second={player.round.second}
          mt={margin8}
          isActive={isActive}
        />
      )}
    </Flex>
  );
};

export default LogPlayerArea;
