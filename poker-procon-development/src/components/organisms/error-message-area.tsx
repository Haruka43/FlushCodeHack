import { WarningTwoIcon } from '@chakra-ui/icons';
import { Box, Flex } from '@chakra-ui/react';

import type { CustomeError } from '@/schema/common';

export interface ErrorMessageAreaProps {
  errors: CustomeError[];
}

const ErrorMessageArea = ({ errors }: ErrorMessageAreaProps) => (
  <Box
    p={5}
    bgColor="red.100"
    borderWidth={2}
    borderColor="red.600"
    borderRadius="base"
    color="red.600"
  >
    {errors.map((error) => (
      <Flex key={error.code} align="center" gap={1}>
        <WarningTwoIcon color="red.600" />
        {`${error.message} (${error.code} - ${error.timestamp})`}
      </Flex>
    ))}
  </Box>
);

export default ErrorMessageArea;
