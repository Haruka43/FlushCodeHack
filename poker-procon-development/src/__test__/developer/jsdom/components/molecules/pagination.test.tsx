import { ChakraProvider } from '@chakra-ui/react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { PaginationProps } from '@/components/molecules/pagination';
import Pagination from '@/components/molecules/pagination';
import theme from '@/styles/theme';

const Component = (props: PaginationProps) => (
  <ChakraProvider theme={theme}>
    <Pagination {...props} />
  </ChakraProvider>
);

describe('Pagination', () => {
  test('スナップショット', () => {
    const { asFragment, getByText } = render(
      <Component page={1} max={1000} onClick={jest.fn()} />
    );

    expect(getByText('1,000件中 1 - 100件目を表示中')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/5ページ以下', () => {
    const { asFragment, getByText } = render(
      <Component page={1} max={300} onClick={jest.fn()} />
    );

    expect(getByText('300件中 1 - 100件目を表示中')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/最終3ページ以内', () => {
    const { asFragment, getByText } = render(
      <Component page={9} max={1000} onClick={jest.fn()} />
    );

    expect(getByText('1,000件中 801 - 900件目を表示中')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/最終ページが100件以下', () => {
    const { asFragment, getByText } = render(
      <Component page={10} max={999} onClick={jest.fn()} />
    );

    expect(getByText('999件中 901 - 999件目を表示中')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test('ページ変更 - to first', async () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Component page={5} max={1000} onClick={onClick} />
    );

    const next = getByRole('button', { name: 'first' });
    await userEvent.click(next);

    await waitFor(() => {
      expect(onClick).toHaveBeenCalledWith(1);
    });
  });

  test('ページ変更 - to prev', async () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Component page={5} max={1000} onClick={onClick} />
    );

    const next = getByRole('button', { name: 'prev' });
    await userEvent.click(next);

    await waitFor(() => {
      expect(onClick).toHaveBeenCalledWith(4);
    });
  });

  test('ページ変更 - to number', async () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Component page={5} max={1000} onClick={onClick} />
    );

    const next = getByRole('button', { name: 'number-6' });
    await userEvent.click(next);

    await waitFor(() => {
      expect(onClick).toHaveBeenCalledWith(6);
    });
  });

  test('ページ変更 - to next', async () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Component page={5} max={1000} onClick={onClick} />
    );

    const next = getByRole('button', { name: 'next' });
    await userEvent.click(next);

    await waitFor(() => {
      expect(onClick).toHaveBeenCalledWith(6);
    });
  });

  test('ページ変更 - to last', async () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Component page={5} max={1000} onClick={onClick} />
    );

    const next = getByRole('button', { name: 'last' });
    await userEvent.click(next);

    await waitFor(() => {
      expect(onClick).toHaveBeenCalledWith(10);
    });
  });
});
