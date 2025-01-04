import React from "react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const EventPageButton = () => {
  return (
    <Button as={Link} to="/addevent">
      Add Event
    </Button>
  );
};
