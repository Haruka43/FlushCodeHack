import { Flex, Text } from '@chakra-ui/react';

import type { ChangeNum, ChangeTimes } from '@/schema/style';

import ChangeBgFirst from './changes/change-bg-1st';
import ChangeBgSecond from './changes/change-bg-2nd';

export type ChangeCardNumProps = {
  num: ChangeNum;
  times: ChangeTimes;
};

const ChangeCardNum = ({ num, times }: ChangeCardNumProps) => (
  <Flex justify="center" align="center" w={6} h={6}>
    {times === 1 && (
      <>
        <ChangeBgFirst />
        <Text position="absolute" textStyle="bold.xs" textAlign="center">
          {num}
        </Text>
      </>
    )}
    {times === 2 && (
      <>
        <ChangeBgSecond />
        <Text position="absolute" textStyle="bold.xs" textAlign="center">
          {num}
        </Text>
      </>
    )}
  </Flex>
);

export default ChangeCardNum;
