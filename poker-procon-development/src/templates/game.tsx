import { Box } from '@chakra-ui/react';
import Head from 'next/head';
import { type PropsWithChildren } from 'react';

import Loading from '@/components/atoms/loading';
import Footer from '@/components/organisms/footer';
import Header from '@/components/organisms/header';
import { SERVICE_NAME } from '@/constants';
import { gameDeskHeight } from '@/styles';

interface Props extends PropsWithChildren {
  isLoading?: boolean;
  title?: string;
}

const GameTemplate = ({ isLoading = false, title, children }: Props) => (
  <Box
    w="full"
    minH="full"
    bgImage="url('/bg-game.png')"
    bgSize="cover"
    bgPos="center"
  >
    <>
      {isLoading && <Loading />}
      <Head>
        <title>{title ? `${title} - ${SERVICE_NAME}` : SERVICE_NAME}</title>
      </Head>
      <Header />
      <Box
        w={['full', 'auto', 'auto', 'full', 'full']}
        maxW={[
          '62.5rem', // 1,000px
          'full',
          'full',
          '96rem', // 1,536px
          '125rem', // 2,000px
        ]}
        minH={gameDeskHeight}
        my={[10, 10, 10, 10, 20]}
        mx={['auto', 20, 20, 'auto', 'auto']}
      >
        {children}
      </Box>
      <Footer />
    </>
  </Box>
);

export default GameTemplate;
