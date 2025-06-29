import {
  ChevronDoubleLeft,
  ChevronDoubleRight,
  ChevronLeft,
  ChevronRight,
} from '@chakra-icons/bootstrap';
import type { ButtonProps } from '@chakra-ui/react';
import { Button, IconButton } from '@chakra-ui/react';
import { useMemo } from 'react';

import { buttonDisabled, buttonHover } from '@/styles';

export interface PaginationItemProps extends ButtonProps {
  variant: 'first' | 'prev' | 'number' | 'next' | 'last';
  number: number;
  isActive: boolean;
  isCurrent: boolean;
}

const PaginationItem = ({
  variant,
  number,
  isActive,
  isCurrent,
  onClick,
}: PaginationItemProps) => {
  const Icon = useMemo(() => {
    if (variant === 'first')
      return (
        <ChevronDoubleLeft color={isActive ? 'brand100.100' : 'brand100.600'} />
      );
    if (variant === 'prev') return <ChevronLeft />;
    if (variant === 'next') return <ChevronRight />;
    return (
      <ChevronDoubleRight color={isActive ? 'brand100.100' : 'brand100.600'} />
    );
  }, [isActive, variant]);

  if (variant === 'number') {
    return (
      <Button
        aria-label={`number-${number}`}
        disabled={!isActive}
        onClick={onClick}
        size="sm"
        colorScheme="green"
        variant={isCurrent ? 'solid' : 'outline'}
        bgColor={isCurrent ? 'brand100.100' : 'inherit'}
        borderColor="brand100.100"
        color={isCurrent ? 'white' : 'brand100.100'}
        isDisabled={!isActive}
        _hover={buttonHover}
        _disabled={{
          ...buttonDisabled,
          borderColor: 'brand100.600',
          color: 'brand100.600',
        }}
      >
        {number}
      </Button>
    );
  }

  return (
    <IconButton
      aria-label={variant}
      disabled={!isActive}
      onClick={onClick}
      size="sm"
      colorScheme="green"
      variant="outline"
      bgColor="inherit"
      borderColor="brand100.100"
      isDisabled={!isActive}
      icon={Icon}
      _hover={buttonHover}
      _disabled={{
        ...buttonDisabled,
        borderColor: 'brand100.600',
        color: 'brand100.600',
      }}
    />
  );
};

export default PaginationItem;
