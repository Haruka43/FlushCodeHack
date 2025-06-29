import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';

import type { CheckboxProps } from '@/components/atoms/form-parts';
import { Checkbox } from '@/components/atoms/form-parts';
import theme from '@/styles/theme';

const Component = (props: CheckboxProps) => (
  <ChakraProvider theme={theme}>
    <Checkbox {...props} />
  </ChakraProvider>
);

describe('CheckBox', () => {
  test('スナップショット/default', () => {
    const { asFragment } = render(<Component label="Player1" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
