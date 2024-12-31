// EventDetailPage.jsx
import React from "react";
import { useLoaderData } from "react-router-dom";
import { Box, Heading, Text, Image } from "@chakra-ui/react";

export const EventPage = () => {
  const event = useLoaderData(); // Use the data returned by the loader

  return (
    <Box>
      <Heading>{event.title}</Heading>
      <Image src={event.image} alt={event.title} />
      <Text>{event.description}</Text>
      <Text>Start: {event.startTime}</Text>
      <Text>End: {event.endTime}</Text>
      <Text>Category: {event.categoryIds}</Text>
    </Box>
  );
};
