import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';

import type { CurrentHandProps } from '@/components/atoms/current-hand';
import CurrentHand from '@/components/atoms/current-hand';
import theme from '@/styles/theme';

const Component = (props: CurrentHandProps) => (
  <ChakraProvider theme={theme}>
    <CurrentHand {...props} />
  </ChakraProvider>
);

describe('CurrentHand', () => {
  test('スナップショット/交換あり', () => {
    const { asFragment } = render(
      <Component
        phase="draw-1"
        beforeCards={[
          { suit: 'Clubs', number: 5 },
          { suit: 'Clubs', number: 6 },
          { suit: 'Spades', number: 9 },
          { suit: 'Diamonds', number: 9 },
          { suit: 'Spades', number: 1 },
        ]}
        afterCards={[
          { suit: 'Clubs', number: 5 },
          { suit: 'Clubs', number: 6 },
          { suit: 'Diamonds', number: 9 },
          { suit: 'Spades', number: 9 },
          { suit: 'Hearts', number: 9 },
        ]}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/交換なし', () => {
    const { asFragment } = render(
      <Component
        phase="draw-1"
        afterCards={[
          { suit: 'Clubs', number: 5 },
          { suit: 'Clubs', number: 6 },
          { suit: 'Diamonds', number: 9 },
          { suit: 'Spades', number: 9 },
          { suit: 'Hearts', number: 9 },
        ]}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/カード未所持', () => {
    const { asFragment } = render(<Component phase="draw-1" afterCards={[]} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/終了フェーズ', () => {
    const { asFragment } = render(
      <Component
        phase="finished"
        afterCards={[
          { suit: 'Clubs', number: 5 },
          { suit: 'Clubs', number: 6 },
          { suit: 'Diamonds', number: 9 },
          { suit: 'Spades', number: 9 },
          { suit: 'Hearts', number: 9 },
        ]}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('交換を行った時は前後の役が表示される', () => {
    const { getByText } = render(
      <Component
        phase="draw-1"
        beforeCards={[
          { suit: 'Clubs', number: 5 },
          { suit: 'Clubs', number: 6 },
          { suit: 'Spades', number: 9 },
          { suit: 'Diamonds', number: 9 },
          { suit: 'Spades', number: 1 },
        ]}
        afterCards={[
          { suit: 'Clubs', number: 5 },
          { suit: 'Clubs', number: 6 },
          { suit: 'Diamonds', number: 9 },
          { suit: 'Spades', number: 9 },
          { suit: 'Hearts', number: 9 },
        ]}
      />
    );
    expect(getByText('One Pair → Three of a Kind')).toBeInTheDocument();
  });
});
