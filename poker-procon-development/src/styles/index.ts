import type { SystemStyleObject } from '@chakra-ui/react';

export const margin8: number[] = [1.5, 1.5, 2, 2, 2.5]; // 6px 8px 10px
export const margin16: number[] = [3, 3, 4, 4, 5]; // 12px 16px 20px

export const headingM: string[] = [
  'heading.h6', // ひと回り小さく
  'heading.h5',
  'heading.h4',
  'heading.h4',
  'heading.h3',
];

export const strongS: string[] = [
  'strong.xs',
  'strong.xs',
  'strong.sm',
  'strong.sm',
  'strong.md',
];

export const strongM: string[] = [
  'strong.sm',
  'strong.sm',
  'strong.md',
  'strong.md',
  'strong.lg',
];

export const boldL: string[] = [
  'bold.md',
  'bold.md',
  'bold.lg',
  'bold.lg',
  'bold.xl',
];

export const normalM: string[] = [
  'normal.sm',
  'normal.sm',
  'normal.md',
  'normal.md',
  'normal.lg',
];

export const normalS: string[] = [
  'normal.xs',
  'normal.xs',
  'normal.sm',
  'normal.sm',
  'normal.md',
];

export const gameDeskHeight: string[] = [
  'calc(100dvh - var(--chakra-sizes-16) - var(--chakra-space-20) - var(--chakra-sizes-16))',
  'calc(100dvh - var(--chakra-sizes-16) - var(--chakra-space-20) - var(--chakra-sizes-16))',
  'calc(100dvh - var(--chakra-sizes-16) - var(--chakra-space-20) - var(--chakra-sizes-16))',
  'calc(100dvh - var(--chakra-sizes-16) - var(--chakra-space-20) - var(--chakra-sizes-16))',
  'calc(100dvh - var(--chakra-sizes-16) - var(--chakra-space-40) - var(--chakra-sizes-16))',
];

export const buttonHover: SystemStyleObject = {
  opacity: 0.6,
  _disabled: {
    opacity: 1,
  },
};

export const buttonDisabled: SystemStyleObject = {
  cursor: 'not-allowed',
};
