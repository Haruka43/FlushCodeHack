import { ThreeDots } from '@chakra-icons/bootstrap';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useMemo } from 'react';

import PaginationItem from '@/components/atoms/pagination-item';

export interface PaginationProps {
  page: number;
  max: number;
  perPage?: number;
  onClick: (number: number) => void;
}

const VIEW_BUTTON_NUM = 5; // 奇数推奨

const Pagination = ({ page, max, perPage = 100, onClick }: PaginationProps) => {
  const maxPage: number = Math.ceil(max / perPage);
  const start: number = (page - 1) * perPage + 1;
  const end: number = max - start < 100 ? max : start - 1 + perPage;

  const list = useMemo(() => {
    const half = Math.floor(VIEW_BUTTON_NUM / 2);
    const pageList: number[] = [];

    if (maxPage <= VIEW_BUTTON_NUM) {
      for (let i = 1; i <= maxPage; i += 1) {
        pageList.push(i);
      }
      return pageList;
    }

    if (page <= VIEW_BUTTON_NUM - half) {
      for (let i = 1; i <= VIEW_BUTTON_NUM; i += 1) {
        pageList.push(i);
      }
      return pageList;
    }

    if (page + half > maxPage) {
      for (let i = maxPage - VIEW_BUTTON_NUM + 1; i <= maxPage; i += 1) {
        pageList.push(i);
      }
      return pageList;
    }

    for (let i = page - half; i <= page + half; i += 1) {
      pageList.push(i);
    }

    return pageList;
  }, [page, maxPage]);

  return (
    <Box>
      <Flex align="center" gap={2}>
        <PaginationItem
          variant="first"
          number={1}
          isActive={page !== 1}
          isCurrent={false}
          onClick={() => onClick(1)}
        />
        <PaginationItem
          variant="prev"
          number={page - 1}
          isActive={page !== 1}
          isCurrent={false}
          onClick={() => onClick(page - 1)}
        />
        {list[0] !== 1 && <ThreeDots color="brand100.100" />}
        {list?.map((item) => (
          <PaginationItem
            key={`page-${item}`}
            variant="number"
            number={item}
            isActive={true}
            isCurrent={page === item}
            onClick={() => onClick(item)}
          />
        ))}
        {list[list.length - 1] !== maxPage && (
          <ThreeDots color="brand100.100" />
        )}
        <PaginationItem
          variant="next"
          number={page + 1}
          isActive={page !== maxPage}
          isCurrent={false}
          onClick={() => onClick(page + 1)}
        />
        <PaginationItem
          variant="last"
          number={maxPage}
          isActive={page !== maxPage}
          isCurrent={false}
          onClick={() => onClick(maxPage)}
        />
      </Flex>
      <Text textStyle="normal.md" mt={2} color="white" textAlign="center">
        {`${max.toLocaleString()}件中 ${start.toLocaleString()} - ${end.toLocaleString()}件目を表示中`}
      </Text>
    </Box>
  );
};

export default Pagination;
