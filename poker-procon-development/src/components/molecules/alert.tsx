import type { AlertProps as ChakraAlertProps } from '@chakra-ui/react';
import {
  Alert as ChakraAlert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
} from '@chakra-ui/react';

export interface AlertProps extends ChakraAlertProps {
  title: string;
  description: string;
  onClose: () => void;
}

const Alert = ({
  status,
  title,
  description,
  variant = 'left-accent',
  onClose,
}: AlertProps) => {
  return (
    <ChakraAlert
      status={status}
      variant={variant}
      position="absolute"
      top={20}
      right={10}
      w="max"
    >
      <AlertIcon />
      <Box>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Box>
      <CloseButton onClick={onClose} />
    </ChakraAlert>
  );
};

export default Alert;
