import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';

import { testLogDraw } from '@/__test__/developer/jsdom/data/log-draw';
import type { LogPlayerInformationType } from '@/components/molecules/log-player-information';
import LogPlayerInformation from '@/components/molecules/log-player-information';
import theme from '@/styles/theme';

const Component = (props: LogPlayerInformationType) => (
  <ChakraProvider theme={theme}>
    <LogPlayerInformation {...props} />
  </ChakraProvider>
);

describe('LogPlayerInformation', () => {
  test('スナップショット/active - 強調あり', () => {
    const { asFragment } = render(
      <Component
        player={{
          name: 'Player1',
          status: 'active',
          point: 19358,
          round: {
            betPoint: 442,
            first: 442,
            second: 0,
            cards: [
              { suit: 'Spades', number: 4 },
              { suit: 'Clubs', number: 9 },
              { suit: 'Spades', number: 10 },
              { suit: 'Spades', number: 11 },
              { suit: 'Hearts', number: 12 },
            ],
            action: 'bet',
          },
        }}
        isEmphasize
        log={testLogDraw}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/active - 強調なし', () => {
    const { asFragment } = render(
      <Component
        player={{
          name: 'Player1',
          status: 'active',
          point: 19358,
          round: {
            betPoint: 442,
            first: 442,
            second: 0,
            cards: [
              { suit: 'Spades', number: 4 },
              { suit: 'Clubs', number: 9 },
              { suit: 'Spades', number: 10 },
              { suit: 'Spades', number: 11 },
              { suit: 'Hearts', number: 12 },
            ],
            action: 'bet',
          },
        }}
        isEmphasize={false}
        log={testLogDraw}
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
          point: 0,
          round: {
            betPoint: 442,
            first: 442,
            second: 0,
            cards: [
              { suit: 'Spades', number: 4 },
              { suit: 'Clubs', number: 9 },
              { suit: 'Spades', number: 10 },
              { suit: 'Spades', number: 11 },
              { suit: 'Hearts', number: 12 },
            ],
            action: 'all-in',
          },
        }}
        isEmphasize={false}
        log={testLogDraw}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/自分のターンではない', () => {
    const { asFragment } = render(
      <Component
        player={{
          name: 'Player2',
          status: 'active',
          point: 19358,
          round: {
            betPoint: 442,
            first: 442,
            second: 0,
            cards: [
              { suit: 'Spades', number: 4 },
              { suit: 'Clubs', number: 9 },
              { suit: 'Spades', number: 10 },
              { suit: 'Spades', number: 11 },
              { suit: 'Hearts', number: 12 },
            ],
            action: 'bet',
          },
        }}
        isEmphasize={false}
        log={testLogDraw}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/out', () => {
    const { asFragment } = render(
      <Component
        player={{
          name: 'Player1',
          status: 'out',
          point: 0,
          round: {
            betPoint: 0,
            first: 0,
            second: 0,
            cards: [],
            action: null,
          },
        }}
        isEmphasize={false}
        log={testLogDraw}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/drop', () => {
    const { asFragment } = render(
      <Component
        player={{
          name: 'Player1',
          status: 'active',
          point: 19358,
          round: {
            betPoint: 422,
            first: 422,
            second: 0,
            cards: [],
            action: null,
          },
        }}
        isEmphasize={false}
        log={testLogDraw}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
