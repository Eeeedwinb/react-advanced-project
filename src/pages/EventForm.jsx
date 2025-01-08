import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Select,
  CheckboxGroup,
  Checkbox,
  Heading,
  Center,
  useToast,
} from "@chakra-ui/react";
import { Form } from "react-router-dom";

export const EventForm = () => {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    createdBy: "",
    title: "",
    description: "",
    image: "",
    categoryIds: [],
    location: "",
    startTime: "",
    endTime: "",
  });

  const toast = useToast();

  // Fetch users and events
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, eventsResponse] = await Promise.all([
          fetch("http://localhost:3000/users"),
          fetch("http://localhost:3000/events"),
        ]);
        if (!usersResponse.ok || !eventsResponse.ok) {
          throw new Error("Failed to fetch data");
        }
        const usersData = await usersResponse.json();
        const eventsData = await eventsResponse.json();
        setUsers(usersData);
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle category section
  const handleCategoryChange = (selectedCategories) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      categoryIds: selectedCategories,
    }));
  };

  // Handle Submitform
  const handleSubmit = async (e) => {
    e.preventDefault();

    // New ID Code
    const highestId =
      events.length > 0 ? Math.max(...events.map((event) => event.id)) : 0;
    const newId = highestId + 1;

    const newEvent = {
      ...formData,
      id: newId,
      createdBy: parseInt(formData.createdBy, 10),
      categoryIds: formData.categoryIds.map((id) => parseInt(id, 10)),
    };

    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      if (response.ok) {
        toast({
          title: "Event added succesfully.",
          description: `Your event has been added successfully.`,
          status: "success",
          duration: 4500,
          isClosable: true,
          position: "top",
        });
        setFormData({
          createdBy: "",
          title: "",
          description: "",
          image: "",
          categoryIds: [],
          location: "",
          startTime: "",
          endTime: "",
        });

        setEvents((prevEvents) => [...prevEvents, newEvent]);
      } else {
        console.error("Failed to add event:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <>
      <Center>
        <Heading size="2xl" mt={8}>
          Add Event:
        </Heading>
      </Center>
      <Center my={8}>
        <Box
          p="5"
          w={{ base: "auto", md: "50%", "2xl": "40%" }}
          border="1px solid #ccc"
          borderRadius="10px"
          bgColor="white"
        >
          <Form onSubmit={handleSubmit}>
            <FormControl mb="4">
              <FormLabel>Created By</FormLabel>
              <Select
                name="createdBy"
                value={formData.createdBy}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select User
                </option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Name of my event</FormLabel>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Image URL</FormLabel>
              <Input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://..."
              />
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Categories</FormLabel>
              <CheckboxGroup
                name="categoryIds"
                value={formData.categoryIds}
                onChange={handleCategoryChange}
              >
                <Checkbox m={1} value="1">
                  Sports
                </Checkbox>
                <Checkbox m={1} value="2">
                  Games
                </Checkbox>
                <Checkbox m={1} value="3">
                  Relaxation
                </Checkbox>
              </CheckboxGroup>
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Location</FormLabel>
              <Input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </FormControl>

            <FormControl mb="4">
              <FormLabel>Start Time</FormLabel>
              <Input
                type="datetime-local"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
              />
            </FormControl>

            <FormControl mb="4">
              <FormLabel>End Time</FormLabel>
              <Input
                type="datetime-local"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
              />
            </FormControl>

            <Button type="submit" colorScheme="blue" width="full">
              Add Event
            </Button>
          </Form>
        </Box>
      </Center>
    </>
  );
};
