import type { BoxProps } from '@chakra-ui/react';
import { Box, Text } from '@chakra-ui/react';

import type { Hand } from '@/schema/game';
import { strongM } from '@/styles';

import { HAND_RANK } from '../../constants/game';

export interface HandLabelProps extends BoxProps {
  hand?: Hand;
  isEmphasize: boolean;
}
const HandLabel = ({ hand, isEmphasize, ...rest }: HandLabelProps) => (
  <Box minH={['28px', '28px', '36px', '42px', '42px', '42px']} {...rest}>
    {hand !== undefined && (
      <Text
        textStyle={strongM}
        display="block"
        px={5}
        bgColor="brand80.500"
        borderColor={`${hand === 0 ? 'brand80.600' : 'brand80.400'}`}
        borderWidth={2}
        borderRadius="base"
        boxShadow={isEmphasize ? '0 0 10px rgba(255, 255, 255, 0.8)' : 'none'}
        color={`${hand === 0 ? 'brand80.600' : 'brand80.400'}`}
        fontWeight="bold"
      >
        {HAND_RANK[hand]}
      </Text>
    )}
  </Box>
);

export default HandLabel;
