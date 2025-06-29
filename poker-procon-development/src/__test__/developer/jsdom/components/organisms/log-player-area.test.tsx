import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';

import { testLogBetAddPoint } from '@/__test__/developer/jsdom/data/log-bet-add-point';
import { testLogDraw } from '@/__test__/developer/jsdom/data/log-draw';
import { testLogFinished } from '@/__test__/developer/jsdom/data/log-finished';
import type { LogPlayerAreaProps } from '@/components/organisms/log-player-area';
import LogPlayerArea from '@/components/organisms/log-player-area';
import theme from '@/styles/theme';

const Component = (props: LogPlayerAreaProps) => (
  <ChakraProvider theme={theme}>
    <LogPlayerArea {...props} />
  </ChakraProvider>
);

describe('LogPlayerArea', () => {
  test('スナップショット/bet phase', () => {
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
        log={testLogBetAddPoint}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/draw phase', () => {
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
        log={testLogDraw}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/自分のターンではない場合', () => {
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
        log={testLogDraw}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/out', () => {
    const { asFragment } = render(
      <Component
        player={{
          name: 'Player3',
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
        log={testLogDraw}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/finished phase - active', () => {
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
            action: 'call',
            hand: 1,
          },
        }}
        log={testLogFinished}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/finished phase - out', () => {
    const { asFragment } = render(
      <Component
        player={{
          name: 'Player2',
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
        log={testLogFinished}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
