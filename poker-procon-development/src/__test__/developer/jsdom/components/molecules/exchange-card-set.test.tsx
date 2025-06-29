import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';

import type { ExchangeCardSetType } from '@/components/molecules/exchange-card-set';
import ExchangeCardSet from '@/components/molecules/exchange-card-set';
import theme from '@/styles/theme';

const Component = (props: ExchangeCardSetType) => (
  <ChakraProvider theme={theme}>
    <ExchangeCardSet {...props} />
  </ChakraProvider>
);

describe('ExchangeCardSet', () => {
  test('スナップショット/交換したカード', () => {
    const { asFragment } = render(
      <Component
        cards={[
          { suit: 'Clubs', number: 5 },
          { suit: 'Clubs', number: 6 },
        ]}
        discard
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/新しいカード', () => {
    const { asFragment } = render(
      <Component
        cards={[
          { suit: 'Diamonds', number: 1 },
          { suit: 'Spades', number: 1 },
        ]}
        discard={false}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
