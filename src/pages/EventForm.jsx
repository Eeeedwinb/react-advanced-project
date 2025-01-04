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
} from "@chakra-ui/react";

export const EventForm = () => {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
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

  // Fetch data for users, categories, and events on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetch("http://localhost:3000/users");
        const usersData = await usersResponse.json();
        setUsers(usersData);

        const categoriesResponse = await fetch(
          "http://localhost:3000/categories"
        );
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        const eventsResponse = await fetch("http://localhost:3000/events");
        const eventsData = await eventsResponse.json();
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle multiple category selection
  const handleCategoryChange = (selectedCategories) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      categoryIds: selectedCategories,
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Determine the new unique ID
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
        alert("Event added successfully!");
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

        // Update the local events state
        setEvents((prevEvents) => [...prevEvents, newEvent]);
      } else {
        console.error("Failed to add event:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <Box
      maxW="500px"
      mx="auto"
      mt="50px"
      p="5"
      border="1px solid #ccc"
      borderRadius="10px"
    >
      <form onSubmit={handleSubmit}>
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
          <FormLabel>Title</FormLabel>
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
      </form>
    </Box>
  );
};
