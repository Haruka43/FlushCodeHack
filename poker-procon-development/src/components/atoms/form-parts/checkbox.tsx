import type { CheckboxProps as ChakraCheckboxProps } from '@chakra-ui/react';
import { Checkbox as ChakraCheckbox } from '@chakra-ui/react';
import { forwardRef } from 'react';

interface CheckboxProps extends ChakraCheckboxProps {
  label: string;
}

const Checkbox = forwardRef<HTMLElement, CheckboxProps>(
  ({ label, ...rest }, ref) => (
    <ChakraCheckbox
      iconColor="brand100.100"
      {...rest}
      _checked={{
        '& .chakra-checkbox__control': {
          background: 'white',
          borderColor: 'inherit',
        },
      }}
      ref={ref}
    >
      {label}
    </ChakraCheckbox>
  )
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
