import type { ModalProps } from '@chakra-ui/react';
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

export interface ModalContainerProps extends ModalProps {
  title: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimaryAction?: (data: any) => void;
  onSecondaryAction?: (data: any) => void;
}

const ModalContainer = ({
  title,
  primaryLabel,
  secondaryLabel,
  onPrimaryAction,
  onSecondaryAction,
  children,
  ...rest
}: ModalContainerProps) => {
  return (
    <Modal {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Flex gap={2}>
            {secondaryLabel && (
              <Button
                variant="outline"
                colorScheme="gray"
                onClick={onSecondaryAction}
              >
                {secondaryLabel}
              </Button>
            )}
            {primaryLabel && (
              <Button colorScheme="red" onClick={onPrimaryAction}>
                {primaryLabel}
              </Button>
            )}
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalContainer;
