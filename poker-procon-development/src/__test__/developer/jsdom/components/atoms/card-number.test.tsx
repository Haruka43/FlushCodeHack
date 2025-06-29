import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';

import type { CardNumberProps } from '@/components/atoms/card-number';
import CardNumber from '@/components/atoms/card-number';
import theme from '@/styles/theme';

const Component = (props: CardNumberProps) => (
  <ChakraProvider theme={theme}>
    <CardNumber {...props} />
  </ChakraProvider>
);

describe('CardNumber', () => {
  test('スナップショット/sm', () => {
    const { asFragment } = render(<Component number={1} size="sm" index={0} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/md', () => {
    const { asFragment } = render(<Component number={1} size="md" index={0} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/Spades', () => {
    const { asFragment } = render(<Component number={1} size="md" index={0} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/Hearts', () => {
    const { asFragment } = render(<Component number={1} size="md" index={1} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/Diamonds', () => {
    const { asFragment } = render(<Component number={1} size="md" index={2} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/Clubs', () => {
    const { asFragment } = render(<Component number={1} size="md" index={3} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/reverse', () => {
    const { asFragment } = render(
      <Component number={1} size="md" index={0} reverse />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
