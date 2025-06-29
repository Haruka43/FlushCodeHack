import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';

import type { GameStatusTagProps } from '@/components/atoms/game-status-tag';
import GameStatusTag from '@/components/atoms/game-status-tag';
import theme from '@/styles/theme';

const Component = (props: GameStatusTagProps) => (
  <ChakraProvider theme={theme}>
    <GameStatusTag {...props} />
  </ChakraProvider>
);

describe('GameStatusTag', () => {
  test('スナップショット/new', () => {
    const { asFragment } = render(<Component status="new" />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/new', () => {
    const { asFragment } = render(<Component status="progress" />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/new', () => {
    const { asFragment } = render(<Component status="finished" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
