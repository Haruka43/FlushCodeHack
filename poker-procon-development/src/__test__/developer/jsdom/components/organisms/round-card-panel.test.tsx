import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';

import { testLogList } from '@/__test__/developer/jsdom/data/log-list';
import type { RoundCardPanelProps } from '@/components/organisms/round-card-panel';
import RoundCardPanel from '@/components/organisms/round-card-panel';
import theme from '@/styles/theme';

const Component = (props: RoundCardPanelProps) => (
  <ChakraProvider theme={theme}>
    <RoundCardPanel {...props} />
  </ChakraProvider>
);

describe('RoundCardPanel', () => {
  test('スナップショット', () => {
    const { asFragment } = render(
      <Component id="1" round={1} logs={testLogList} index={0} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
