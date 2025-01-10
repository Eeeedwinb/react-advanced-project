import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Textarea,
  Box,
  Text,
  useToast,
  Select,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";

export const EditEventModal = ({ isOpen, onClose, event, onEventUpdate }) => {
  const [editedEvent, setEditedEvent] = useState(event);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const toast = useToast();

  //useEffect for category
  useEffect(() => {
    setEditedEvent(event);
  }, [event]);

  const handleCategoryEditChange = (selectedCategories) => {
    setEditedEvent((prevEvent) => ({
      ...prevEvent,
      categoryIds: selectedCategories.map(Number),
    }));
  };

  const handleEditChange = (field, value) => {
    setEditedEvent({ ...editedEvent, [field]: value });
  };

  //general useEffect for fetchData
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, categoriesResponse] = await Promise.all([
          fetch("http://localhost:3000/users"),
          fetch("http://localhost:3000/categories"),
        ]);
        if (!usersResponse.ok || !categoriesResponse.ok) {
          throw new Error("Failed to fetch data");
        }
        const usersData = await usersResponse.json();
        const categoriesData = await categoriesResponse.json();
        setUsers(usersData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedEvent),
      });

      if (!response.ok) {
        throw new Error("Failed to update event");
      }

      const updatedEvent = await response.json();
      onEventUpdate(updatedEvent);
      toast({
        title: "Event updated.",
        description: `Your event "${updatedEvent.title}" has been updated successfully.
        Please refresh the page to see the updated event.`,
        status: "success",
        duration: 4500,
        isClosable: true,
      });

      onClose();
    } catch (error) {
      console.error("Error updating event:", error);
      toast({
        title: "Error updating event.",
        description: "There was an issue updating the event. Please try again.",
        status: "error",
        duration: 4500,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={4}>
            <Text>User:</Text>
            <Select
              name="createdBy"
              value={editedEvent.createdBy}
              onChange={(e) =>
                handleEditChange("createdBy", parseInt(e.target.value, 10))
              }
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
          </Box>
          <Box mb={4}>
            <Text>Title:</Text>
            <Input
              value={editedEvent.title}
              onChange={(e) => handleEditChange("title", e.target.value)}
            />
          </Box>
          <Box mb={4}>
            <Text>Description:</Text>
            <Textarea
              value={editedEvent.description}
              onChange={(e) => handleEditChange("description", e.target.value)}
            />
          </Box>
          <Box mb={4}>
            <Text>Image URL:</Text>
            <Input
              value={editedEvent.image}
              onChange={(e) => handleEditChange("image", e.target.value)}
            />
          </Box>
          <Box mb="4">
            <Text>Categories</Text>
            <CheckboxGroup
              name="categoryIds"
              value={editedEvent.categoryIds.map(String)}
              onChange={handleCategoryEditChange}
            >
              {categories.map((category) => (
                <Checkbox
                  key={category.id}
                  m={1}
                  value={category.id.toString()}
                >
                  {category.name}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </Box>
          <Box mb={4}>
            <Text>Start Time:</Text>
            <Input
              type="datetime-local"
              name="startTime"
              value={editedEvent.startTime}
              onChange={(e) => handleEditChange("startTime", e.target.value)}
            />
          </Box>
          <Box mb={4}>
            <Text>End Time:</Text>
            <Input
              type="datetime-local"
              name="endTime"
              value={editedEvent.endTime}
              onChange={(e) => handleEditChange("endTime", e.target.value)}
            />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            bgColor="#433580"
            color="white"
            onClick={handleEditSubmit}
            mr={3}
          >
            Save Changes
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
