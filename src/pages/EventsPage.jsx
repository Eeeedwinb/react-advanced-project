import React, { useState, useEffect } from "react";
import { Box, Button, Heading } from "@chakra-ui/react";
import { EventSearch } from "../ui/EventSearch";
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
    <Box>
      <Heading mb={5}>Events</Heading>
      <Button as={Link} to="/addevent">
        Add Event
      </Button>
      <EventSearch events={events} categories={categories} />
    </Box>
  );
};
