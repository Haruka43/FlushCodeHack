import type { FlexProps } from '@chakra-ui/react';
import { Flex, Text } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';
import { useCallback } from 'react';

import { boldL } from '@/styles';

export interface LogPayPointType extends FlexProps {
  fee: number;
  first: number;
  second: number;
  isActive: boolean;
}

const LogPayPoint = ({
  fee,
  first,
  second,
  isActive,
  ...rest
}: LogPayPointType) => {
  const TextWrapper = useCallback(
    ({ children }: PropsWithChildren) => (
      <Text textStyle={boldL} color={`${isActive ? 'white' : 'brand100.600'}`}>
        {children}
      </Text>
    ),
    [isActive]
  );

  return (
    <Flex align="flex-end" gap={1} {...rest}>
      <Flex direction="column" align="center">
        <Text
          textStyle="normal.sm"
          color={`${isActive ? 'white' : 'brand100.600'}`}
        >
          fee
        </Text>
        <TextWrapper>{fee.toLocaleString()}</TextWrapper>
      </Flex>
      <TextWrapper>+</TextWrapper>
      <Flex direction="column" align="center">
        <Text
          textStyle="normal.sm"
          color={`${isActive ? 'white' : 'brand100.600'}`}
        >
          1st bet
        </Text>
        <TextWrapper>{first.toLocaleString()}</TextWrapper>
      </Flex>
      <TextWrapper>+</TextWrapper>
      <Flex direction="column" align="center">
        <Text
          textStyle="normal.sm"
          color={`${isActive ? 'white' : 'brand100.600'}`}
        >
          2nd bet
        </Text>
        <TextWrapper>{second.toLocaleString()}</TextWrapper>
      </Flex>
      <TextWrapper>=</TextWrapper>
      <Flex direction="column" align="center">
        <Text
          textStyle="normal.sm"
          color={`${isActive ? 'white' : 'brand100.600'}`}
        >
          total
        </Text>
        <TextWrapper>{(fee + first + second).toLocaleString()}</TextWrapper>
      </Flex>
      <TextWrapper>pt</TextWrapper>
    </Flex>
  );
};

export default LogPayPoint;
