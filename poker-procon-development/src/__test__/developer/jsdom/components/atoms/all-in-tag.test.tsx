import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';

import AllInTag from '@/components/atoms/all-in-tag';
import theme from '@/styles/theme';

const Component = () => (
  <ChakraProvider theme={theme}>
    <AllInTag />
  </ChakraProvider>
);

describe('AllInTag', () => {
  test('スナップショット', () => {
    const { asFragment } = render(<Component />);
    expect(asFragment()).toMatchSnapshot();
  });
});
