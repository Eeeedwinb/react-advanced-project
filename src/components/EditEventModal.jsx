import React, { useState } from "react";
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
} from "@chakra-ui/react";

export const EditEventModal = ({ isOpen, onClose, event, onEventUpdate }) => {
  const [editedEvent, setEditedEvent] = useState(event);
  const toast = useToast();

  const handleEditChange = (field, value) => {
    setEditedEvent({ ...editedEvent, [field]: value });
  };

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
      onEventUpdate(updatedEvent); // Inform parent of the update
      toast({
        title: "Event updated.",
        description: `Your event "${updatedEvent.title}" has been updated successfully.
        Please refresh the page to see the updated event.`,
        status: "success",
        duration: 4500,
        isClosable: true,
      });

      onClose(); // Close the modal
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
            <Text>Start Time:</Text>
            <Input
              value={editedEvent.startTime}
              onChange={(e) => handleEditChange("startTime", e.target.value)}
            />
          </Box>
          <Box mb={4}>
            <Text>End Time:</Text>
            <Input
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
