import { Flex, Image } from '@chakra-ui/react';

import type { Card } from '@/schema/card';
import { generateCardPath } from '@/utils/style';

export type ExchangeCardSetType = {
  cards: Card[];
  discard: boolean;
};

const ExchangeCardSet = ({ cards, discard }: ExchangeCardSetType) => {
  return (
    <Flex gap={0.5}>
      {cards.map((card) => (
        <Image
          key={`${card.suit}-${card.number}`}
          src={generateCardPath(card)}
          alt="card"
          w={[8, 8, 12, 12, 16]}
          opacity={discard ? 1 : 0.5}
        />
      ))}
    </Flex>
  );
};

export default ExchangeCardSet;
