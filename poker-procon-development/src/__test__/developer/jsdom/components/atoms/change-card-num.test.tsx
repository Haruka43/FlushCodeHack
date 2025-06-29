import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';

import type { ChangeCardNumProps } from '@/components/atoms/change-card-num';
import ChangeCardNum from '@/components/atoms/change-card-num';
import theme from '@/styles/theme';

const Component = (props: ChangeCardNumProps) => (
  <ChakraProvider theme={theme}>
    <ChangeCardNum {...props} />
  </ChakraProvider>
);

describe('ChangeCardNum', () => {
  test('スナップショット/1st', () => {
    const { asFragment } = render(<Component num={1} times={1} />);
    expect(asFragment()).toMatchSnapshot();
  });
  test('スナップショット/2nd', () => {
    const { asFragment } = render(<Component num={1} times={2} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
