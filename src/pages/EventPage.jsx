import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Image,
  Wrap,
  Tag,
  Button,
  Center,
  Flex,
  Stack,
} from "@chakra-ui/react";
import { EditEventModal } from "../components/EditEventModal";
import { DeleteEventButton } from "../components/DeleteEventButton";

export const EventPage = () => {
  const navigate = useNavigate();
  const event = useLoaderData();
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(event);

  // Fetch categories and usesrs
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [usersResponse, categoryResponse] = await Promise.all([
          fetch("http://localhost:3000/users"),
          fetch("http://localhost:3000/categories"),
        ]);
        if (!usersResponse.ok || !categoryResponse.ok) {
          throw new Error("Failed to fetch data");
        }
        const usersData = await usersResponse.json();
        const categoryData = await categoryResponse.json();
        setUsers(usersData);
        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching data:", error);
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

  const user = getUser(event.createdBy);

  const handleEventUpdate = (updatedEvent) => {
    setCurrentEvent(updatedEvent);
  };

  return (
    <>
      <Box>
        <Center mt={{ base: 2, md: 5 }} mb={{ base: 0, md: 5 }}>
          <Heading size={{ base: "2xl", md: "3xl", lg: "4xl" }}>
            {currentEvent.title}
          </Heading>
        </Center>
        <Box borderBottom={{ base: "0px", md: "0px solid #C48027" }} />
        <Flex
          position="relative"
          flexDirection="column"
          alignItems={{ base: "flex-start", md: "center" }}
          my={{ base: 5, md: 10 }}
        >
          <Image
            src={currentEvent.image}
            w={{ base: "full", md: "60%", lg: "40%" }}
            borderRadius={{ base: "0", md: "20px" }}
          />
          <Wrap
            position="absolute"
            top={{ base: "4", md: "8" }}
            left={{ base: "4", md: "22%", lg: "32%" }}
            spacing="1.5em"
          >
            {getCategoryNames(event.categoryIds).map((categoryName, index) => (
              <Tag
                key={event.categoryIds[index]}
                padding="0.5em 1.25em"
                borderRadius="full"
              >
                {categoryName}
              </Tag>
            ))}
          </Wrap>
          <Flex
            fontWeight="medium"
            mx={8}
            mt={{ base: 5, md: 10 }}
            flexDirection="column"
            alignItems={{ base: "flex-start", md: "center" }}
            flex={1}
          >
            <Box h={{ base: 0, md: "25%" }}></Box>
            <Box>
              <Stack spacing="0.25em">
                <Text as="i">{currentEvent.description}</Text>
                <br />
                <Text as="i" fontWeight="normal">
                  *Introduction to the activity*
                </Text>
                <br />
                <Text>Start: {currentEvent.startTime}</Text>
                <Text>End: {currentEvent.endTime}</Text>
              </Stack>
              <Box mt={{ base: 5, md: 10 }} mb={{ base: 3, md: 0 }}>
                <Text fontWeight="medium">Created by:</Text>
              </Box>
            </Box>
            {user && (
              <Flex
                mb={10}
                alignItems="center"
                justifyContent={{ base: "flex-start", md: "Center" }}
              >
                <Image
                  border="px solid #C48027"
                  src={user.image}
                  alt={user.name}
                  w={{ base: "35%", md: "20%" }}
                  borderRadius="50%"
                  mt={{ base: 0, md: 2 }}
                />
                <Text m={5}>{user.name}</Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Box>
      <Flex
        my={{ base: 0, md: 10 }}
        justifyContent={{ base: "space-around", md: "center" }}
        gap={{ base: 0, md: "15em" }}
      >
        <Button bgColor="white" onClick={() => setIsEditOpen(true)}>
          Edit Event
          <EditEventModal
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            event={currentEvent}
            onEventUpdate={handleEventUpdate}
          />
        </Button>
        <DeleteEventButton
          eventId={currentEvent.id}
          onDelete={() => navigate("/")}
        />
      </Flex>
    </>
  );
};
