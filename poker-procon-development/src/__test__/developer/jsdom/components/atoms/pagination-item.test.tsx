import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';

import type { PaginationItemProps } from '@/components/atoms/pagination-item';
import PaginationItem from '@/components/atoms/pagination-item';
import theme from '@/styles/theme';

const Component = (props: PaginationItemProps) => (
  <ChakraProvider theme={theme}>
    <PaginationItem {...props} />
  </ChakraProvider>
);
describe('PaginationItem', () => {
  test('スナップショット/first - active', () => {
    const { asFragment } = render(
      <Component variant="first" number={1} isActive={true} isCurrent={false} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/first - not active', () => {
    const { asFragment } = render(
      <Component
        variant="first"
        number={1}
        isActive={false}
        isCurrent={false}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/prev', () => {
    const { asFragment } = render(
      <Component variant="prev" number={1} isActive={false} isCurrent={false} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/number active', () => {
    const { asFragment } = render(
      <Component
        variant="number"
        number={1}
        isActive={true}
        isCurrent={false}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/number - non active', () => {
    const { asFragment } = render(
      <Component
        variant="number"
        number={1}
        isActive={false}
        isCurrent={false}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/number current', () => {
    const { asFragment } = render(
      <Component variant="number" number={1} isActive={true} isCurrent={true} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/next', () => {
    const { asFragment } = render(
      <Component
        variant="next"
        number={100}
        isActive={false}
        isCurrent={false}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/last = active', () => {
    const { asFragment } = render(
      <Component
        variant="last"
        number={100}
        isActive={true}
        isCurrent={false}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('スナップショット/last - not active', () => {
    const { asFragment } = render(
      <Component
        variant="last"
        number={100}
        isActive={false}
        isCurrent={false}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
