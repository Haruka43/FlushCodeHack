import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';

import type { ActionLabelProps } from '@/components/atoms/action-label';
import ActionLabel from '@/components/atoms/action-label';
import theme from '@/styles/theme';

const Component = (props: ActionLabelProps) => (
  <ChakraProvider theme={theme}>
    <ActionLabel {...props} />
  </ChakraProvider>
);

describe('ActionLabel', () => {
  test('スナップショット/check', () => {
    const { asFragment } = render(<Component label="check" add={0} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/bet', () => {
    const { asFragment } = render(<Component label="bet" add={100} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/raise', () => {
    const { asFragment } = render(<Component label="raise" add={100} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/call', () => {
    const { asFragment } = render(<Component label="call" add={0} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/all-in', () => {
    const { asFragment } = render(<Component label="all-in" add={0} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/drop', () => {
    const { asFragment } = render(<Component label="drop" add={0} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/out', () => {
    const { asFragment } = render(<Component label="out" add={0} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/exchange', () => {
    const { asFragment } = render(
      <Component label="exhcange 2 cards" add={0} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
