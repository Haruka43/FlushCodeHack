import { Flex, Heading } from '@chakra-ui/react';
import Link from 'next/link';

import { SERVICE_NAME } from '@/constants';
import ROUTE from '@/constants/route';

const Header = () => (
  <Flex
    position="sticky"
    align="center"
    justify="space-between"
    h={16}
    w="full"
    px={8}
    bg="black"
    boxShadow="dark-lg"
  >
    <Link href={ROUTE.S_A01_001}>
      <Heading
        as="h1"
        color="brand80.100"
        textStyle="heading.h1"
        fontSize="1.875rem"
        fontWeight="black"
        lineHeight="2.25rem"
      >
        {SERVICE_NAME}
      </Heading>
    </Link>
  </Flex>
);

export default Header;
