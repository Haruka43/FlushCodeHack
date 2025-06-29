import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';

import type { LogPayPointType } from '@/components/molecules/log-pay-point';
import LogPayPoint from '@/components/molecules/log-pay-point';
import theme from '@/styles/theme';

const Component = (props: LogPayPointType) => (
  <ChakraProvider theme={theme}>
    <LogPayPoint {...props} />
  </ChakraProvider>
);

describe('LogPayPoint', () => {
  test('スナップショット', () => {
    const { asFragment } = render(
      <Component fee={200} first={100} second={0} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
