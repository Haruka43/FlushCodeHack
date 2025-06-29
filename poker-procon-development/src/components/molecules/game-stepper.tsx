import { ChevronLeft, ChevronRight } from '@chakra-icons/bootstrap';
import type { FlexProps } from '@chakra-ui/react';
import {
  Button,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react';

import { buttonDisabled, buttonHover } from '@/styles';

export interface GameStepperProps extends FlexProps {
  current: number;
  max: number;
  onChangeStep: (number: number) => void;
}

const GameStepper = ({
  current,
  max,
  onChangeStep,
  ...rest
}: GameStepperProps) => {
  return (
    <Flex align="center" gap={2.5} {...rest}>
      <Button
        colorScheme="green"
        leftIcon={<ChevronLeft />}
        onClick={() => onChangeStep(current - 1)}
        isDisabled={current === 1}
        bgColor="brand100.100"
        aria-label="Prev"
        _hover={buttonHover}
        _disabled={{
          ...buttonDisabled,
          bgColor: 'brand100.600',
        }}
      >
        Prev
      </Button>
      <NumberInput
        value={current}
        onChange={(pageStr) => {
          const page = Number(pageStr);
          if (Number.isNaN(page) || page > max) return;
          onChangeStep(page);
        }}
        min={1}
        max={max}
        size="md"
        variant="outline"
        aria-label="pager"
        w={24}
      >
        <NumberInputField bgColor="white" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Text textStyle="bold.md" color="white">
        /
      </Text>
      <Text textStyle="bold.md" color="white">
        {max}
      </Text>
      <Button
        colorScheme="green"
        rightIcon={<ChevronRight />}
        onClick={() => onChangeStep(current + 1)}
        isDisabled={current >= max}
        bgColor="brand100.100"
        aria-label="Next"
        _hover={buttonHover}
        _disabled={{
          ...buttonDisabled,
          bgColor: 'brand100.600',
        }}
      >
        Next
      </Button>
    </Flex>
  );
};

export default GameStepper;
