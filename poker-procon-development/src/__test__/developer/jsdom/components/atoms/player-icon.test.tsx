import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';

import type { PlayerIconType } from '@/components/atoms/player-icon';
import PlayerIcon from '@/components/atoms/player-icon';
import theme from '@/styles/theme';

const Component = (props: PlayerIconType) => (
  <ChakraProvider theme={theme}>
    <PlayerIcon {...props} />
  </ChakraProvider>
);

describe('PlayerIcon', () => {
  test('スナップショット/active', () => {
    const { asFragment } = render(<Component isActive isAllIn={false} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/all-in', () => {
    const { asFragment } = render(<Component isActive isAllIn />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/out', () => {
    const { asFragment } = render(
      <Component isActive={false} isAllIn={false} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
