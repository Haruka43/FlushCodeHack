import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import type { ReactNode } from 'react';

import type { ModalContainerProps } from '@/components/molecules/modal-container';
import ModalContainer from '@/components/molecules/modal-container';
import theme from '@/styles/theme';

jest.mock('@chakra-ui/portal', () => ({
  Portal: jest.fn(({ children }: { children: ReactNode }) => children),
}));

const Component = (props: ModalContainerProps) => (
  <ChakraProvider theme={theme}>
    <ModalContainer {...props} />
  </ChakraProvider>
);

describe('ModalContainer', () => {
  test('スナップショット', () => {
    const { asFragment, getByText } = render(
      <Component
        title="モーダル"
        primaryLabel="Submit"
        secondaryLabel="Cancel"
        isOpen={true}
        onClose={jest.fn()}
      >
        モーダルコンテンツ
      </Component>
    );

    expect(getByText('モーダル')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
