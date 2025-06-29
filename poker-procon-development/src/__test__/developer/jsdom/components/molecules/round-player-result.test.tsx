import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';

import type { RoundePlayerResultProps } from '@/components/molecules/round-player-result';
import RoundePlayerResult from '@/components/molecules/round-player-result';
import theme from '@/styles/theme';

const Component = (props: RoundePlayerResultProps) => (
  <ChakraProvider theme={theme}>
    <RoundePlayerResult {...props} />
  </ChakraProvider>
);

describe('RoundPlayerResult', () => {
  test('スナップショット/winner', () => {
    const { asFragment } = render(
      <Component
        player={{
          name: 'Player1',
          status: 'active',
          point: 12000,
          round: {
            betPoint: 2000,
            cards: [],
            action: 'raise',
            hand: 2,
          },
        }}
        change={{ first: 1, second: 2 }}
        point={{ before: 10000, after: 12000 }}
        winner={true}
        isPlay={true}
        out={false}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/loser', () => {
    const { asFragment } = render(
      <Component
        player={{
          name: 'Player1',
          status: 'active',
          point: 8000,
          round: {
            betPoint: 2000,
            cards: [],
            action: 'raise',
            hand: 1,
          },
        }}
        change={{ first: 2, second: 3 }}
        point={{ before: 10000, after: 8000 }}
        winner={false}
        isPlay={true}
        out={false}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/out - outになったラウンド', () => {
    const { asFragment } = render(
      <Component
        player={{
          name: 'Player1',
          status: 'out',
          point: 0,
          round: {
            betPoint: 0,
            cards: [],
            action: null,
          },
        }}
        point={{ before: 10000, after: 0 }}
        winner={false}
        isPlay={true}
        out={true}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/out - outになったラウンド以外', () => {
    const { asFragment } = render(
      <Component
        player={{
          name: 'Player1',
          status: 'out',
          point: 0,
          round: {
            betPoint: 0,
            cards: [],
            action: null,
          },
        }}
        winner={false}
        isPlay={false}
        out={true}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/all-in', () => {
    const { asFragment } = render(
      <Component
        player={{
          name: 'Player1',
          status: 'active',
          point: 8000,
          round: {
            betPoint: 2000,
            cards: [],
            action: 'all-in',
            hand: 1,
          },
        }}
        change={{ first: 2, second: 1 }}
        point={{ before: 10000, after: 8000 }}
        winner={false}
        isPlay={true}
        out={false}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/交換0', () => {
    const { asFragment } = render(
      <Component
        player={{
          name: 'Player1',
          status: 'active',
          point: 8000,
          round: {
            betPoint: 2000,
            cards: [],
            action: 'all-in',
            hand: 1,
          },
        }}
        change={{ first: 0, second: 0 }}
        point={{ before: 10000, after: 8000 }}
        winner={false}
        isPlay={true}
        out={false}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
