import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Image,
  Wrap,
  WrapItem,
  Tag,
  TagLabel,
  Button,
} from "@chakra-ui/react";
import { EditEventModal } from "../components/EditEventModal";
import { DeleteEventButton } from "../components/DeleteEventButton";

export const EventPage = () => {
  const navigate = useNavigate();
  const event = useLoaderData();
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false); // Modal state
  const [currentEvent, setCurrentEvent] = useState(event);

  // Fetch categories and user data
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const categoryResponse = await fetch(
          "http://localhost:3000/categories"
        );
        const categoryData = await categoryResponse.json();
        setCategories(categoryData);

        const usersResponse = await fetch("http://localhost:3000/users");
        const usersData = await usersResponse.json();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchDetails();
  }, []);

  const getCategoryNames = (categoryIds) => {
    return categoryIds.map(
      (id) => categories.find((category) => category.id === id)?.name
    );
  };

  const getUser = (createdBy) => {
    const user = users.find((user) => user.id === createdBy);
    return user ? { name: user.name, image: user.image } : null;
  };

  // Call getUser with the appropriate ID
  const user = getUser(event.createdBy);

  const handleEventUpdate = (updatedEvent) => {
    setCurrentEvent(updatedEvent);
  };

  return (
    <>
      <Box>
        <Heading>{event.title}</Heading>
        <Image src={event.image} />
        <Text as="i">{event.description}</Text>
        <Text>Start: {event.startTime}</Text>
        <Text>End: {event.endTime}</Text>
        <Wrap>
          {getCategoryNames(event.categoryIds).map((categoryName, index) => (
            <WrapItem key={event.categoryIds[index]}>
              {" "}
              <Tag>
                <TagLabel>{categoryName}</TagLabel>
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
        <Box mt={4}>
          <Text fontSize="lg" fontWeight="bold">
            Created by:
          </Text>
        </Box>
        {user && (
          <Box>
            <Image src={user.image} alt={user.name} />
            <Text>{user.name}</Text>
          </Box>
        )}
      </Box>
      <Button onClick={() => setIsEditOpen(true)} mt={4}>
        Edit Event
      </Button>
      <DeleteEventButton eventId={event.id} onDelete={() => navigate("/")} />
      <EditEventModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        event={currentEvent}
        onEventUpdate={handleEventUpdate}
      />
    </>
  );
};
