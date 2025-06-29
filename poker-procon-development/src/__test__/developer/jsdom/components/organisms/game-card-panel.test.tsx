import { ChakraProvider } from '@chakra-ui/react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';

import { testGameInfoData } from '@/__test__/developer/jsdom/data/game';
import type { GameCardPanelProps } from '@/components/organisms/game-card-panel';
import GameCardPanel from '@/components/organisms/game-card-panel';
import { SUCCESS_MESSAGES } from '@/constants/message';
import theme from '@/styles/theme';

jest.mock('@/clients/game', () => ({
  async startGame() {
    return {
      id: '1',
      message: SUCCESS_MESSAGES.startGame,
    };
  },
}));

const Component = (props: GameCardPanelProps) => (
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={new QueryClient()}>
      <GameCardPanel {...props} />
    </QueryClientProvider>
  </ChakraProvider>
);

describe('GameCardPanel', () => {
  test('スナップショット/新規', () => {
    const { asFragment } = render(
      <Component
        game={{ ...testGameInfoData, status: 'new', startedAt: undefined }}
        index={1}
        postStartGame={jest.fn()}
        setIsLoading={jest.fn()}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/進行中', () => {
    const { asFragment } = render(
      <Component
        game={{ ...testGameInfoData, status: 'progress' }}
        index={1}
        postStartGame={jest.fn()}
        setIsLoading={jest.fn()}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/終了', () => {
    const { asFragment } = render(
      <Component
        game={{ ...testGameInfoData, status: 'finished' }}
        index={1}
        postStartGame={jest.fn()}
        setIsLoading={jest.fn()}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('ゲーム開始', async () => {
    const setIsLoading = jest.fn();
    const postStartGame = jest.fn();

    const { getByRole } = render(
      <Component
        game={{ ...testGameInfoData, status: 'new', startedAt: undefined }}
        index={1}
        setIsLoading={setIsLoading}
        postStartGame={postStartGame}
      />
    );

    const button = getByRole('button', { name: '開始' });
    await userEvent.click(button);

    await waitFor(() => {
      expect(setIsLoading).toHaveBeenCalledWith(true);
      expect(postStartGame).toHaveBeenCalled();
    });
  });
});
