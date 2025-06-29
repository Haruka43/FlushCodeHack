import { Box } from '@chakra-ui/react';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';
import { useMemo } from 'react';

import CardNumber from '@/components/atoms/card-number';
import type { Size } from '@/schema/style';

export interface CardPanelProps extends PropsWithChildren {
  number: number;
  index: number;
  size?: Size;
  href?: string;
}

const CardPanel = ({
  number,
  index,
  size = 'md',
  href,
  children,
}: CardPanelProps) => {
  const props = useMemo(() => {
    const base = {
      bg: 'white',
      borderRadius: 'md',
      boxShadow: '2xl',
    };

    if (size === 'sm') {
      return {
        ...base,
        w: 60,
        h: '22.5rem',
        px: 5,
        py: 5,
      };
    }

    return {
      ...base,
      w: 80,
      h: '30rem',
      px: 5,
      py: 16,
    };
  }, [size]);

  const contents = useMemo(() => {
    return (
      <>
        <CardNumber
          number={number}
          size={size}
          index={index}
          top={size === 'sm' ? 2.5 : 5}
          bottom="auto"
          left={size === 'sm' ? 2.5 : 5}
          right="auto"
        />
        {children}
        <CardNumber
          number={number}
          size={size}
          reverse
          index={index}
          top="auto"
          bottom={size === 'sm' ? 2.5 : 5}
          left="auto"
          right={size === 'sm' ? 2.5 : 5}
        />
      </>
    );
  }, [children, index, number, size]);

  return (
    <>
      {href ? (
        <Box
          position="relative"
          {...props}
          as={Link}
          href={href}
          _hover={{ transform: 'scale(1.05, 1.05)' }}
        >
          {contents}
        </Box>
      ) : (
        <Box position="relative" {...props}>
          {contents}
        </Box>
      )}
    </>
  );
};

export default CardPanel;
