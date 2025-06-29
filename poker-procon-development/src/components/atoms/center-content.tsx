import type { FlexProps } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

const CenterContent = ({ children }: FlexProps) => (
  <Box
    position="absolute"
    top="50%"
    left="50%"
    transform="translate(-50%, -50%)"
    maxW="5xl"
    width="full"
  >
    {children}
  </Box>
);

export default CenterContent;
