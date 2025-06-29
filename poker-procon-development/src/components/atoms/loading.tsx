import { Flex, Spinner, Text } from '@chakra-ui/react';

const Loading = () => (
  <Flex
    position="absolute"
    direction="column"
    justify="center"
    align="center"
    h="100dvh"
    w="full"
    zIndex="overlay"
    bgColor="blackAlpha.700"
  >
    <Spinner
      thickness="0.25rem"
      speed="1.5s"
      emptyColor="gray.200"
      color="brand100.100"
      size="xl"
      label="loading"
    />
    <Text mt={4} color="white">
      読み込み中...
    </Text>
  </Flex>
);

export default Loading;
