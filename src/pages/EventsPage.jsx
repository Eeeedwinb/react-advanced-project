import React, { useState, useEffect } from "react";
import { Box, Button, Center, Heading } from "@chakra-ui/react";
import { EventSearch } from "../ui/EventList";
import { Link } from "react-router-dom";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsResponse = await fetch("http://localhost:3000/events");
        const eventsData = await eventsResponse.json();
        setEvents(eventsData);

        const categoriesResponse = await fetch(
          "http://localhost:3000/categories"
        );
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

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
    <Box mb={8}>
      <Center mt="2em">
        <Heading size="3xl" mb={5}>
          Eventspage
        </Heading>
      </Center>
      <Center>
        <Button as={Link} bgColor="white" to="/addevent" mt={3}>
          Add Event
        </Button>
      </Center>
      <EventSearch events={events} categories={categories} />
    </Box>
  );
};
