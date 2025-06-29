import type { TextProps } from '@chakra-ui/react';
import { Flex, Text } from '@chakra-ui/react';

import type { Size } from '@/schema/style';

import { SUITS } from '../../constants/index';
import { ClubIcon, DiamondIcon, HeartIcon, SpadeIcon } from './icon';

export interface CardNumberProps extends TextProps {
  number: number | null;
  size: Size;
  reverse?: boolean;
  index: number;
}

const CardNumber = ({
  number,
  size,
  reverse,
  index,
  ...rest
}: CardNumberProps) => {
  const suit = SUITS[index % 4];

  return (
    <Flex
      position="absolute"
      transform={reverse ? 'scale(-1, -1)' : 'scale(1, 1)'}
      justify="center"
      align="center"
      w={size === 'sm' ? 6 : 10}
      h={size === 'sm' ? 6 : 10}
      {...rest}
    >
      <Text
        zIndex="docked"
        color="white"
        mb={0.5}
        textStyle={size === 'sm' ? 'bold.xs' : 'bold.md'}
        textShadow={`0 1px ${
          suit === 'Spades' || suit === 'Clubs'
            ? 'black'
            : 'var(--chakra-colors-brand100-300)'
        }`}
      >
        {number}
      </Text>
      {suit === 'Clubs' && <ClubIcon size={size} />}
      {suit === 'Diamonds' && <DiamondIcon size={size} />}
      {suit === 'Hearts' && <HeartIcon size={size} />}
      {suit === 'Spades' && <SpadeIcon size={size} />}
    </Flex>
  );
};

export default CardNumber;
