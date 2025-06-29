import { Flex, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex
      align="center"
      justify="center"
      gap={8}
      h={16}
      w="full"
      px={4}
      bg="black"
      boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px -5px 10px,rgba(0, 0, 0, 0.4) 0px -15px 40px"
    >
      <Text textStyle="normal.xs" color="brand80.100">
        © Benesse i-Career Co., Ltd. All Rights Reserved.
      </Text>
    </Flex>
  );
};

export default Footer;
