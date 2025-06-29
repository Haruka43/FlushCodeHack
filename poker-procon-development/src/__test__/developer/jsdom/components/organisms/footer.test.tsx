import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';

import Footer from '@/components/organisms/footer';
import theme from '@/styles/theme';

const Component = () => (
  <ChakraProvider theme={theme}>
    <Footer />
  </ChakraProvider>
);

describe('Footer', () => {
  test('スナップショット', () => {
    const { asFragment } = render(<Component />);
    expect(asFragment()).toMatchSnapshot();
  });
});
