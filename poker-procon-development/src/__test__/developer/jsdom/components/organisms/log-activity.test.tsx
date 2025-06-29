import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';

import { testLogBetAddPoint } from '@/__test__/developer/jsdom/data/log-bet-add-point';
import { testLogBetKeepPoint } from '@/__test__/developer/jsdom/data/log-bet-keep-point';
import { testLogDraw } from '@/__test__/developer/jsdom/data/log-draw';
import { testLogDrawNoExchange } from '@/__test__/developer/jsdom/data/log-draw-no-exchange';
import type { LogActivityType } from '@/components/organisms/log-activity';
import LogActivity from '@/components/organisms/log-activity';
import theme from '@/styles/theme';

const Component = (props: LogActivityType) => (
  <ChakraProvider theme={theme}>
    <LogActivity {...props} />
  </ChakraProvider>
);

describe('GameInformation', () => {
  test('スナップショット/bet - 加算あり', () => {
    const { asFragment } = render(<Component log={testLogBetAddPoint} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/bet - 加算なし', () => {
    const { asFragment } = render(<Component log={testLogBetKeepPoint} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/draw - 交換あり', () => {
    const { asFragment } = render(<Component log={testLogDraw} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/draw - 交換なし', () => {
    const { asFragment } = render(<Component log={testLogDrawNoExchange} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
