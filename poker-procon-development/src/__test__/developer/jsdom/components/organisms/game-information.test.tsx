import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';

import { testGameInfoData } from '@/__test__/developer/jsdom/data/game';
import { testLogList } from '@/__test__/developer/jsdom/data/log-list';
import type { GameInformationProps } from '@/components/organisms/game-information';
import GameInformation from '@/components/organisms/game-information';
import theme from '@/styles/theme';

const Component = (props: GameInformationProps) => (
  <ChakraProvider theme={theme}>
    <GameInformation {...props} />
  </ChakraProvider>
);

describe('GameInformation', () => {
  test('スナップショット', () => {
    const { asFragment } = render(
      <Component
        id="1"
        game={testGameInfoData}
        list={[
          { round: 1, logs: testLogList },
          { round: 2, logs: testLogList },
          { round: 3, logs: testLogList },
          { round: 4, logs: testLogList },
          { round: 4, logs: testLogList },
          { round: 5, logs: testLogList },
          { round: 6, logs: testLogList },
          { round: 7, logs: testLogList },
          { round: 8, logs: testLogList },
          { round: 9, logs: testLogList },
          { round: 10, logs: testLogList },
        ]}
        winRound={{
          Player1: 10,
          Player2: 0,
          Player3: 0,
          Player4: 0,
        }}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
