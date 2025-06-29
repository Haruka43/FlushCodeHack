import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';

import type { ErrorMessageAreaProps } from '@/components/organisms/error-message-area';
import ErrorMessageArea from '@/components/organisms/error-message-area';
import theme from '@/styles/theme';

const Component = (props: ErrorMessageAreaProps) => (
  <ChakraProvider theme={theme}>
    <ErrorMessageArea {...props} />
  </ChakraProvider>
);

describe('ErrorMessageArea', () => {
  test('スナップショット', () => {
    const { asFragment } = render(
      <Component
        errors={[
          {
            code: 'BA001',
            message: '存在しないAPIです。',
            timestamp: '2024-04-15 00:00:00.000',
          },
          {
            code: 'BD001',
            message: 'ゲームが見つかりませんでした。',
            timestamp: '2024-04-15 00:00:00.000',
          },
          {
            code: 'BZ001',
            message: '予期しないエラーが発生しました。',
            timestamp: '2024-04-15 00:00:00.000',
          },
        ]}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
