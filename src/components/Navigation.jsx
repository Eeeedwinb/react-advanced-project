import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <Flex
      bgColor="white"
      as="nav"
      justifyContent={{ base: "space-around", lg: "flex-start" }}
      gap={{ base: "0", lg: "15em" }}
      alignItems="center"
      p={4}
      mt={5}
      mx={8}
      borderRadius={"full"}
    >
      <Link to="/">
        <Flex alignItems="center" gap={1}>
          <Image
            src="/home.png"
            alt="Home Image"
            ml={{ base: "0", lg: "5em" }}
            h="1em"
          />

          <Text>Home</Text>
        </Flex>
      </Link>
      <Link to="/">Eventpage</Link>
    </Flex>
  );
};
