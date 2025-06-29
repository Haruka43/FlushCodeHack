import { ChakraProvider } from '@chakra-ui/react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import type { CreateGameModalProps } from '@/components/organisms/create-game-modal';
import CreateGameModal from '@/components/organisms/create-game-modal';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants/message';
import theme from '@/styles/theme';

jest.mock('@chakra-ui/portal', () => ({
  Portal: jest.fn(({ children }: { children: ReactNode }) => children),
}));

jest.mock('@/clients/game', () => ({
  async createGame() {
    return {
      id: '1',
      message: SUCCESS_MESSAGES.createGame,
    };
  },
}));

const Component = (props: CreateGameModalProps) => (
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={new QueryClient()}>
      <CreateGameModal {...props} />
    </QueryClientProvider>
  </ChakraProvider>
);

describe('CreateGameModal', () => {
  test('スナップショット', () => {
    const { asFragment } = render(
      <Component
        players={['Player1', 'Player2', 'Player3', 'Player4']}
        isOpen={true}
        onClose={jest.fn()}
        postCreateGame={jest.fn()}
        setIsLoading={jest.fn()}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('バリデーション/integer', async () => {
    const postCreateGame = jest.fn();
    const setIsLoading = jest.fn();

    const { getAllByText, getByRole } = render(
      <Component
        players={['Player1', 'Player2', 'Player3', 'Player4']}
        isOpen={true}
        onClose={jest.fn()}
        postCreateGame={postCreateGame}
        setIsLoading={setIsLoading}
      />
    );

    fireEvent.input(getByRole('spinbutton', { name: 'round' }), {
      target: {
        value: '0.1',
      },
    });
    await userEvent.click(getByRole('button', { name: '作成' }));

    await waitFor(() => {
      expect(getAllByText(ERROR_MESSAGES.BB003)).toHaveLength(1);
    });
  });

  test('バリデーション/最小値', async () => {
    const postCreateGame = jest.fn();
    const setIsLoading = jest.fn();

    const { getByRole, getAllByText } = render(
      <Component
        players={['Player1', 'Player2', 'Player3', 'Player4']}
        isOpen={true}
        onClose={jest.fn()}
        postCreateGame={postCreateGame}
        setIsLoading={setIsLoading}
      />
    );

    fireEvent.input(getByRole('spinbutton', { name: 'round' }), {
      target: {
        value: '0',
      },
    });
    await userEvent.click(getByRole('button', { name: '作成' }));

    await waitFor(() => {
      expect(getAllByText(ERROR_MESSAGES.BB005)).toHaveLength(1);
    });
  });

  test('バリデーション/最大値', async () => {
    const postCreateGame = jest.fn();
    const setIsLoading = jest.fn();

    const { getByRole, getAllByText } = render(
      <Component
        players={['Player1', 'Player2', 'Player3', 'Player4']}
        isOpen={true}
        onClose={jest.fn()}
        postCreateGame={postCreateGame}
        setIsLoading={setIsLoading}
      />
    );

    fireEvent.input(getByRole('spinbutton', { name: 'round' }), {
      target: {
        value: '10001',
      },
    });
    await userEvent.click(getByRole('button', { name: '作成' }));

    await waitFor(() => {
      expect(getAllByText(ERROR_MESSAGES.BB008)).toHaveLength(1);
    });
  });

  test('バリデーション/必須項目', async () => {
    const postCreateGame = jest.fn();
    const setIsLoading = jest.fn();

    const { getByRole, getByText } = render(
      <Component
        players={['Player1', 'Player2', 'Player3', 'Player4']}
        isOpen={true}
        onClose={jest.fn()}
        postCreateGame={postCreateGame}
        setIsLoading={setIsLoading}
      />
    );

    await userEvent.click(getByRole('button', { name: '作成' }));

    await waitFor(() => {
      expect(getByText(ERROR_MESSAGES.BB004)).toBeInTheDocument();
    });
  });

  test('ゲーム作成', async () => {
    const postCreateGame = jest.fn();
    const setIsLoading = jest.fn();

    const { getByRole } = render(
      <Component
        players={['Player1', 'Player2', 'Player3', 'Player4']}
        isOpen={true}
        onClose={jest.fn()}
        postCreateGame={postCreateGame}
        setIsLoading={setIsLoading}
      />
    );

    await userEvent.click(getByRole('checkbox', { name: 'player-0' }));
    await userEvent.click(getByRole('checkbox', { name: 'player-1' }));
    await userEvent.click(getByRole('checkbox', { name: 'player-2' }));
    await userEvent.click(getByRole('checkbox', { name: 'player-3' }));
    await userEvent.click(getByRole('button', { name: '作成' }));

    await waitFor(() => {
      expect(setIsLoading).toHaveBeenCalledWith(true);
      expect(postCreateGame).toHaveBeenCalled();
    });
  });

  test('モダールを閉じる', async () => {
    const onClose = jest.fn();

    const { getByRole } = render(
      <Component
        players={['Player1', 'Player2', 'Player3', 'Player4']}
        isOpen={true}
        onClose={onClose}
        postCreateGame={jest.fn()}
        setIsLoading={jest.fn()}
      />
    );

    await userEvent.click(getByRole('button', { name: 'Close' }));

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledWith();
    });
  });
});
