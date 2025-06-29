import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';

import type { RoundInformationType } from '@/components/organisms/round-information';
import RoundInformation from '@/components/organisms/round-information';
import theme from '@/styles/theme';

const Component = (props: RoundInformationType) => (
  <ChakraProvider theme={theme}>
    <RoundInformation {...props} />
  </ChakraProvider>
);

describe('RoundInformation', () => {
  test('スナップショット', () => {
    const { asFragment } = render(
      <Component
        id="1"
        round={1}
        phase="draw-1"
        pot={10000}
        minBetPoint={2500}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
