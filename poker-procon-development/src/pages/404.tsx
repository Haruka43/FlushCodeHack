import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';

import CenterContent from '@/components/atoms/center-content';
import ROUTE from '@/constants/route';
import { CommonTemplate } from '@/templates';

const Custom400 = () => {
  return (
    <CommonTemplate title="ページが見つかりません">
      <CenterContent>
        <Flex direction="column" align="center" gap={20}>
          <Heading
            as="h2"
            textStyle="heading.h2"
            color="white"
            fontSize="2.25rem"
            fontWeight="black"
            lineHeight="2.75rem"
          >
            404 Not Found...
          </Heading>
          <Flex direction="column" align="center" gap={3} color="white">
            <Text textStyle="normal.md">
              お探しのページはアクセスできない状況にあるか、移動または削除された可能性があり、見つけられませんでした。
            </Text>
            <Text textStyle="normal.md">
              URL、ファイル名にタイプミスがないかご確認ください。
            </Text>
          </Flex>
          <Button
            size="lg"
            colorScheme="green"
            bgColor="brand100.100"
            as={Link}
            href={ROUTE.S_A01_001}
          >
            ホームへ
          </Button>
        </Flex>
      </CenterContent>
    </CommonTemplate>
  );
};

export default Custom400;
