import { ChakraProvider } from '@chakra-ui/react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { GameStepperProps } from '@/components/molecules/game-stepper';
import GameStepper from '@/components/molecules/game-stepper';
import theme from '@/styles/theme';

const Component = (props: GameStepperProps) => (
  <ChakraProvider theme={theme}>
    <GameStepper {...props} />
  </ChakraProvider>
);

describe('GameStepper', () => {
  test('スナップショット/1ページ目', () => {
    const { asFragment } = render(
      <Component current={1} max={10} onChangeStep={jest.fn()} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/最終ページ', () => {
    const { asFragment } = render(
      <Component current={10} max={10} onChangeStep={jest.fn()} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('Prevボタンをクリックすると1ページ前に戻る', async () => {
    const onChangeStep = jest.fn();
    const { getByRole } = render(
      <Component current={2} max={10} onChangeStep={onChangeStep} />
    );

    await userEvent.click(getByRole('button', { name: 'Prev' }));

    await waitFor(() => {
      expect(onChangeStep).toHaveBeenCalledWith(1);
    });
  });

  test('Nextボタンをクリックすると1ページ次に進む', async () => {
    const onChangeStep = jest.fn();
    const { getByRole } = render(
      <Component current={1} max={10} onChangeStep={onChangeStep} />
    );

    await userEvent.click(getByRole('button', { name: 'Next' }));

    await waitFor(() => {
      expect(onChangeStep).toHaveBeenCalledWith(2);
    });
  });

  test('現在のページに数値を入力すると該当のページに移動する', async () => {
    const onChangeStep = jest.fn();
    const { getByRole } = render(
      <Component current={1} max={10} onChangeStep={onChangeStep} />
    );

    fireEvent.input(getByRole('spinbutton', { name: 'pager' }), {
      target: {
        value: '5',
      },
    });

    await waitFor(() => {
      expect(onChangeStep).toHaveBeenCalledWith(5);
    });
  });

  test('現在のページに文字を入力してもページは移動しない', async () => {
    const onChangeStep = jest.fn();
    const { getByRole } = render(
      <Component current={1} max={10} onChangeStep={onChangeStep} />
    );

    fireEvent.input(getByRole('spinbutton', { name: 'pager' }), {
      target: {
        value: '-',
      },
    });

    await waitFor(() => {
      expect(onChangeStep).not.toHaveBeenCalled();
    });
  });

  test('現在のページに最大ページ以上の値を入力してもページは移動しない', async () => {
    const onChangeStep = jest.fn();
    const { getByRole } = render(
      <Component current={1} max={10} onChangeStep={onChangeStep} />
    );

    fireEvent.input(getByRole('spinbutton', { name: 'pager' }), {
      target: {
        value: '11',
      },
    });

    await waitFor(() => {
      expect(onChangeStep).not.toHaveBeenCalled();
    });
  });
});
