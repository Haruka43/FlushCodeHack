import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';

import type { CardPanelProps } from '@/components/molecules/card-panel';
import CardPanel from '@/components/molecules/card-panel';
import ROUTE from '@/constants/route';
import theme from '@/styles/theme';

const Component = (props: CardPanelProps) => (
  <ChakraProvider theme={theme}>
    <CardPanel {...props} />
  </ChakraProvider>
);

describe('CardPanel', () => {
  test('スナップショット/default', () => {
    const { asFragment } = render(<Component number={1} index={1} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/md', () => {
    const { asFragment } = render(<Component number={1} index={1} size="sm" />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/md', () => {
    const { asFragment } = render(<Component number={1} index={1} size="md" />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/link', () => {
    const { asFragment } = render(
      <Component number={1} index={1} href={ROUTE.S_A01_001} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
