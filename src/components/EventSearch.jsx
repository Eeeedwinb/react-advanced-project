import React, { useState } from "react";
import { Box, Input, Select, Center, Grid, Flex } from "@chakra-ui/react";
import { EventCard } from "./EventCard";

export const EventSearch = ({ events, categories }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
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
            <EventCard key={event.id} event={event} categories={categories} />
          ))}
        </Grid>
      </Center>
      {filteredEvents.length === 0 && (
        <Center fontSize={{ base: "xl", lg: "2xl" }}>No events found.</Center>
      )}
    </Box>
  );
};
