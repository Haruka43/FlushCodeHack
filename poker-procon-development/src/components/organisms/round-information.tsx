import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/react';

import type { Phase } from '@/schema/game';
import { boldL, headingM, margin8, margin16 } from '@/styles';
import { capitalize } from '@/utils/style';

export type RoundInformationType = {
  id: string;
  round: number;
  phase: Phase;
  pot: number;
  minBetPoint: number;
};

const RoundInformation = ({
  id,
  round,
  phase,
  pot,
  minBetPoint,
}: RoundInformationType) => (
  <Box
    width="max"
    p={margin16}
    bgColor="brand80.500"
    borderColor="brand100.100"
    borderWidth={[2, 2, 3, 3, 4]}
    borderRadius="base"
  >
    <Heading
      as="h2"
      color="white"
      fontSize={['1rem', '1.25rem', '1.75rem', '1.75rem', '2.25rem']}
      fontWeight="black"
      lineHeight={['1.25rem', '1.5rem', '2.215rem', '2.125rem', '2.75rem']}
      textAlign="center"
    >
      ゲーム: {id} - ROUND: {round}
    </Heading>
    <Divider my={margin8} w="full" color="brand80.100" opacity={1} />
    <Text textStyle={headingM} color="white" textAlign="center">
      Phase: {capitalize(phase.replaceAll('-', ''))}
    </Text>
    <Divider my={margin8} w="full" color="brand80.100" opacity={1} />
    <Flex gap={margin16} justify="center">
      <Text textStyle={boldL} color="white">
        Pot: {pot.toLocaleString()}pt
      </Text>
      <Text textStyle={boldL} color="white">
        (Min bet: {minBetPoint.toLocaleString()}pt)
      </Text>
    </Flex>
  </Box>
);

export default RoundInformation;
