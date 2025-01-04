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
  WrapItem,
  TagLabel,
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

  const getCategoryNames = (categoryIds) => {
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
      <Box mb={4} display="flex" gap={4} flexWrap="wrap">
        <Input
          placeholder="Search events by name..."
          value={searchQuery}
          onChange={handleSearchChange}
          borderColor="blue.500"
          flex="1"
        />
        <Select
          placeholder="Filter by category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          borderColor="blue.500"
          flex="1"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </Box>
      <Box as="ul">
        {filteredEvents.map((event) => (
          <li key={event.id}>
            <Link href={`/event/${event.id}`}>
              <Box p={3} mb={3} border="1px solid #ccc" borderRadius="10px">
                <Heading size="md">{event.title}</Heading>
                <Text as="i">{event.description}</Text>
                <Image
                  src={event.image}
                  alt={event.title}
                  w="100%"
                  h="10em"
                  objectFit="cover"
                  mt={2}
                  borderRadius="5%"
                />
                <Text mt={2}>Location: {event.location}</Text>
                <Text>Start: {event.startTime}</Text>
                <Text>End: {event.endTime}</Text>
                <Wrap mt={2}>
                  {getCategoryNames(event.categoryIds).map((categoryName) => (
                    <WrapItem key={categoryName}>
                      <Tag>
                        <TagLabel>{categoryName}</TagLabel>
                      </Tag>
                    </WrapItem>
                  ))}
                </Wrap>
              </Box>
            </Link>
          </li>
        ))}
      </Box>
      {filteredEvents.length === 0 && <Text>No events found.</Text>}
    </Box>
  );
};
