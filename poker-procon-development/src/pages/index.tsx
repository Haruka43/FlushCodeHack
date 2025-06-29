import { useRouter } from 'next/router';
import { useEffect } from 'react';

import ROUTE from '@/constants/route';
import { CommonTemplate } from '@/templates';

const TopPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace(ROUTE.S_B01_001);
  }, []);

  return <CommonTemplate isLoading={true} />;
};

export default TopPage;
