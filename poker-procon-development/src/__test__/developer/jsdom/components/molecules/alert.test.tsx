import { ChakraProvider } from '@chakra-ui/react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { AlertProps } from '@/components/molecules/alert';
import Alert from '@/components/molecules/alert';
import theme from '@/styles/theme';

const Component = (props: AlertProps) => (
  <ChakraProvider theme={theme}>
    <Alert {...props} />
  </ChakraProvider>
);

describe('Alert', () => {
  test('スナップショット', () => {
    const { asFragment } = render(
      <Component
        title="ゲームを作成しました。"
        description="ID: 1"
        onClose={jest.fn()}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('アラートを閉じる', async () => {
    const onClose = jest.fn();
    const { getByRole } = render(
      <Component
        title="ゲームを作成しました。"
        description="ID: 1"
        onClose={onClose}
      />
    );

    await userEvent.click(getByRole('button', { name: 'Close' }));

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });
});
