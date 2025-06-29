import { Box } from '@chakra-ui/react';
import Head from 'next/head';
import { type PropsWithChildren } from 'react';

import Loading from '@/components/atoms/loading';
import Footer from '@/components/organisms/footer';
import Header from '@/components/organisms/header';
import { SERVICE_NAME } from '@/constants';

interface Props extends PropsWithChildren {
  isLoading?: boolean;
  title?: string;
}

const CommonTemplate = ({ isLoading = false, title, children }: Props) => (
  <Box
    w="full"
    h="100dvh"
    bgImage="url('/bg-common.png')"
    bgSize="cover"
    bgPos="center"
    bgColor="black"
  >
    <>
      {isLoading && <Loading />}
      <Head>
        <title>{title ? `${title} - ${SERVICE_NAME}` : SERVICE_NAME}</title>
      </Head>
      <Header />
      <Box
        w="full"
        h="calc(100dvh - var(--chakra-sizes-16) - var(--chakra-sizes-16))"
        overflow="scroll"
      >
        <Box maxW={['5xl', '5xl', '84rem', '105rem']} mx="auto" my={20}>
          {children}
        </Box>
      </Box>
      <Footer />
    </>
  </Box>
);

export default CommonTemplate;
