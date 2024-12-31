import React, { useState, useEffect } from "react";
import { Heading, Text, Box, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/events"); // API endpoint to fetch events
        const data = await response.json();
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <Box>Loading...</Box>;

  return (
    <Box>
      <Heading>Events</Heading>
      <Box as="ul">
        {events.map((event) => (
          <li key={event.id}>
            <Link to={`/event/${event.id}`}>
              <Heading>{event.title}</Heading>
              <Text as="i">{event.description}</Text>
              <Image src={event.image} w="100" h="100" objectFit="cover" />
              <Text>Start: {event.startTime}</Text>
              <Text>End: {event.endTime}</Text>
              <Text>Category: {event.categoryIds}</Text>
            </Link>
          </li>
        ))}
      </Box>
    </Box>
  );
};
