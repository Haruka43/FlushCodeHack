import type { BoxProps } from '@chakra-ui/react';
import { Box, Image, Text } from '@chakra-ui/react';
import { useMemo } from 'react';

import { HAND_RANK } from '@/constants/game';
import type { Card, CardSet } from '@/schema/card';
import type { Phase } from '@/schema/game';
import { normalM } from '@/styles';
import { evaluateHand } from '@/utils/hand';

export interface CurrentHandProps extends BoxProps {
  phase: Phase;
  beforeCards?: CardSet<Card>;
  afterCards: CardSet<Card>;
}

const CurrentHand = ({
  phase,
  beforeCards,
  afterCards,
  ...rest
}: CurrentHandProps) => {
  const beforeHand = useMemo(
    () => (beforeCards ? evaluateHand(beforeCards) : ''),
    [beforeCards]
  );

  const afterHand = useMemo(() => evaluateHand(afterCards), [afterCards]);

  if (phase === 'finished' || !afterCards.length) return null;

  return (
    <Box
      minH={['28px', '28px', '36px', '42px', '42px', '42px']}
      w="max-content"
      {...rest}
    >
      <Text
        textStyle={normalM}
        display="block"
        py={0.5}
        px={5}
        bgColor="brand80.500"
        borderRadius="base"
        color="white"
      >
        {beforeHand ? `${HAND_RANK[beforeHand]} → ` : ''}
        {HAND_RANK[afterHand]}
      </Text>
      <Image src="/bubble.svg" alt="bubble" mt={['px', 'px', 0.5, 1]} />
    </Box>
  );
};

export default CurrentHand;
