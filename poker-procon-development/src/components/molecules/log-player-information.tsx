import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import { useMemo } from 'react';

import CurrentHand from '@/components/atoms/current-hand';
import PlayerIcon from '@/components/atoms/player-icon';
import type { Log } from '@/schema/log';
import type { Player } from '@/schema/player';
import { normalS, strongS } from '@/styles';

export interface LogPlayerInformationType {
  player: Player;
  isEmphasize: boolean;
  log: Log;
  isActive: boolean;
}

const LogPlayerInformation = ({
  player,
  isEmphasize,
  log,
  isActive,
}: LogPlayerInformationType) => {
  const isAllIn = useMemo(
    () => player.round.action === 'all-in',
    [player.round.action]
  );

  const borderColor = useMemo(() => {
    return isActive ? 'brand80.100' : 'brand80.600';
  }, [isActive, isAllIn]);

  const pointColor = useMemo(() => {
    if (isAllIn) return '#B4171E';
    return isActive ? '#005CFF' : '#7777';
  }, [isActive, isAllIn]);

  return (
    <Box position="absolute" bottom={0} left="50%" transform="translateX(-50%)">
      <CurrentHand
        phase={log.phase}
        beforeCards={
          log.content.type === 'draw' && log.player === player.name
            ? log.content.before
            : []
        }
        afterCards={
          log.content.type === 'draw' && log.player === player.name
            ? log.content.after
            : player.round.cards
        }
        mx="auto"
        mb={[1, 1, 1.5, 1.5, 2]}
      />
      <Flex align="center">
        <Box
          position="absolute"
          zIndex={1}
          w={[16, 16, 24, 24, 32]}
          h={[16, 16, 24, 24, 32]}
          p={0.5}
          bgColor="black"
          borderColor={borderColor}
          borderWidth={[2, 2, 3, 3, 4]}
          borderRadius="50%"
          boxShadow={isEmphasize ? '0 0 10px rgba(10, 210, 0, 0.8)' : 'none'}
        >
          <Flex
            align="center"
            justify="center"
            width="full"
            height="full"
            p={[3, 3, 4, 4, 5]}
            borderColor={borderColor}
            borderWidth={[1, 1, 1.5, 1.5, 2]}
            borderRadius="50%"
          >
            <PlayerIcon isActive={isActive} isAllIn={isAllIn} />
          </Flex>
        </Box>
        <Box
          ml={[10, 10, '3.75rem', '3.75rem', 20]}
          pl={[6, 6, 8, 8, 12]}
          pr={[3, 3, 4, 4, 6]}
          py={[1, 1, 1.5, 1.5, 2]}
          bgColor="brand80.500"
          borderColor={borderColor}
          borderWidth={[2, 2, 3, 3, 4]}
          borderTopRightRadius="md"
          borderBottomRightRadius="md"
          boxShadow={isEmphasize ? '0 0 10px rgba(10, 210, 0, 0.8)' : 'none'}
        >
          <Text
            isTruncated
            textStyle={strongS}
            maxW={[32, 32, 48, 48, 64]}
            px={[2, 2, 3, 3, 4]}
            color={borderColor}
            textAlign="center"
          >
            {player?.name}
          </Text>
          <Divider
            my={1}
            w={[32, 32, 48, 48, 64]}
            color={borderColor}
            opacity={1}
          />
          <Flex align="center" justify="center">
            <Text textStyle={strongS} color={pointColor}>
              {player?.point.toLocaleString()}
            </Text>
            <Text textStyle={normalS} color={pointColor}>
              pt
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default LogPlayerInformation;
