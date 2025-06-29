import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';

import {
  ClubIcon,
  DiamondIcon,
  HeartIcon,
  SpadeIcon,
} from '@/components/atoms/icon';
import theme from '@/styles/theme';

describe('Icon', () => {
  test('スナップショット/Spades - sm', () => {
    const { asFragment } = render(
      <ChakraProvider theme={theme}>
        <SpadeIcon size="sm" />
      </ChakraProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/Spades - md', () => {
    const { asFragment } = render(
      <ChakraProvider theme={theme}>
        <SpadeIcon size="md" />
      </ChakraProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/Hearts - sm', () => {
    const { asFragment } = render(
      <ChakraProvider theme={theme}>
        <HeartIcon size="sm" />
      </ChakraProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/Hearts - md', () => {
    const { asFragment } = render(
      <ChakraProvider theme={theme}>
        <HeartIcon size="md" />
      </ChakraProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/Clubs - sm', () => {
    const { asFragment } = render(
      <ChakraProvider theme={theme}>
        <ClubIcon size="sm" />
      </ChakraProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/Clubs - md', () => {
    const { asFragment } = render(
      <ChakraProvider theme={theme}>
        <ClubIcon size="md" />
      </ChakraProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/Diamonds - sm', () => {
    const { asFragment } = render(
      <ChakraProvider theme={theme}>
        <DiamondIcon size="sm" />
      </ChakraProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/Diamonds - md', () => {
    const { asFragment } = render(
      <ChakraProvider theme={theme}>
        <DiamondIcon size="md" />
      </ChakraProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
