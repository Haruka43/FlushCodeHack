import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';

import type { HandLabelProps } from '@/components/atoms/hand-label';
import HandLabel from '@/components/atoms/hand-label';
import theme from '@/styles/theme';

const Component = (props: HandLabelProps) => (
  <ChakraProvider theme={theme}>
    <HandLabel {...props} />
  </ChakraProvider>
);

describe('HandLabel', () => {
  test('スナップショット/強調あり', () => {
    const { asFragment } = render(<Component hand={10} isEmphasize />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/強調なし', () => {
    const { asFragment } = render(<Component hand={10} isEmphasize={false} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/非活性', () => {
    const { asFragment } = render(<Component hand={0} isEmphasize={false} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
