import {
  Box,
  Image,
  Link,
  Wrap,
  Tag,
  Card,
  CardBody,
  Heading,
  Text,
  Stack,
} from "@chakra-ui/react";

export const EventCard = ({ event, categories }) => {
  const getCategoryNamesByIds = (categoryIds) =>
    categoryIds.map(
      (id) => categories.find((category) => category.id === id)?.name
    );

  return (
    <Card
      variant={"unstyled"}
      bgColor="#C48027"
      w={{ base: "100%", lg: "25em" }}
      h={{ base: "auto", lg: "40em" }}
      cursor="pointer"
      mb={{ base: 3, lg: 0 }}
      pb={5}
      borderRadius="5%"
      color="#ffffff"
      overflow="hidden"
    >
      <Link href={`/event/${event.id}`}>
        <Box position="relative">
          <Image
            src={event.image}
            alt={event.title}
            w="100%"
            h={{ base: "15em", lg: "20em" }}
            objectFit="cover"
          />
          <Wrap position="absolute" top="1em" left="1em" spacing="1.5em">
            {getCategoryNamesByIds(event.categoryIds).map((categoryName) => (
              <Tag key={categoryName} padding="0.5em 1em" borderRadius="full">
                {categoryName}
              </Tag>
            ))}
          </Wrap>
        </Box>
        <CardBody p={{ base: 6, lg: 10 }} fontWeight="medium">
          <Heading size={{ base: "2xl", lg: "xl" }} mb={2}>
            {event.title}
          </Heading>
          <Text fontWeight="normal" as="i" mb={2}>
            {event.description}
          </Text>
          <Box mt={{ base: "1em", lg: "1.5em" }}>
            <Stack spacing={{ base: 2, lg: 3 }}>
              <Text>
                Location:{" "}
                <Text as="span" fontWeight="normal">
                  {event.location}
                </Text>
              </Text>
              <Text>
                Start:{" "}
                <Text as="span" fontWeight="normal">
                  {event.startTime}
                </Text>
              </Text>
              <Text>
                End:{" "}
                <Text as="span" fontWeight="normal">
                  {event.endTime}
                </Text>
              </Text>
            </Stack>
          </Box>
        </CardBody>
      </Link>
    </Card>
  );
};
