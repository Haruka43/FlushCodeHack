import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';

import Header from '@/components/organisms/header';
import theme from '@/styles/theme';

const Component = () => (
  <ChakraProvider theme={theme}>
    <Header />
  </ChakraProvider>
);

describe('Header', () => {
  test('スナップショット', () => {
    const { asFragment } = render(<Component />);
    expect(asFragment()).toMatchSnapshot();
  });
});
