import { Box, Flex, Image } from '@chakra-ui/react';

import type { Card, CardSet } from '@/schema/card';
import { generateCardPath } from '@/utils/style';

export type PlayerCardsType = {
  cards: CardSet<Card>;
};

const PlayerCards = ({ cards }: PlayerCardsType) => (
  <Flex
    position="relative"
    minH={['151px', '151px', '227px', '227px', '303px']}
    w={[
      'calc(80px * 5 * 0.715)',
      'calc(80px * 5 * 0.715)',
      'calc(120px * 5 * 0.715)',
      'calc(120px * 5 * 0.715)',
      'calc(160px * 5 * 0.715)',
    ]}
  >
    {cards.map((card, i) => (
      <Box
        key={`${card.suit}-${card.number}`}
        w={['80px', '80px', '120px', '120px', '160px']}
        ml={i > 2 ? '-10%' : 0}
        mr={i < 2 ? '-10%' : 0}
        mt={['11%', '3%', '0px', '3%', '11%'][i]}
        transform={
          [
            'rotate(-30deg)',
            'rotate(-15deg)',
            'rotate(0deg)',
            'rotate(15deg)',
            'rotate(30deg)',
          ][i]
        }
      >
        <Image src={generateCardPath(card)} alt="card" />
      </Box>
    ))}
  </Flex>
);

export default PlayerCards;
