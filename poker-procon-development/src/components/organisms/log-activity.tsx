import { Flex, Text } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';
import { useCallback, useMemo } from 'react';

import type { Log } from '@/schema/log';
import { boldL, margin8 } from '@/styles';

import ExchangeCardSet from '../molecules/exchange-card-set';

export type LogActivityType = {
  log: Log;
};

const LogActivity = ({ log }: LogActivityType) => {
  const TextWrapper = useCallback(
    ({ children }: PropsWithChildren) => (
      <Text textStyle={boldL} color="white">
        {children}
      </Text>
    ),
    []
  );

  const beforeMinBetPoint = useMemo(() => {
    if (log.content.type !== 'bet') return 0;

    if (
      log.content.type === 'bet' &&
      (log.content.action === 'bet' || log.content.action === 'raise')
    ) {
      return log.minBetPoint - log.content.amount;
    }

    return log.minBetPoint;
  }, [log]);

  return (
    <Flex
      position="absolute"
      top={0}
      right={0}
      direction="column"
      align="center"
      gap={margin8}
    >
      {log.content.type === 'bet' && (
        <>
          <Flex gap={margin8}>
            <TextWrapper>Pot:</TextWrapper>
            <TextWrapper>
              {(log.pot - log.content.payPoint).toLocaleString()}pt
            </TextWrapper>
            <TextWrapper>→</TextWrapper>
            <TextWrapper>{log.pot.toLocaleString()}pt</TextWrapper>
          </Flex>
          <Flex gap={margin8}>
            <TextWrapper>Min bet point:</TextWrapper>
            <TextWrapper>{beforeMinBetPoint.toLocaleString()}pt</TextWrapper>
            <TextWrapper>→</TextWrapper>
            <TextWrapper>{log.minBetPoint.toLocaleString()}pt</TextWrapper>
          </Flex>
        </>
      )}
      {log.content.type === 'draw' && (
        <>
          {log.content.discard.length > 0 ? (
            <Flex direction="column" align="center" gap={margin8}>
              <ExchangeCardSet cards={log.content.discard} discard={false} />
              <Text textStyle="normal.md" color="white">
                ↓
              </Text>
              <ExchangeCardSet cards={log.content.newCard} discard />
            </Flex>
          ) : (
            <Text textStyle={boldL} color="white">
              No change.
            </Text>
          )}
        </>
      )}
    </Flex>
  );
};
export default LogActivity;
