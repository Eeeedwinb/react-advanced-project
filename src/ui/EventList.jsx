import React, { useState } from "react";
import {
  Box,
  Input,
  Select,
  Heading,
  Text,
  Image,
  Link,
  Tag,
  Wrap,
  Center,
  Grid,
  Card,
  CardBody,
  Stack,
  Flex,
} from "@chakra-ui/react";

export const EventSearch = ({ events, categories }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const getCategoryNamesByIds = (categoryIds) => {
    return categoryIds.map(
      (id) => categories.find((category) => category.id === id)?.name
    );
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearchQuery = event.title.toLowerCase().includes(searchQuery);
    const matchesCategory =
      !selectedCategory ||
      event.categoryIds.includes(parseInt(selectedCategory, 10));
    return matchesSearchQuery && matchesCategory;
  });

  return (
    <Box>
      <Flex
        m={{ base: 8, lg: 8 }}
        gap={4}
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="center"
        alignItems="center"
      >
        <Input
          placeholder="Search events by name"
          value={searchQuery}
          onChange={handleSearchChange}
          w={{ base: "100%", md: "40%" }}
        />
        <Select
          placeholder="Filter by category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          w={{ base: "100%", md: "25%" }}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </Flex>
      <Center>
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            "2xl": "repeat(3, 1fr)",
          }}
          justifyItems="center"
          gap={{ base: 4, lg: "8" }}
          m={{ base: 8, lg: "8" }}
          w={"full"}
        >
          {filteredEvents.map((event) => (
            <Card
              variant={"unstyled"}
              key={event.id}
              bgColor="#C48027"
              w={{ base: "100%", lg: "25em" }}
              h={{ base: "auto", lg: "40em" }}
              cursor="pointer"
              mb={{ base: 3, lg: 0 }}
              pb={5}
              borderRadius="5%"
              color="#ffffff"
              overflow="hidden"
            >
              <Link href={`/event/${event.id}`}>
                <Box position="relative">
                  <Image
                    src={event.image}
                    alt={event.title}
                    w="100%"
                    h={{ base: "15em", lg: "20em" }}
                    objectFit="cover"
                  />
                  <Wrap
                    position="absolute"
                    top="1em"
                    left="1em"
                    spacing="1.5em"
                  >
                    {getCategoryNamesByIds(event.categoryIds).map(
                      (categoryName) => (
                        <Tag
                          key={categoryName}
                          padding="0.5em 1em"
                          borderRadius="full"
                        >
                          {categoryName}
                        </Tag>
                      )
                    )}
                  </Wrap>
                </Box>
                <CardBody p={{ base: 6, lg: 10 }} fontWeight="medium">
                  <Heading size={{ base: "2xl", lg: "xl" }} mb={2}>
                    {event.title}
                  </Heading>
                  <Text fontWeight="normal" as="i" mb={2}>
                    {event.description}
                  </Text>
                  <Box mt={{ base: "1em", lg: "1.5em" }}>
                    <Stack spacing={{ base: 2, lg: 3 }}>
                      <Text>
                        Location:{" "}
                        <Text as="span" fontWeight="normal">
                          {event.location}
                        </Text>
                      </Text>
                      <Text>
                        Start:{" "}
                        <Text as="span" fontWeight="normal">
                          {event.startTime}
                        </Text>
                      </Text>
                      <Text>
                        End:{" "}
                        <Text as="span" fontWeight="normal">
                          {event.endTime}
                        </Text>
                      </Text>
                    </Stack>
                  </Box>
                </CardBody>
              </Link>
            </Card>
          ))}
        </Grid>
      </Center>
      {filteredEvents.length === 0 && <Text>No events found.</Text>}
    </Box>
  );
};
