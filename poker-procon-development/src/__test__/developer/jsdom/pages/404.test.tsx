import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';

import Custom400 from '@/pages/404';
import theme from '@/styles/theme';

const Component = () => (
  <ChakraProvider theme={theme}>
    <Custom400 />
  </ChakraProvider>
);

describe('Custom400 page', () => {
  test('画面要素', () => {
    const { getByText } = render(<Component />);
    expect(getByText('404 Not Found...')).toBeInTheDocument();
    expect(
      getByText(
        'お探しのページはアクセスできない状況にあるか、移動または削除された可能性があり、見つけられませんでした。'
      )
    ).toBeInTheDocument();
    expect(
      getByText('URL、ファイル名にタイプミスがないかご確認ください。')
    ).toBeInTheDocument();
  });
});
