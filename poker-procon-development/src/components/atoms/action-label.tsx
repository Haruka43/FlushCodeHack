import type { BoxProps } from '@chakra-ui/react';
import { Box, Text } from '@chakra-ui/react';
import { useMemo } from 'react';

import type { Action } from '@/schema/game';
import type { PlayerStatus } from '@/schema/player';
import { strongM } from '@/styles';
import { capitalize } from '@/utils/style';

export interface ActionLabelProps extends BoxProps {
  label: Action | PlayerStatus | string;
  add: number;
}
const ActionLabel = ({ label, add, ...rest }: ActionLabelProps) => {
  const color = useMemo(() => {
    switch (label) {
      case 'bet':
      case 'raise':
        return 'brand80.100';
      case 'check':
      case 'call':
        return 'brand80.200';
      case 'all-in':
        return 'brand80.300';
      case 'drop':
      case 'out':
        return 'brand80.600';
      default:
        return 'brand80.400';
    }
  }, [label]);

  const shadowColor = useMemo(() => {
    switch (label) {
      case 'bet':
      case 'raise':
        return '0 0 10px rgba(10, 210, 0, 0.8)';
      case 'check':
      case 'call':
        return '0 0 10px rgba(0, 92, 255, 0.8)';
      case 'all-in':
        return '0 0 10px rgba(180, 23, 30, 0.8)';
      case 'drop':
      case 'out':
        return 'none';
      default:
        return '0 0 10px rgba(255, 255, 255, 0.8)';
    }
  }, [label]);

  const viewLabel = useMemo(() => {
    if (!label) return '';
    if (label === 'bet' || label === 'raise')
      return `${capitalize(label)} +${add.toLocaleString()}pt`;

    return capitalize(label);
  }, [label]);

  return (
    <Box minH={['28px', '28px', '36px', '42px', '42px', '42px']} {...rest}>
      {label && (
        <Text
          textStyle={strongM}
          display="block"
          px={5}
          bgColor="brand80.500"
          borderColor={color}
          borderWidth={2}
          borderRadius="base"
          boxShadow={shadowColor}
          color={color}
          fontWeight="bold"
        >
          {viewLabel}
        </Text>
      )}
    </Box>
  );
};

export default ActionLabel;
