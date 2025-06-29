import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';

import type { PlayerCardsType } from '@/components/molecules/player-cards';
import PlayerCards from '@/components/molecules/player-cards';
import theme from '@/styles/theme';

const Component = (props: PlayerCardsType) => (
  <ChakraProvider theme={theme}>
    <PlayerCards {...props} />
  </ChakraProvider>
);

describe('PlayerCards', () => {
  test('スナップショット', () => {
    const { asFragment } = render(
      <Component
        cards={[
          { suit: 'Spades', number: 4 },
          { suit: 'Clubs', number: 9 },
          { suit: 'Spades', number: 10 },
          { suit: 'Spades', number: 11 },
          { suit: 'Hearts', number: 12 },
        ]}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
